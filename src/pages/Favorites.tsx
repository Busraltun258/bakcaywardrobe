import {
  ArrowLeftOutlined,
  CalendarOutlined,
  HeartFilled,
  SearchOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { Button, Card, Empty, Input, Skeleton, Tag } from 'antd'
import dayjs from 'dayjs'
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
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Lightbox from '../components/Lightbox'
import SmartImage from '../components/SmartImage'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { COLORS } from '../theme'
import { ClothingItem, OutfitRequest, OutfitSuggestion, UserProfile } from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'
import { getWornDate } from '../utils/outfitDate'

/**
 * Kullanıcının beğendiği (liked='yes') tüm kombin önerilerini görüntüleyen sayfa.
 * Beğeni tarihine göre en yeniden en eskiye.
 */
const Favorites: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [suggestions, setSuggestions] = useState<OutfitSuggestion[]>([])
  const [items, setItems] = useState<Record<string, ClothingItem>>({})
  const [requests, setRequests] = useState<Record<string, OutfitRequest>>({})
  const [profiles, setProfiles] = useState<Record<string, UserProfile>>({})
  const [lightboxItem, setLightboxItem] = useState<ClothingItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }
    const q = query(
      collection(db, 'outfitSuggestions'),
      where('requesterUid', '==', user.uid),
      where('liked', '==', 'yes'),
    )
    return onSnapshot(
      q,
      (snap) => {
        // Favoriler = SADECE 5 yıldız. Eski "Beğendim"-without-rating buraya düşmez.
        const list = snap.docs
          .map((d) => ({ id: d.id, ...d.data() } as OutfitSuggestion))
          .filter((s) => s.rating === 5)
        // Yıldız sayısı yüksek olanlar başta, sonra feedback tarihine göre
        list.sort((a, b) => {
          const ra = a.rating ?? 0
          const rb = b.rating ?? 0
          if (ra !== rb) return rb - ra
          return (b.feedbackAt ?? b.createdAt ?? 0) - (a.feedbackAt ?? a.createdAt ?? 0)
        })
        setSuggestions(list)
        setLoading(false)
      },
      (err) => {
        console.error('favorites subscribe error:', err)
        setLoading(false)
      },
    )
  }, [user])

  // Tüm kıyafet thumbnaillerini batch ile yükle
  useEffect(() => {
    const allIds = Array.from(new Set(suggestions.flatMap((s) => s.clothingItemIds)))
    const need = allIds.filter((id) => !items[id])
    if (need.length === 0) return
    ;(async () => {
      const map: Record<string, ClothingItem> = {}
      for (let i = 0; i < need.length; i += 30) {
        const chunk = need.slice(i, i + 30)
        try {
          const q = query(collection(db, 'clothes'), where(documentId(), 'in', chunk))
          const snap = await getDocs(q)
          snap.docs.forEach((d) => {
            map[d.id] = { id: d.id, ...d.data() } as ClothingItem
          })
        } catch {
          /* ignore */
        }
      }
      setItems((prev) => ({ ...prev, ...map }))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestions.map((s) => s.id).join('|')])

  // Önerilere ait talepleri yükle — kombinin giyileceği/giyildiği tarih için
  useEffect(() => {
    const ids = Array.from(new Set(suggestions.map((s) => s.requestId).filter(Boolean)))
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
          /* ignore */
        }
      }
      setRequests((prev) => ({ ...prev, ...map }))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestions.map((s) => s.requestId).join('|')])

  // Stilist profillerini yükle
  useEffect(() => {
    const uids = Array.from(new Set(suggestions.map((s) => s.advisorUid)))
    const need = uids.filter((u) => !profiles[u])
    if (need.length === 0) return
    ;(async () => {
      const map: Record<string, UserProfile> = {}
      await Promise.all(
        need.map(async (uid) => {
          const snap = await getDoc(doc(db, 'profiles', uid))
          if (snap.exists()) map[uid] = { id: snap.id, ...snap.data() } as UserProfile
        }),
      )
      setProfiles((prev) => ({ ...prev, ...map }))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestions.map((s) => s.advisorUid).join('|')])

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    if (!s) return suggestions
    return suggestions.filter((sg) => {
      if (sg.advisorNote?.toLowerCase().includes(s)) return true
      if (sg.comment?.toLowerCase().includes(s)) return true
      return sg.clothingItemIds.some((id) => {
        const c = items[id]
        return c?.label?.toLowerCase().includes(s) || c?.description?.toLowerCase().includes(s)
      })
    })
  }, [suggestions, search, items])

  return (
    <AppLayout>
      <div className="bk-container">
        <div style={{ marginBottom: 8 }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/kombin')}
            style={{ color: COLORS.textSecondary }}
          >
            Geri
          </Button>
        </div>

        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>
            <HeartFilled style={{ color: COLORS.error, marginRight: 10 }} />
            Favori Kombinler
          </h1>
          <p style={styles.heroSub}>Beğendiğin öneriler tek bir yerde, ne zaman istersen tekrar bak</p>
        </div>

        <Input
          size="large"
          placeholder="Etiket, not, açıklama ara…"
          prefix={<SearchOutlined style={{ color: COLORS.textMuted }} />}
          allowClear
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 18 }}
        />

        {loading ? (
          <Card>
            <Skeleton active />
          </Card>
        ) : filtered.length === 0 ? (
          <Card>
            <Empty
              description={
                <span style={{ color: COLORS.textSecondary }}>
                  {search ? 'Aramana uyan öneri yok' : 'Henüz favoriye eklediğin öneri yok'}
                </span>
              }
            />
          </Card>
        ) : (
          filtered.map((s) => {
            const advisor =
              profiles[s.advisorUid]?.displayName ?? profiles[s.advisorUid]?.username ?? 'Stilist'
            const wornDate = getWornDate(s, requests[s.requestId])
            return (
              <Card key={s.id} style={{ marginBottom: 12 }}>
                <div style={styles.cardHeader}>
                  <div>
                    <strong style={{ color: COLORS.text, fontSize: 14 }}>
                      <ThunderboltOutlined style={{ color: COLORS.primary, marginRight: 6 }} />
                      {advisor}'in önerisi
                    </strong>
                    <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>
                      <CalendarOutlined style={{ marginRight: 4 }} />
                      {wornDate
                        ? `Giyildiği gün: ${dayjs(wornDate).format('DD MMM YYYY')}`
                        : dayjs(s.feedbackAt ?? s.createdAt).format('DD MMM YYYY')}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    {s.rating && s.rating > 0 && (
                      <span style={{ fontSize: 14, letterSpacing: 1 }}>
                        {'⭐'.repeat(s.rating)}
                      </span>
                    )}
                    <Tag color="success" icon={<HeartFilled />} style={{ margin: 0 }}>
                      Favori
                    </Tag>
                  </div>
                </div>

                {s.advisorNote && (
                  <p style={styles.note}>
                    <strong style={{ color: COLORS.text }}>Not:</strong> {s.advisorNote}
                  </p>
                )}

                <div style={styles.thumbs}>
                  {s.clothingItemIds.map((id) => {
                    const c = items[id]
                    if (!c) {
                      return (
                        <div
                          key={id}
                          className="skeleton"
                          style={{ width: 80, height: 80, borderRadius: 10 }}
                        />
                      )
                    }
                    const label = c.label || c.description
                    return (
                      <div key={id} style={styles.thumbCol}>
                        <button
                          type="button"
                          onClick={() => setLightboxItem(c)}
                          style={styles.thumbBtn}
                          aria-label="Görseli büyüt"
                        >
                          <SmartImage
                            cacheKey={c.id}
                            src={clothingItemImageSrc(c)}
                            style={{ width: 80, height: 80, borderRadius: 10 }}
                          />
                        </button>
                        {label && <span style={styles.thumbLabel}>{label}</span>}
                      </div>
                    )
                  })}
                </div>

                {s.comment && (
                  <p style={styles.note}>
                    <strong style={{ color: COLORS.text }}>Yorumum:</strong> {s.comment}
                  </p>
                )}
              </Card>
            )
          })
        )}
      </div>

      <Lightbox
        open={!!lightboxItem}
        onClose={() => setLightboxItem(null)}
        imageKey={lightboxItem?.id}
        src={lightboxItem ? clothingItemImageSrc(lightboxItem) : ''}
        title={lightboxItem?.label}
        description={lightboxItem?.description}
      />
    </AppLayout>
  )
}

const styles: Record<string, React.CSSProperties> = {
  hero: { padding: '4px 0 16px' },
  heroTitle: {
    margin: 0,
    fontSize: 26,
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '-0.6px',
  },
  heroSub: { margin: '4px 0 16px', color: COLORS.textSecondary, fontSize: 14 },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 10,
  },
  note: { margin: '10px 0', fontSize: 13, color: COLORS.textSecondary },
  thumbs: { display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  thumbCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 4,
    maxWidth: 90,
  },
  thumbBtn: {
    padding: 0,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: 10,
    overflow: 'hidden',
    lineHeight: 0,
  },
  thumbLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center' as const,
    lineHeight: 1.3,
    maxWidth: 90,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
  },
}

export default Favorites
