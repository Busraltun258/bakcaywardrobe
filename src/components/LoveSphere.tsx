import { HeartFilled } from '@ant-design/icons'
import { App, Card } from 'antd'
import dayjs from 'dayjs'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { UserProfile } from '../types'
import { getDoc } from 'firebase/firestore'

/**
 * Aşk Küresi — Buşra ve Kamuran arasında günlük check-in.
 * Her ikisi de gün içinde "sevgi göster" derse seri 1 artar.
 * Bir gün biri unutursa seri kırılır ve baştan başlar.
 *
 * Firestore: loveStreak/shared
 *   { lastBusra: 'YYYY-MM-DD', lastKamuran: 'YYYY-MM-DD',
 *     streak: number, total: number, started: timestamp, lastSharedDay: string }
 */

const KAMURAN_USERNAME = 'kamuran'

interface LoveData {
  lastBusra?: string
  lastKamuran?: string
  streak?: number
  total?: number
  started?: number
  lastSharedDay?: string
}

const LoveSphere: React.FC = () => {
  const { user, isAdmin } = useAuth()
  const { message } = App.useApp()
  const [data, setData] = useState<LoveData | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [animating, setAnimating] = useState(false)
  const [saving, setSaving] = useState(false)

  // Kullanıcının kim olduğunu (Buşra mı, Kamuran mı) profilden anla
  useEffect(() => {
    if (!user) return
    ;(async () => {
      try {
        const snap = await getDoc(doc(db, 'profiles', user.uid))
        if (snap.exists()) setProfile({ id: snap.id, ...snap.data() } as UserProfile)
      } catch {}
    })()
  }, [user])

  // Paylaşılan doc'u dinle
  useEffect(() => {
    return onSnapshot(doc(db, 'loveStreak', 'shared'), (snap) => {
      setData((snap.data() as LoveData) ?? {})
    })
  }, [])

  // Rolü belirle
  const role: 'busra' | 'kamuran' | null = useMemo(() => {
    if (!profile) return null
    if (isAdmin) return 'busra'
    if ((profile.username ?? '').toLowerCase() === KAMURAN_USERNAME.toLowerCase()) {
      return 'kamuran'
    }
    return null
  }, [profile, isAdmin])

  // Bu component sadece Buşra ve Kamuran için var
  if (!role) return null

  const today = dayjs().format('YYYY-MM-DD')
  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
  const meToday = role === 'busra' ? data?.lastBusra === today : data?.lastKamuran === today
  const otherToday =
    role === 'busra' ? data?.lastKamuran === today : data?.lastBusra === today
  const bothToday = meToday && otherToday

  const streak = data?.streak ?? 0
  const total = data?.total ?? 0

  const otherName = role === 'busra' ? 'Kamuran' : 'Büşra'

  const handleTap = async () => {
    if (meToday || saving) return
    setSaving(true)
    setAnimating(true)
    try {
      const fieldName = role === 'busra' ? 'lastBusra' : 'lastKamuran'
      const otherField = role === 'busra' ? 'lastKamuran' : 'lastBusra'

      const patch: LoveData = { [fieldName]: today }

      // İkisi de bugün taplandıysa seri güncelle
      if (data?.[otherField] === today) {
        const lastShared = data?.lastSharedDay
        const newStreak = lastShared === yesterday ? (data?.streak ?? 0) + 1 : 1
        patch.streak = newStreak
        patch.total = (data?.total ?? 0) + 1
        patch.lastSharedDay = today
      }

      // İlk seferse başlangıç tarihi yaz
      if (!data?.started) {
        patch.started = Date.now()
      }

      await setDoc(doc(db, 'loveStreak', 'shared'), patch, { merge: true })

      if (data?.[otherField] === today) {
        message.success('Bugünkü serinizi tamamladınız 💗')
      } else {
        message.info(`İlk sen geldin — ${otherName}'ı bekliyoruz 👀`)
      }
    } catch (e) {
      console.error(e)
      message.error('Hay aksi, kaydedilemedi')
    } finally {
      setSaving(false)
      setTimeout(() => setAnimating(false), 1200)
    }
  }

  // Görsel durum
  let statusText = ''
  let statusIcon = ''
  if (bothToday) {
    statusText = `🔥 ${streak} günlük seri — bugün ikiniz de geldiniz!`
    statusIcon = '💗'
  } else if (meToday) {
    statusText = `Sen geldin · ${otherName} bekleniyor`
    statusIcon = '🤍'
  } else if (otherToday) {
    statusText = `${otherName} seni bekliyor`
    statusIcon = '💔'
  } else {
    statusText = streak > 0 ? `Bugünü kaçırma · seri: ${streak}` : 'Bugün ilk gün, sen başla!'
    statusIcon = '🤍'
  }

  const heartColor = bothToday ? '#f472b6' : meToday ? '#a78bfa' : '#5b5666'

  return (
    <Card
      style={styles.card}
      bodyStyle={{ padding: 14 }}
      hoverable={!meToday}
      onClick={meToday ? undefined : handleTap}
    >
      <div style={styles.row}>
        <div style={{ ...styles.sphere, color: heartColor }}>
          <HeartFilled
            style={{
              fontSize: 48,
              filter: `drop-shadow(0 0 12px ${heartColor}66)`,
              animation: animating
                ? 'bk-love-burst 1.2s ease-out'
                : bothToday
                ? 'bk-love-pulse 2.4s ease-in-out infinite'
                : undefined,
            }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={styles.title}>{statusIcon} Aşk Durağı</div>
          <div style={styles.statusLine}>{statusText}</div>
          <div style={styles.statsRow}>
            <span style={styles.statChip}>
              <strong>{streak}</strong> seri
            </span>
            <span style={styles.statChip}>
              <strong>{total}</strong> tamamlanmış gün
            </span>
            {data?.started && (
              <span style={styles.statChip}>
                {dayjs(data.started).format('DD MMM')}'den beri
              </span>
            )}
          </div>
        </div>
        <div style={styles.cta}>
          {meToday ? (
            <span style={styles.doneTag}>✓ Bugün</span>
          ) : (
            <span style={styles.tapTag}>Sevgi göster</span>
          )}
        </div>
      </div>

      <style>{`
        @keyframes bk-love-pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.08); }
        }
        @keyframes bk-love-burst {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.4); }
          60%  { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
      `}</style>
    </Card>
  )
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: 'linear-gradient(135deg, rgba(244,114,182,0.10), rgba(167,139,250,0.10))',
    border: '1px solid rgba(244,114,182,0.25)',
    marginBottom: 14,
    cursor: 'pointer',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  },
  sphere: {
    width: 64,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 2,
    letterSpacing: '-0.2px',
  },
  statusLine: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 6,
  },
  statsRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 6,
  },
  statChip: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    background: 'rgba(255,255,255,0.06)',
    padding: '2px 7px',
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.08)',
  },
  cta: {
    flexShrink: 0,
    textAlign: 'right' as const,
  },
  tapTag: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #f472b6, #a78bfa)',
    color: '#fff',
    fontSize: 12,
    fontWeight: 600,
    padding: '6px 12px',
    borderRadius: 999,
    boxShadow: '0 4px 14px rgba(244,114,182,0.35)',
    whiteSpace: 'nowrap' as const,
  },
  doneTag: {
    display: 'inline-block',
    background: 'rgba(52,211,153,0.18)',
    color: '#34d399',
    fontSize: 12,
    fontWeight: 600,
    padding: '6px 12px',
    borderRadius: 999,
    border: '1px solid rgba(52,211,153,0.3)',
    whiteSpace: 'nowrap' as const,
  },
}

export default LoveSphere
