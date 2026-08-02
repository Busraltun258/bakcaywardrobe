import {
  ArrowDownOutlined,
  ArrowUpOutlined,
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
  SearchOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import {
  App,
  Avatar,
  Button,
  Card,
  Col,
  Empty,
  Input,
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
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Lightbox from '../components/Lightbox'
import SmartImage from '../components/SmartImage'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { COLORS } from '../theme'
import { ClothingItem, OutfitMessage, OutfitRequest, OutfitSuggestion, UserProfile } from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'
import { buildThread, sendMessageToSuggestion } from '../utils/outfitMessages'

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
  const [suggSearch, setSuggSearch] = useState('')
  // "Geri dön" geri-dönüş yığını: her ok atlamasında konum eklenir; kısa dokunuş bir
  // öncekine döner, uzun basış hep en başa. Buton, ok atlaması olmasa da sayfa aşağı
  // kaydırılınca görünür (başa dönebilmek için).
  const [backStack, setBackStack] = useState<number[]>([])
  const [scrolledDown, setScrolledDown] = useState(false)
  const pressStartRef = useRef(0)

  // Bildirimden gelen ?focus=<id> — ilgili sekmeye geçip o kombine kaydır
  const [searchParams] = useSearchParams()
  const focusId = searchParams.get('focus')
  const focusDone = useRef(false)
  const [activeTab, setActiveTab] = useState<string>(focusId ? 'suggestions' : 'incoming')

  // Bir parçanın en son kullanıldığı BAŞKA kombine kaydır + vurgu.
  // Parçanın geçtiği kombinler arasında sırayla gez (sona gelince başa döner),
  // eskiden sadece en yeni 2 kombin arasında gidip geliyordu. DOM'da olmayan
  // (filtrelenmiş) kombinleri atlar ki iki kombin arasında takılmasın.
  const jumpToItemUsage = (itemId: string, fromSuggestionId: string) => {
    const all = [...suggestions]
      .filter((s) => (s.clothingItemIds ?? []).includes(itemId))
      .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
    if (all.length <= 1) {
      message.info('Bu parça başka bir kombinde kullanılmamış')
      return
    }
    const startIdx = all.findIndex((s) => s.id === fromSuggestionId)
    for (let step = 1; step <= all.length; step++) {
      const cand = all[(startIdx + step) % all.length]
      if (cand.id === fromSuggestionId) break
      const el = document.getElementById(`suggestion-${cand.id}`)
      if (el) {
        setBackStack((s) => [...s, window.scrollY])
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.classList.add('bk-pulse-highlight')
        setTimeout(() => el.classList.remove('bk-pulse-highlight'), 2500)
        return
      }
    }
    message.info('İlgili kombin bu listede görünmüyor')
  }

  // Sayfa aşağı kaydırılınca "Geri dön" butonunu göster (başa dönebilmek için).
  useEffect(() => {
    const onScroll = () => setScrolledDown(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  // Bekleyen taleplerde kullanıcının seçtiği parçaların görsellerini yükle
  useEffect(() => {
    const ids = pendingRequests.flatMap((r) => r.requestedItemIds ?? [])
    if (ids.length) loadClothes(ids)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingRequests.map((r) => r.id).join('|')])

  const rows = useMemo(() => {
    return suggestions.map((s) => ({ s, r: reqCache[s.requestId] }))
  }, [suggestions, reqCache])

  // Yarım kalan haftalık istekler: 5 günün hepsi doldurulmamış ama "Gelen İstekler"de
  // (pending) görünmeyenler. Büşra buradan devam edip kalan günleri ekleyebilsin.
  const incompleteWeekly = useMemo(() => {
    const pendingIds = new Set(pendingRequests.map((r) => r.id))
    const byReq: Record<string, Set<number>> = {}
    suggestions.forEach((s) => {
      const r = reqCache[s.requestId]
      if (!r || r.requestType !== 'weekly') return
      ;(byReq[s.requestId] ??= new Set()).add(s.dayIndex ?? 0)
    })
    const out: { r: OutfitRequest; done: number }[] = []
    Object.entries(byReq).forEach(([rid, days]) => {
      if (days.size >= 5 || pendingIds.has(rid)) return
      const r = reqCache[rid]
      if (r) out.push({ r, done: days.size })
    })
    return out.sort((a, b) => (b.r.createdAt ?? 0) - (a.r.createdAt ?? 0))
  }, [suggestions, reqCache, pendingRequests])

  // Önerilerde arama: kullanıcı adı, talep notu, stilist notu/mesajlar, parça etiket/açıklama
  const filteredRows = useMemo(() => {
    const term = suggSearch.trim().toLowerCase()
    if (!term) return rows
    return rows.filter(({ s, r }) => {
      if (r && profileName(r.fromUid).toLowerCase().includes(term)) return true
      if (r?.note?.toLowerCase().includes(term)) return true
      if (s.advisorNote?.toLowerCase().includes(term)) return true
      if (s.comment?.toLowerCase().includes(term)) return true
      if (s.messages?.some((m) => m.text?.toLowerCase().includes(term))) return true
      return (s.clothingItemIds ?? []).some((id) => {
        const c = clothesCache[id]
        return (
          c?.label?.toLowerCase().includes(term) ||
          c?.description?.toLowerCase().includes(term)
        )
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, suggSearch, clothesCache, profiles])

  // --- FOCUS EFEKTİ ---
  useEffect(() => {
    if (!focusId || focusDone.current || loading) return

    // DOM'un render olması için kısa bir gecikme ekliyoruz
    const timer = setTimeout(() => {
      const el = document.getElementById(`suggestion-${focusId}`)
      if (el) {
        focusDone.current = true
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.classList.add('bk-pulse-highlight')
        setTimeout(() => el.classList.remove('bk-pulse-highlight'), 2500)
      }
    }, 150)

    return () => clearTimeout(timer)
  }, [focusId, loading, suggestions])

  const stats = useMemo(() => {
    const total = suggestions.length
    const liked = suggestions.filter((s) => s.liked === 'yes').length
    const favorites = suggestions.filter((s) => s.rating === 5).length
    const disliked = suggestions.filter((s) => s.liked === 'no').length
    const waiting = suggestions.filter((s) => s.liked === null || s.liked === undefined).length
    return { total, liked, favorites, disliked, waiting }
  }, [suggestions])

  // Bildirime tıklayınca gelen kombine kaydır + vurgula (bir kez).
  useEffect(() => {
    if (!focusId || focusDone.current || loading) return
    if (!rows.some((r) => r.s.id === focusId)) return
    setActiveTab('suggestions')
    const t = setTimeout(() => {
      const el = document.getElementById(`suggestion-${focusId}`)
      if (!el) return
      focusDone.current = true
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('bk-pulse-highlight')
      setTimeout(() => el.classList.remove('bk-pulse-highlight'), 2500)
    }, 450)
    return () => clearTimeout(t)
  }, [focusId, loading, rows])

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
              title="Favoriler (5⭐)"
              value={stats.favorites}
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
          activeKey={activeTab}
          onChange={setActiveTab}
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
                <>
                  {incompleteWeekly.length > 0 && (
                    <Card
                      style={{ marginBottom: 12, background: 'rgba(250,173,20,0.06)' }}
                      styles={{ body: { padding: 14 } }}
                    >
                      <div style={{ fontWeight: 600, color: COLORS.text, marginBottom: 4 }}>
                        ⏳ Yarım kalan haftalık istekler
                      </div>
                      <p style={{ margin: '0 0 10px', fontSize: 12, color: COLORS.textMuted }}>
                        Bu haftalık isteklerin bazı günleri eksik — devam edip tamamla.
                      </p>
                      {incompleteWeekly.map(({ r, done }) => (
                        <div key={r.id} style={styles.incompleteRow}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <span style={{ color: COLORS.text, fontWeight: 600 }}>
                              {profileName(r.fromUid)}
                            </span>
                            <span style={{ color: COLORS.textMuted, fontSize: 12, marginLeft: 8 }}>
                              {r.weekStartDate
                                ? `${dayjs(r.weekStartDate).format('DD MMM')} haftası`
                                : ''}
                            </span>
                            <Tag color="warning" style={{ marginLeft: 8 }}>
                              {done}/5 gün
                            </Tag>
                          </div>
                          <Button
                            type="primary"
                            size="small"
                            icon={<ThunderboltOutlined />}
                            onClick={() => navigate(`/kombin/yanit/${r.id}`)}
                          >
                            Kalan günleri ekle
                          </Button>
                        </div>
                      ))}
                    </Card>
                  )}
                  <IncomingRequestsList
                    requests={pendingRequests}
                    profileName={profileName}
                    clothesCache={clothesCache}
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
                </>
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
                <>
                {rows.length > 0 && (
                  <Input
                    size="middle"
                    placeholder="Kullanıcı, marka, renk, etiket, not ara…"
                    prefix={<SearchOutlined style={{ color: COLORS.textMuted }} />}
                    allowClear
                    value={suggSearch}
                    onChange={(e) => setSuggSearch(e.target.value)}
                    style={{ marginBottom: 12, maxWidth: 420 }}
                  />
                )}
                <SuggestionsList
                  rows={filteredRows}
                  clothesCache={clothesCache}
                  profileName={profileName}
                  advisorUid={user?.uid ?? ''}
                  loading={loading}
                  onPreview={(item) => setLightboxItem(item)}
                  onJumpToItem={jumpToItemUsage}
                  onEdit={(s) => navigate(`/kombin/duzenle/${s.id}`)}
                  onDelete={(s) => {
                    modal.confirm({
                      title: 'Bu öneriyi silmek istediğine emin misin?',
                      content:
                        'Bu önerinin tek istek için son öneri olması durumunda, talep kartı da silinir.',
                      okText: 'Sil',
                      okType: 'danger',
                      cancelText: 'Vazgeç',
                      centered: true,
                      onOk: async () => {
                        try {
                          await deleteDoc(doc(db, 'outfitSuggestions', s.id))
                          const remaining = suggestions.filter(
                            (x) => x.requestId === s.requestId && x.id !== s.id,
                          )
                          if (remaining.length === 0 && s.requestId) {
                            await deleteDoc(doc(db, 'outfitRequests', s.requestId)).catch(
                              () => undefined,
                            )
                          }
                          message.success('Silindi')
                        } catch {
                          message.error('Silinemedi')
                        }
                      },
                    })
                  }}
                />
                </>
              ),
            },
          ]}
        />
      </div>

      {(backStack.length > 0 || scrolledDown) && (
        <button
          type="button"
          onPointerDown={() => {
            pressStartRef.current = Date.now()
          }}
          onClick={() => {
            const held = Date.now() - (pressStartRef.current || Date.now())
            if (held >= 500) {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setBackStack([])
            } else if (backStack.length > 0) {
              setBackStack((s) => {
                const next = [...s]
                const y = next.pop() ?? 0
                window.scrollTo({ top: y, behavior: 'smooth' })
                return next
              })
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          style={styles.jumpBackBtn}
          title="Dokun: bir öncekine · Basılı tut: en başa"
        >
          <ArrowUpOutlined /> Geri dön
        </button>
      )}

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
  clothesCache: Record<string, ClothingItem>
  onRespond: (r: OutfitRequest) => void
  onDelete: (r: OutfitRequest) => void
}> = ({ requests, profileName, clothesCache, onRespond, onDelete }) => {
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

            {(r.requestedItemIds?.length ?? 0) > 0 && (
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 11, color: COLORS.primary, fontWeight: 600, marginBottom: 6 }}>
                  🧺 Bu parçaları istedi:
                </div>
                <div style={styles.reqThumbs}>
                  {r.requestedItemIds!.map((id) => {
                    const c = clothesCache[id]
                    return (
                      <div key={id} style={styles.reqThumbCell}>
                        {c ? (
                          <SmartImage
                            cacheKey={c.id}
                            src={clothingItemImageSrc(c)}
                            style={{ width: '100%', height: '100%' }}
                          />
                        ) : (
                          <div className="skeleton" style={{ width: '100%', height: '100%' }} />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
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
  advisorUid: string
  loading: boolean
  onPreview: (item: ClothingItem) => void
  onJumpToItem: (itemId: string, fromSuggestionId: string) => void
  onEdit: (s: OutfitSuggestion) => void
  onDelete: (s: OutfitSuggestion) => void
}> = ({ rows, clothesCache, profileName, advisorUid, loading, onPreview, onJumpToItem, onEdit, onDelete }) => {
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
            <span style={{ color: COLORS.textSecondary }}>Öneri bulunamadı</span>
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
        const ratingTag =
          s.rating && s.rating > 0 ? (
            <span style={styles.ratingTag} title={`${s.rating} yıldız`}>
              {'⭐'.repeat(s.rating)}
            </span>
          ) : null
        return (
          <Col xs={24} md={12} key={s.id} id={`suggestion-${s.id}`} style={{ display: 'flex' }}>
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
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  {ratingTag}
                  {likedTag}
                </div>
              </div>

              {r?.weather && (
                <div style={styles.metaPill}>
                  {r.weather.icon} {r.weather.temp}°C · {r.weather.description}
                  {r.weather.city && (
                    <> · 📍 {r.weather.district ? `${r.weather.district}, ` : ''}{r.weather.city}</>
                  )}
                </div>
              )}
              {r && (
                <div style={styles.dateBlock}>
                  <div style={styles.dateLine}>
                    <span style={styles.dateLabelTxt}>📤 Talep edildi:</span>
                    <span style={styles.dateValTxt}>
                      {dayjs(r.createdAt).format('DD MMM YYYY · HH:mm')}
                    </span>
                  </div>
                  {(r.requestDate || r.weekStartDate) && (
                    <div style={styles.dateLine}>
                      <span style={styles.dateLabelTxt}>👕 Giyilecek:</span>
                      <span style={{ ...styles.dateValTxt, color: COLORS.primary, fontWeight: 600 }}>
                        {r.requestType === 'weekly'
                          ? `${dayjs(r.weekStartDate).format('DD MMM')} - ${dayjs(r.weekStartDate).add(4, 'day').format('DD MMM')}`
                          : dayjs(r.requestDate).format('DD MMMM YYYY, dddd')}
                      </span>
                    </div>
                  )}
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
                  const showJump = c.category !== 'aksesuar' && c.category !== 'ayakkabi'
                  return (
                    <div key={id} style={{ ...styles.thumbCol, position: 'relative' }}>
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
                      {showJump && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            onJumpToItem(id, s.id)
                          }}
                          style={styles.jumpArrow}
                          title="Bu parçanın en son kullanıldığı kombine git"
                          aria-label="En son kullanıldığı kombine git"
                        >
                          <ArrowDownOutlined style={{ fontSize: 10 }} />
                        </button>
                      )}
                      {labelText && <span style={styles.thumbLabel}>{labelText}</span>}
                    </div>
                  )
                })}
              </div>

              <SuggestionThread
                s={s}
                who={who}
                advisorUid={advisorUid}
                profileName={profileName}
              />
              <div style={{ flex: 1 }} />
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}

/** Bir öneri altındaki stilist ↔ kullanıcı mesaj geçmişi + stilist cevap kutusu. */
const SuggestionThread: React.FC<{
  s: OutfitSuggestion
  who: string
  advisorUid: string
  profileName: (uid: string) => string
}> = ({ s, who, advisorUid, profileName }) => {
  const { message } = App.useApp()
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)
  const thread = buildThread(s)

  const sendReply = async () => {
    const text = reply.trim()
    if (!text) {
      message.warning('Önce bir şeyler yaz 😊')
      return
    }
    setSending(true)
    try {
      const msg: OutfitMessage = { role: 'advisor', uid: advisorUid, text, at: Date.now() }
      await sendMessageToSuggestion(s.id, msg, { advisorNote: text })
      setReply('')
      message.success('Yanıtın gönderildi 💌')
    } catch {
      message.error('Gönderilemedi')
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{ marginTop: 12 }}>
      {thread.length > 0 && (
        <div style={styles.threadBlock}>
          {thread.map((m, i) => (
            <div
              key={i}
              style={{
                ...styles.threadRow,
                ...(m.role === 'user' ? styles.threadRowUser : styles.threadRowAdvisor),
              }}
            >
              <div
                style={{
                  ...styles.threadWho,
                  color: m.role === 'user' ? '#f472b6' : COLORS.primary,
                }}
              >
                {m.role === 'advisor' ? `📝 ${profileName(m.uid || s.advisorUid)}` : `💬 ${who}`}
              </div>
              <div style={styles.threadText}>"{m.text}"</div>
            </div>
          ))}
        </div>
      )}
      <Input.TextArea
        placeholder={`${who} kullanıcısına yanıt yaz…`}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        rows={2}
        style={{ marginTop: 8 }}
      />
      <Button
        size="small"
        type="primary"
        icon={<CommentOutlined />}
        onClick={sendReply}
        loading={sending}
        style={{ marginTop: 8 }}
      >
        Yanıtla
      </Button>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  hero: { padding: '4px 0 16px' },
  incompleteRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 0',
    borderTop: `1px solid ${COLORS.border}`,
    flexWrap: 'wrap' as const,
  },
  heroTitle: {
    margin: 0,
    fontSize: 28,
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '-0.6px',
  },
  heroSub: { margin: '4px 0 16px', color: COLORS.textSecondary, fontSize: 14 },
  ratingTag: {
    fontSize: 13,
    letterSpacing: 1,
    lineHeight: 1,
  },
  threadBlock: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 6,
    padding: '8px 10px',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${COLORS.border}`,
    borderRadius: 10,
  },
  threadRow: {
    padding: '6px 10px',
    borderRadius: 8,
    borderLeft: '3px solid transparent',
  },
  threadRowAdvisor: {
    background: 'rgba(124,140,255,0.08)',
    borderLeftColor: COLORS.primary,
  },
  threadRowUser: {
    background: 'rgba(244,114,182,0.08)',
    borderLeftColor: '#f472b6',
    marginLeft: 14,
  },
  threadWho: {
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 2,
  },
  threadText: {
    fontSize: 13,
    color: COLORS.text,
    fontStyle: 'italic' as const,
    lineHeight: 1.4,
  },
  userCommentBlock: {
    marginTop: 10,
    padding: '8px 12px',
    background: 'rgba(244,114,182,0.08)',
    border: '1px solid rgba(244,114,182,0.22)',
    borderRadius: 10,
  },
  userCommentLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#f472b6',
    marginBottom: 2,
  },
  userCommentText: {
    fontSize: 13,
    color: COLORS.text,
    fontStyle: 'italic' as const,
    lineHeight: 1.4,
  },
  dateBlock: {
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    padding: '6px 10px',
    margin: '0 0 8px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 3,
  },
  dateLine: {
    display: 'flex',
    gap: 8,
    alignItems: 'baseline',
    flexWrap: 'wrap' as const,
    fontSize: 12,
  },
  dateLabelTxt: {
    color: COLORS.textMuted,
    fontSize: 11,
    minWidth: 90,
  },
  dateValTxt: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
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
  reqThumbs: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(56px, 1fr))',
    gap: 6,
  },
  reqThumbCell: {
    aspectRatio: '1',
    borderRadius: 8,
    overflow: 'hidden',
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
  },
  suggThumbs: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  thumbCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 4,
    maxWidth: 80,
  },
  jumpArrow: {
    position: 'absolute' as const,
    top: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(124,140,255,0.92)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 0,
    zIndex: 3,
    boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
  },
  jumpBackBtn: {
    position: 'fixed' as const,
    right: 18,
    bottom: 'calc(84px + env(safe-area-inset-bottom))',
    zIndex: 200,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '10px 16px',
    borderRadius: 999,
    border: 'none',
    color: '#fff',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    background: COLORS.gradient,
    boxShadow: '0 8px 24px rgba(124,140,255,0.45)',
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