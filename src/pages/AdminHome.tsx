import {
  CalendarOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  CloseCircleFilled,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartFilled,
  InboxOutlined,
  RocketOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import {
  App,
  Avatar,
  Button,
  Card,
  Col,
  Empty,
  Row,
  Skeleton,
  Statistic,
  Tabs,
  Tag,
} from 'antd'
import dayjs from 'dayjs'
import {
  collection,
  deleteDoc,
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
import LoveSphere from '../components/LoveSphere'
import Lightbox from '../components/Lightbox'
import SmartImage from '../components/SmartImage'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { COLORS } from '../theme'
import { ClothingItem, OutfitRequest, OutfitSuggestion, UserProfile } from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'

const AdminHome: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { message, modal } = App.useApp()

  const [suggestions, setSuggestions] = useState<OutfitSuggestion[]>([])
  const [profiles, setProfiles] = useState<UserProfile[]>([])
  const [reqCache, setReqCache] = useState<Record<string, OutfitRequest>>({})
  const [clothesCache, setClothesCache] = useState<Record<string, ClothingItem>>({})
  const [pendingRequests, setPendingRequests] = useState<OutfitRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxItem, setLightboxItem] = useState<ClothingItem | null>(null)

  useEffect(() => {
    if (!user) return
    const q = query(collection(db, 'outfitRequests'), where('status', '==', 'pending'))
    return onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() } as OutfitRequest))
      list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
      setPendingRequests(list)
    })
  }, [user])

  useEffect(() => {
    if (!user) return
    const q = query(collection(db, 'outfitSuggestions'), where('advisorUid', '==', user.uid))
    return onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() } as OutfitSuggestion))
      list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
      setSuggestions(list)
      setLoading(false)
    })
  }, [user])

  // Profilleri cache'le
  useEffect(() => {
    if (!user) return
    const cacheKey = 'bk_profiles_cache_admin'
    const TTL = 10 * 60 * 1000
    try {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        const { data, ts } = JSON.parse(cached)
        if (Date.now() - ts < TTL) setProfiles(data)
      }
    } catch {}
    return onSnapshot(collection(db, 'profiles'), (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserProfile))
      setProfiles(list)
      try {
        localStorage.setItem(cacheKey, JSON.stringify({ data: list, ts: Date.now() }))
      } catch {}
    })
  }, [user])

  const profileName = (uid: string) =>
    profiles.find((p) => p.id === uid)?.displayName ??
    profiles.find((p) => p.id === uid)?.username ??
    uid.slice(0, 6)

  const loadRequest = async (requestId: string) => {
    if (reqCache[requestId]) return
    const s = await getDoc(doc(db, 'outfitRequests', requestId))
    if (!s.exists()) return
    setReqCache((prev) => ({ ...prev, [requestId]: { id: s.id, ...s.data() } as OutfitRequest }))
  }

  // Batch load clothes — 'in' query ile tek seferde 30 id (Firestore index optimizasyonu)
  const loadClothes = async (ids: string[]) => {
    const need = ids.filter((id) => !clothesCache[id])
    if (!need.length) return
    const newEntries: Record<string, ClothingItem> = {}
    for (let i = 0; i < need.length; i += 30) {
      const chunk = need.slice(i, i + 30)
      try {
        const q = query(collection(db, 'clothes'), where(documentId(), 'in', chunk))
        const snap = await getDocs(q)
        snap.docs.forEach((d) => {
          newEntries[d.id] = { id: d.id, ...d.data() } as ClothingItem
        })
      } catch {
        await Promise.all(
          chunk.map(async (id) => {
            const snap = await getDoc(doc(db, 'clothes', id))
            if (snap.exists()) newEntries[snap.id] = { id: snap.id, ...snap.data() } as ClothingItem
          }),
        )
      }
    }
    setClothesCache((prev) => ({ ...prev, ...newEntries }))
  }

  useEffect(() => {
    suggestions.forEach((s) => {
      loadRequest(s.requestId)
      loadClothes(s.clothingItemIds ?? [])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestions.map((s) => s.id).join('|')])

  const rows = useMemo(() => {
    return suggestions.map((s) => ({ s, r: reqCache[s.requestId] }))
  }, [suggestions, reqCache])

  const stats = useMemo(() => {
    const total = suggestions.length
    const liked = suggestions.filter((s) => s.liked === 'yes').length
    const disliked = suggestions.filter((s) => s.liked === 'no').length
    const waiting = suggestions.filter((s) => s.liked === null || s.liked === undefined).length
    return { total, liked, disliked, waiting }
  }, [suggestions])

  return (
    <AppLayout>
      <div className="bk-container-wide">
        {/* Hero */}
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>
            <RocketOutlined style={{ color: COLORS.primary, marginRight: 10 }} />
            Stilist Paneli
          </h1>
          <p style={styles.heroSub}>Gelen istekleri yanıtla, önerilerini yönet</p>
        </div>

        {/* Aşk Küresi — Buşra & Kamuran için günlük check-in */}
        <LoveSphere />

        {/* Stats */}
        <Row gutter={[12, 12]} style={{ marginBottom: 20 }}>
          <Col xs={12} sm={6}>
            <StatCard
              title="Toplam"
              value={stats.total}
              icon={<ThunderboltOutlined />}
              color={COLORS.primary}
            />
          </Col>
          <Col xs={12} sm={6}>
            <StatCard
              title="Beğenildi"
              value={stats.liked}
              icon={<HeartFilled />}
              color={COLORS.success}
            />
          </Col>
          <Col xs={12} sm={6}>
            <StatCard
              title="Bekliyor"
              value={stats.waiting}
              icon={<ClockCircleOutlined />}
              color={COLORS.warning}
            />
          </Col>
          <Col xs={12} sm={6}>
            <StatCard
              title="Değişiklik"
              value={stats.disliked}
              icon={<CommentOutlined />}
              color={COLORS.error}
            />
          </Col>
        </Row>

        {/* Tabs */}
        <Tabs
          defaultActiveKey="incoming"
          size="large"
          items={[
            {
              key: 'incoming',
              label: (
                <span>
                  <InboxOutlined /> Gelen İstekler{' '}
                  {pendingRequests.length > 0 && (
                    <Tag color="warning" style={{ marginLeft: 6 }}>
                      {pendingRequests.length}
                    </Tag>
                  )}
                </span>
              ),
              children: (
                <IncomingRequestsList
                  requests={pendingRequests}
                  profileName={profileName}
                  onRespond={(r) => navigate(`/kombin/yanit/${r.id}`)}
                  onDelete={(r) => {
                    modal.confirm({
                      title: 'Bu talebi silmek istediğine emin misin?',
                      okText: 'Sil',
                      okType: 'danger',
                      cancelText: 'Vazgeç',
                      centered: true,
                      onOk: async () => {
                        try {
                          await deleteDoc(doc(db, 'outfitRequests', r.id))
                          message.success('Silindi')
                        } catch {
                          message.error('Silinemedi')
                        }
                      },
                    })
                  }}
                />
              ),
            },
            {
              key: 'suggestions',
              label: (
                <span>
                  <ThunderboltOutlined /> Önerilerim ({rows.length})
                </span>
              ),
              children: (
                <SuggestionsList
                  rows={rows}
                  clothesCache={clothesCache}
                  profileName={profileName}
                  loading={loading}
                  onPreview={(item) => setLightboxItem(item)}
                  onEdit={(s) => navigate(`/kombin/duzenle/${s.id}`)}
                  onDelete={(s) => {
                    modal.confirm({
                      title: 'Bu öneriyi silmek istediğine emin misin?',
                      okText: 'Sil',
                      okType: 'danger',
                      cancelText: 'Vazgeç',
                      centered: true,
                      onOk: async () => {
                        try {
                          await deleteDoc(doc(db, 'outfitSuggestions', s.id))
                          message.success('Silindi')
                        } catch {
                          message.error('Silinemedi')
                        }
                      },
                    })
                  }}
                />
              ),
            },
          ]}
        />
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

const StatCard: React.FC<{
  title: string
  value: number
  icon: React.ReactNode
  color: string
}> = ({ title, value, icon, color }) => (
  <Card style={{ height: '100%' }} bodyStyle={{ padding: 16 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          background: `${color}1f`,
          color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
        }}
      >
        {icon}
      </div>
      <Statistic
        title={<span style={{ color: COLORS.textSecondary, fontSize: 12 }}>{title}</span>}
        value={value}
        valueStyle={{ fontSize: 22, fontWeight: 700, color: COLORS.text }}
      />
    </div>
  </Card>
)

const IncomingRequestsList: React.FC<{
  requests: OutfitRequest[]
  profileName: (uid: string) => string
  onRespond: (r: OutfitRequest) => void
  onDelete: (r: OutfitRequest) => void
}> = ({ requests, profileName, onRespond, onDelete }) => {
  if (requests.length === 0) {
    return (
      <Card>
        <Empty
          description={
            <span style={{ color: COLORS.textSecondary }}>Bekleyen talep yok 🎉</span>
          }
        />
      </Card>
    )
  }
  return (
    <Row gutter={[12, 12]}>
      {requests.map((r) => (
        <Col xs={24} sm={12} lg={8} key={r.id}>
          <Card
            actions={[
              <Button
                key="r"
                type="primary"
                icon={<ThunderboltOutlined />}
                onClick={() => onRespond(r)}
              >
                Öner
              </Button>,
              <Button
                key="d"
                danger
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => onDelete(r)}
              />,
            ]}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <Avatar size={40} style={{ background: COLORS.gradient }}>
                {profileName(r.fromUid)[0]?.toUpperCase()}
              </Avatar>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: COLORS.text }}>{profileName(r.fromUid)}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>
                  {dayjs(r.createdAt).format('DD MMM HH:mm')}
                </div>
              </div>
              <Tag color="warning" icon={<ClockCircleOutlined />} style={{ marginRight: 0 }}>
                Bekliyor
              </Tag>
            </div>
            {r.requestDate && (
              <p style={{ fontSize: 12, color: COLORS.primary, margin: '0 0 6px' }}>
                <CalendarOutlined style={{ marginRight: 4 }} />
                {dayjs(r.requestDate).format('DD MMMM YYYY')}
              </p>
            )}
            {r.note ? (
              <p style={{ fontSize: 13, color: COLORS.textSecondary, margin: 0, fontStyle: 'italic' }}>
                "{r.note}"
              </p>
            ) : (
              <p style={{ fontSize: 12, color: COLORS.textMuted, margin: 0 }}>Not eklenmedi</p>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  )
}

const SuggestionsList: React.FC<{
  rows: { s: OutfitSuggestion; r: OutfitRequest | undefined }[]
  clothesCache: Record<string, ClothingItem>
  profileName: (uid: string) => string
  loading: boolean
  onPreview: (item: ClothingItem) => void
  onEdit: (s: OutfitSuggestion) => void
  onDelete: (s: OutfitSuggestion) => void
}> = ({ rows, clothesCache, profileName, loading, onPreview, onEdit, onDelete }) => {
  if (loading) {
    return (
      <Card>
        <Skeleton active />
      </Card>
    )
  }
  if (rows.length === 0) {
    return (
      <Card>
        <Empty
          description={
            <span style={{ color: COLORS.textSecondary }}>Henüz öneri yapmadın</span>
          }
        />
      </Card>
    )
  }
  return (
    <Row gutter={[12, 12]} align="stretch">
      {rows.map(({ s, r }) => {
        const who = r ? profileName(r.fromUid) : '...'
        const likedTag =
          s.liked === 'yes' ? (
            <Tag color="success" icon={<CheckCircleFilled />}>
              Beğenildi
            </Tag>
          ) : s.liked === 'no' ? (
            <Tag color="error" icon={<CloseCircleFilled />}>
              Değişiklik
            </Tag>
          ) : (
            <Tag color="warning" icon={<ClockCircleOutlined />}>
              Bekliyor
            </Tag>
          )
        return (
          <Col xs={24} md={12} key={s.id} style={{ display: 'flex' }}>
            <Card
              style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
              bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
              actions={[
                <Button
                  key="e"
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => onEdit(s)}
                >
                  Düzenle
                </Button>,
                <Button
                  key="d"
                  danger
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => onDelete(s)}
                />,
              ]}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <Avatar size={36} style={{ background: COLORS.gradient }}>
                  {who[0]?.toUpperCase()}
                </Avatar>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: COLORS.text }}>{who}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>
                    {dayjs(s.createdAt).format('DD MMM HH:mm')}
                  </div>
                </div>
                {likedTag}
              </div>

              {r?.weather && (
                <div style={styles.metaPill}>
                  {r.weather.icon} {r.weather.temp}°C · {r.weather.description}
                  {r.weather.city && (
                    <> · 📍 {r.weather.district ? `${r.weather.district}, ` : ''}{r.weather.city}</>
                  )}
                </div>
              )}
              {r && (r.requestDate || r.weekStartDate) && (
                <div style={styles.metaPill}>
                  <CalendarOutlined style={{ marginRight: 4 }} />
                  {r.requestType === 'weekly'
                    ? `${dayjs(r.weekStartDate).format('DD MMM')} - ${dayjs(r.weekStartDate).add(4, 'day').format('DD MMM')}`
                    : dayjs(r.requestDate).format('DD MMMM YYYY, dddd')}
                </div>
              )}
              {r?.note && (
                <p style={styles.requestNote}>
                  <strong style={{ color: COLORS.text }}>Talep notu:</strong>{' '}
                  <em>"{r.note}"</em>
                </p>
              )}

              <div style={styles.suggThumbs}>
                {(s.clothingItemIds ?? []).map((id) => {
                  const c = clothesCache[id]
                  if (!c) {
                    return (
                      <div key={id} style={styles.thumbCol}>
                        <div
                          className="skeleton"
                          style={{ width: 72, height: 72, borderRadius: 10 }}
                        />
                      </div>
                    )
                  }
                  const labelText = c.label || c.description
                  return (
                    <div key={id} style={styles.thumbCol}>
                      <button
                        type="button"
                        onClick={() => onPreview(c)}
                        style={styles.thumbBtn}
                        aria-label="Görseli büyüt"
                      >
                        <SmartImage
                          cacheKey={c.id}
                          src={clothingItemImageSrc(c)}
                          style={{ width: 72, height: 72, borderRadius: 10 }}
                        />
                      </button>
                      {labelText && <span style={styles.thumbLabel}>{labelText}</span>}
                    </div>
                  )
                })}
              </div>

              {s.advisorNote && (
                <p style={{ fontSize: 13, color: COLORS.textSecondary, margin: '12px 0 4px' }}>
                  <strong style={{ color: COLORS.text }}>Notum:</strong> {s.advisorNote}
                </p>
              )}
              {s.comment && (
                <p style={{ fontSize: 13, color: COLORS.textSecondary, margin: '4px 0 0' }}>
                  <strong style={{ color: COLORS.text }}>Yanıt:</strong> {s.comment}
                </p>
              )}
              <div style={{ flex: 1 }} />
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}

const styles: Record<string, React.CSSProperties> = {
  hero: { padding: '4px 0 16px' },
  heroTitle: {
    margin: 0,
    fontSize: 28,
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '-0.6px',
  },
  heroSub: { margin: '4px 0 16px', color: COLORS.textSecondary, fontSize: 14 },
  metaPill: {
    display: 'inline-block' as const,
    fontSize: 11,
    color: COLORS.textSecondary,
    background: 'rgba(124,140,255,0.10)',
    border: `1px solid ${COLORS.border}`,
    padding: '3px 8px',
    borderRadius: 999,
    margin: '0 6px 6px 0',
  },
  requestNote: {
    margin: '6px 0 10px',
    padding: '8px 10px',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    fontSize: 12,
    color: COLORS.textSecondary,
    fontStyle: 'italic' as const,
  },
  suggThumbs: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  thumbCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 4,
    maxWidth: 80,
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
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: 'center' as const,
    lineHeight: 1.25,
    maxWidth: 80,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
  },
}

export default AdminHome
