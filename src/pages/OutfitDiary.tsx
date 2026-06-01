import {
  CalendarOutlined,
  ClockCircleOutlined,
  HistoryOutlined,
} from '@ant-design/icons'
import { Calendar, Card, Empty, Skeleton, Tag } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import AppLayout from '../components/AppLayout'
import Lightbox from '../components/Lightbox'
import SmartImage from '../components/SmartImage'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { COLORS } from '../theme'
import {
  ClothingItem,
  OutfitRequest,
  OutfitSuggestion,
} from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'

/**
 * Kıyafet Günlüğü (read-only)
 * - Stilistten gelen önerileri tarihe göre takvimde gösterir.
 * - Geçmiş tarihler: "Giyildi", gelecek tarihler: "Planlandı".
 * - Kullanıcı manuel seçim yapmaz; günler stilistin önerilerinden otomatik dolar.
 */
interface PlannedOutfit {
  date: string
  isPast: boolean
  suggestion: OutfitSuggestion
  request: OutfitRequest
}

const OutfitDiary: React.FC = () => {
  const { user } = useAuth()
  const [suggestions, setSuggestions] = useState<OutfitSuggestion[]>([])
  const [requests, setRequests] = useState<Record<string, OutfitRequest>>({})
  const [clothes, setClothes] = useState<Record<string, ClothingItem>>({})
  const [loading, setLoading] = useState(true)
  const [lightboxSlides, setLightboxSlides] = useState<ClothingItem[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)

  // Önerileri çek
  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }
    const q = query(collection(db, 'outfitSuggestions'), where('requesterUid', '==', user.uid))
    return onSnapshot(
      q,
      (snap) => {
        setSuggestions(snap.docs.map((d) => ({ id: d.id, ...d.data() } as OutfitSuggestion)))
        setLoading(false)
      },
      (err) => {
        console.error('outfitSuggestions error:', err)
        setLoading(false)
      },
    )
  }, [user])

  // Önerilere ait talepleri çek (tarih bilgisi için)
  useEffect(() => {
    if (suggestions.length === 0) return
    const ids = Array.from(new Set(suggestions.map((s) => s.requestId)))
    const need = ids.filter((id) => !requests[id])
    if (need.length === 0) return
    ;(async () => {
      const map: Record<string, OutfitRequest> = {}
      for (let i = 0; i < need.length; i += 30) {
        const chunk = need.slice(i, i + 30)
        try {
          const q = query(collection(db, 'outfitRequests'), where(documentId(), 'in', chunk))
          const snap = await getDocs(q)
          snap.docs.forEach((d) => {
            map[d.id] = { id: d.id, ...d.data() } as OutfitRequest
          })
        } catch {
          await Promise.all(
            chunk.map(async (id) => {
              const snap = await getDoc(doc(db, 'outfitRequests', id))
              if (snap.exists()) map[snap.id] = { id: snap.id, ...snap.data() } as OutfitRequest
            }),
          )
        }
      }
      setRequests((prev) => ({ ...prev, ...map }))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestions.map((s) => s.requestId).join('|')])

  // Kullanıcının dolabını çek (görseller için)
  useEffect(() => {
    if (!user) return
    const q = query(collection(db, 'clothes'), where('ownerId', '==', user.uid))
    return onSnapshot(
      q,
      (snap) => {
        const map: Record<string, ClothingItem> = {}
        snap.docs.forEach((d) => {
          map[d.id] = { id: d.id, ...d.data() } as ClothingItem
        })
        setClothes(map)
      },
      (err) => console.error('clothes error:', err),
    )
  }, [user])

  // Her öneri için tarih hesapla → planlanmış kombin listesi
  const planned: PlannedOutfit[] = useMemo(() => {
    const today = dayjs().startOf('day')
    const list: PlannedOutfit[] = []
    suggestions.forEach((s) => {
      const r = requests[s.requestId]
      if (!r) return
      let date: string | undefined
      if (r.requestType === 'weekly' && typeof s.dayIndex === 'number' && r.weekStartDate) {
        date = dayjs(r.weekStartDate).add(s.dayIndex, 'day').format('YYYY-MM-DD')
      } else if (r.requestDate) {
        date = r.requestDate
      }
      if (!date) return
      list.push({
        date,
        isPast: dayjs(date).isBefore(today),
        suggestion: s,
        request: r,
      })
    })
    return list.sort((a, b) => a.date.localeCompare(b.date))
  }, [suggestions, requests])

  // Tarih → kombin map'i (tek günde birden fazla olabilir, son hazırlanan kullanılır)
  const byDate = useMemo(() => {
    const map = new Map<string, PlannedOutfit>()
    planned.forEach((p) => {
      const existing = map.get(p.date)
      if (!existing || (p.suggestion.createdAt ?? 0) > (existing.suggestion.createdAt ?? 0)) {
        map.set(p.date, p)
      }
    })
    return map
  }, [planned])

  const upcoming = useMemo(
    () => planned.filter((p) => !p.isPast).slice(0, 6),
    [planned],
  )
  const past = useMemo(
    () => [...planned].filter((p) => p.isPast).reverse().slice(0, 10),
    [planned],
  )

  const cellRender = (date: Dayjs, info: { type: string }) => {
    if (info?.type !== 'date') return null
    const key = date.format('YYYY-MM-DD')
    const p = byDate.get(key)
    if (!p) return null
    const allIds = p.suggestion.clothingItemIds
    const items = allIds
      .slice(0, 1)
      .map((id) => clothes[id])
      .filter(Boolean) as ClothingItem[]
    if (items.length === 0) return null
    // Absolute positioned overlay — tarih sayısının yerini değiştirmesin
    return (
      <div style={styles.cellOverlay}>
        {items.map((c) => (
          <SmartImage
            key={c.id}
            cacheKey={c.id}
            src={clothingItemImageSrc(c)}
            style={{ width: 14, height: 14, borderRadius: 3 }}
          />
        ))}
        {allIds.length > 1 && <span style={styles.cellMore}>·</span>}
      </div>
    )
  }

  const openPlanned = (p: PlannedOutfit) => {
    const items = p.suggestion.clothingItemIds
      .map((id) => clothes[id])
      .filter(Boolean) as ClothingItem[]
    if (items.length === 0) return
    setLightboxSlides(items)
    setLightboxIndex(0)
    setSelectedDate(dayjs(p.date))
  }

  const onCalendarSelect = (date: Dayjs, info?: { source: string }) => {
    if (info?.source && info.source !== 'date') return
    const key = date.format('YYYY-MM-DD')
    const p = byDate.get(key)
    if (p) openPlanned(p)
  }

  return (
    <AppLayout>
      <div className="bk-container">
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>
            <CalendarOutlined style={{ color: COLORS.primary, marginRight: 10 }} />
            Kıyafet Günlüğü
          </h1>
          <p style={styles.heroSub}>
            Geçmiş ve planlanmış kombinlerin tek bir takvimde
          </p>
        </div>

        {loading ? (
          <Card>
            <Skeleton active />
          </Card>
        ) : planned.length === 0 ? (
          <Card>
            <Empty
              description={
                <span style={{ color: COLORS.textSecondary }}>
                  Henüz tarih atanmış bir kombin önerisi yok. Kombin sayfasından stilistten istek
                  oluştur — burada otomatik gözükecek.
                </span>
              }
            />
          </Card>
        ) : (
          <>
            <Card style={{ marginBottom: 14 }} bodyStyle={{ padding: 8 }}>
              <Calendar
                fullscreen={false}
                cellRender={cellRender}
                onSelect={onCalendarSelect}
              />
            </Card>

            {upcoming.length > 0 && (
              <Card
                title={
                  <span style={styles.cardTitle}>
                    <ClockCircleOutlined style={{ color: COLORS.warning, marginRight: 6 }} />
                    Yaklaşan ({upcoming.length})
                  </span>
                }
                style={{ marginBottom: 12 }}
                bodyStyle={{ padding: '6px 12px' }}
              >
                {upcoming.map((p) => (
                  <DiaryRow key={p.suggestion.id} planned={p} clothes={clothes} onOpen={openPlanned} />
                ))}
              </Card>
            )}

            {past.length > 0 && (
              <Card
                title={
                  <span style={styles.cardTitle}>
                    <HistoryOutlined style={{ color: COLORS.textSecondary, marginRight: 6 }} />
                    Geçmiş
                  </span>
                }
                bodyStyle={{ padding: '6px 12px' }}
              >
                {past.map((p) => (
                  <DiaryRow key={p.suggestion.id} planned={p} clothes={clothes} onOpen={openPlanned} />
                ))}
              </Card>
            )}
          </>
        )}
      </div>

      <Lightbox
        open={!!lightboxSlides}
        onClose={() => {
          setLightboxSlides(null)
          setSelectedDate(null)
        }}
        slides={
          lightboxSlides?.map((c) => ({
            src: clothingItemImageSrc(c),
            imageKey: c.id,
            title: c.label,
            description: selectedDate
              ? `${dayjs(selectedDate).format('DD MMM YYYY')} · ${c.description ?? ''}`
              : c.description,
          })) ?? []
        }
        startIndex={lightboxIndex}
      />
    </AppLayout>
  )
}

const DiaryRow: React.FC<{
  planned: PlannedOutfit
  clothes: Record<string, ClothingItem>
  onOpen: (p: PlannedOutfit) => void
}> = ({ planned: p, clothes, onOpen }) => {
  const items = p.suggestion.clothingItemIds
    .map((id) => clothes[id])
    .filter(Boolean) as ClothingItem[]
  return (
    <button type="button" onClick={() => onOpen(p)} style={styles.row}>
      <div style={styles.rowDate}>
        <strong style={{ color: COLORS.text, fontSize: 12 }}>
          {dayjs(p.date).format('DD MMM')}
        </strong>
        <div style={{ fontSize: 10, color: COLORS.textMuted }}>
          {dayjs(p.date).format('ddd')}
        </div>
      </div>
      <div style={styles.rowThumbs}>
        {items.slice(0, 6).map((c) => (
          <SmartImage
            key={c.id}
            cacheKey={c.id}
            src={clothingItemImageSrc(c)}
            style={{ width: 32, height: 32, borderRadius: 6 }}
          />
        ))}
        {items.length > 6 && <span style={styles.dots}>···</span>}
      </div>
      <Tag color={p.isPast ? 'default' : 'processing'} style={{ margin: 0 }}>
        {p.isPast ? 'Giyildi' : 'Planlandı'}
      </Tag>
    </button>
  )
}

const styles: Record<string, React.CSSProperties> = {
  hero: { padding: '4px 0 12px' },
  heroTitle: {
    margin: 0,
    fontSize: 26,
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '-0.6px',
  },
  heroSub: { margin: '4px 0 14px', color: COLORS.textSecondary, fontSize: 14 },
  cardTitle: { fontSize: 14, fontWeight: 600 },
  cellOverlay: {
    position: 'absolute' as const,
    bottom: 2,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: 2,
    alignItems: 'center',
    pointerEvents: 'none' as const,
  },
  cellMore: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: 700,
    lineHeight: 1,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    padding: '6px 0',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${COLORS.border}`,
    cursor: 'pointer',
    textAlign: 'left' as const,
  },
  rowDate: { minWidth: 50, lineHeight: 1.1 },
  rowThumbs: { flex: 1, display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' },
  moreCount: {
    fontSize: 10,
    color: COLORS.textMuted,
    background: 'rgba(255,255,255,0.06)',
    padding: '1px 5px',
    borderRadius: 6,
  },
  dots: {
    fontSize: 16,
    color: COLORS.textMuted,
    letterSpacing: 2,
    lineHeight: 1,
    fontWeight: 700,
    marginLeft: 2,
  },
}

export default OutfitDiary
