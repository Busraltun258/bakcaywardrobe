import { collection, onSnapshot, query, where } from 'firebase/firestore'
import dayjs from 'dayjs'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { COLORS } from '../theme'
import { OutfitRequest, OutfitSuggestion } from '../types'
import { getWornDate, isWorn } from '../utils/outfitDate'
import Lightbox from './Lightbox'

const LOOKBACK_DAYS = 30

function dayLabel(dateStr: string): string {
  const today = dayjs().format('YYYY-MM-DD')
  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
  if (dateStr === today) return 'Bugün'
  if (dateStr === yesterday) return 'Dün'
  return dayjs(dateStr).format('D MMM')
}

interface Props {
  /** Kimin giydikleri gösterilsin — verilmezse giriş yapan kullanıcı. */
  uid?: string
  title?: string
}

/**
 * "Son Giydiklerim" — story tarzı, dönen gradyan halkalı yuvarlak fotoğraf şeridi.
 * Son 30 gün içinde giyilmiş (isWorn) kombinleri, en yeniden eskiye sıralar.
 * Fotoğrafı olmayan günler nötr bir ikonla gösterilir (yine de tarihe göz atmak için).
 */
const RecentLooksRow: React.FC<Props> = ({ uid, title = 'Son Giydiklerim 💫' }) => {
  const navigate = useNavigate()
  const [suggestions, setSuggestions] = useState<OutfitSuggestion[]>([])
  const [requests, setRequests] = useState<Record<string, OutfitRequest>>({})
  const [enlarged, setEnlarged] = useState<{ src: string; label: string } | null>(null)

  useEffect(() => {
    if (!uid) return
    const q = query(collection(db, 'outfitSuggestions'), where('requesterUid', '==', uid))
    return onSnapshot(q, (snap) => {
      setSuggestions(snap.docs.map((d) => ({ id: d.id, ...d.data() } as OutfitSuggestion)))
    })
  }, [uid])

  useEffect(() => {
    if (!uid) return
    const q = query(collection(db, 'outfitRequests'), where('fromUid', '==', uid))
    return onSnapshot(q, (snap) => {
      const map: Record<string, OutfitRequest> = {}
      snap.docs.forEach((d) => {
        map[d.id] = { id: d.id, ...d.data() } as OutfitRequest
      })
      setRequests(map)
    })
  }, [uid])

  const looks = useMemo(() => {
    const cutoff = Date.now() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000
    return suggestions
      .map((s) => {
        const r = requests[s.requestId]
        const wornDate = getWornDate(s, r)
        if (!wornDate || !isWorn(wornDate)) return null
        const ts = dayjs(wornDate).valueOf()
        if (ts < cutoff) return null
        return { s, wornDate, ts }
      })
      .filter((x): x is { s: OutfitSuggestion; wornDate: string; ts: number } => !!x)
      .sort((a, b) => b.ts - a.ts || (b.s.wornPhotoAt ?? 0) - (a.s.wornPhotoAt ?? 0))
      .slice(0, 30)
  }, [suggestions, requests])

  if (looks.length === 0) return null

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>{title}</div>
      <div style={styles.row} className="bk-hide-scrollbar">
        {looks.map(({ s, wornDate }) => (
          <button
            key={s.id}
            type="button"
            style={styles.item}
            onClick={() => {
              if (s.wornPhotoBase64) {
                setEnlarged({ src: s.wornPhotoBase64, label: dayLabel(wornDate) })
              } else {
                navigate(`/kombin?tab=history&focus=${s.id}`)
              }
            }}
          >
            <div style={styles.ringWrap}>
              <div className="bk-story-ring" style={styles.ringBg} />
              <div style={styles.ringInner}>
                {s.wornPhotoBase64 ? (
                  <img src={s.wornPhotoBase64} alt="" style={styles.photo} />
                ) : (
                  <span style={{ fontSize: 22 }}>👕</span>
                )}
              </div>
            </div>
            <span style={styles.label}>{dayLabel(wornDate)}</span>
          </button>
        ))}
      </div>

      <Lightbox
        open={!!enlarged}
        onClose={() => setEnlarged(null)}
        src={enlarged?.src ?? ''}
        title={`📸 ${enlarged?.label ?? ''} giydiği görünüm`}
      />

      <style>{`
        @keyframes bk-story-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .bk-story-ring {
          animation: bk-story-spin 7s linear infinite;
        }
        .bk-hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrap: { marginBottom: 20 },
  header: {
    fontSize: 13,
    fontWeight: 700,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  row: {
    display: 'flex',
    gap: 14,
    overflowX: 'auto' as const,
    paddingBottom: 4,
    scrollbarWidth: 'none' as const,
  },
  item: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 6,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    flexShrink: 0,
    width: 62,
    fontFamily: 'inherit',
    padding: 0,
  },
  ringWrap: {
    position: 'relative' as const,
    width: 58,
    height: 58,
  },
  ringBg: {
    position: 'absolute' as const,
    inset: 0,
    borderRadius: '50%',
    background: `conic-gradient(from 0deg, ${COLORS.primary}, ${COLORS.accent}, #f472b6, ${COLORS.primary})`,
  },
  ringInner: {
    position: 'absolute' as const,
    inset: 2.5,
    borderRadius: '50%',
    background: COLORS.bgCard,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    border: `2px solid ${COLORS.bg}`,
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  label: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: 500,
  },
}

export default RecentLooksRow
