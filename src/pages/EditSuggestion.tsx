import {
  ArrowLeftOutlined,
  CalendarOutlined,
  CheckOutlined,
  PlusOutlined,
  SaveOutlined,
  WarningFilled,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import {
  Alert,
  App,
  Badge,
  Button,
  Card,
  Col,
  Empty,
  Input,
  Row,
  Segmented,
  Skeleton,
  Tag,
} from 'antd'
import StickySubmitBar from '../components/StickySubmitBar'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Lightbox from '../components/Lightbox'
import SmartImage from '../components/SmartImage'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { COLORS } from '../theme'
import {
  CATEGORIES,
  ClothingItem,
  OutfitMessage,
  OutfitRequest,
  OutfitSuggestion,
  SEASONS,
} from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'
import { appendMessage, buildThread } from '../utils/outfitMessages'
import { getItemSeasons } from '../utils/seasonFilter'
import {
  sortByCustomOrder,
  subscribeWardrobeOrders,
  WardrobeOrders,
} from '../utils/wardrobeOrder'

const EditSuggestion: React.FC = () => {
  const { suggestionId } = useParams<{ suggestionId: string }>()
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const [suggestion, setSuggestion] = useState<OutfitSuggestion | null>(null)
  const [request, setRequest] = useState<OutfitRequest | null>(null)
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [catFilter, setCatFilter] = useState<string | 'all'>('all')
  const [loadErr, setLoadErr] = useState('')
  const [loading, setLoading] = useState(true)
  const [enlarged, setEnlarged] = useState<ClothingItem | null>(null)
  const [ownerHint, setOwnerHint] = useState<string | null>(null)
  const [orders, setOrders] = useState<WardrobeOrders>({})

  // Sahip kullanıcının kategori sıralamasını dinle
  useEffect(() => {
    if (!ownerHint) return
    return subscribeWardrobeOrders(ownerHint, setOrders)
  }, [ownerHint])

  // 1) Öneriyi çek + requesterUid'i hint olarak yakala (dolabı erken yüklemek için)
  useEffect(() => {
    if (!suggestionId || !user) return
    ;(async () => {
      const snap = await getDoc(doc(db, 'outfitSuggestions', suggestionId))
      if (!snap.exists()) {
        setLoadErr('Öneri bulunamadı.')
        return
      }
      const s = { id: snap.id, ...snap.data() } as OutfitSuggestion
      if (!isAdmin && s.advisorUid !== user.uid) {
        setLoadErr('Bu öneriyi düzenleme yetkin yok.')
        return
      }
      setSuggestion(s)
      setSelected(new Set(s.clothingItemIds))
      setNote(s.advisorNote ?? '')
      if (s.requesterUid) setOwnerHint(s.requesterUid)

      const reqSnap = await getDoc(doc(db, 'outfitRequests', s.requestId))
      if (reqSnap.exists()) {
        const r = { id: reqSnap.id, ...reqSnap.data() } as OutfitRequest
        setRequest(r)
        if (!s.requesterUid && r.wardrobeOwnerUid) setOwnerHint(r.wardrobeOwnerUid)
      }
    })()
  }, [suggestionId, user, isAdmin])

  // 2) ownerHint geldiğinde dolabı paralel çek — request'i beklemiyoruz
  useEffect(() => {
    if (!ownerHint) return
    const ownerUid = ownerHint
    const cacheKey = `bk_clothes_all_${ownerUid}`
    try {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        const list = JSON.parse(cached) as ClothingItem[]
        setWardrobe(list)
        setLoading(false)
      }
    } catch {}
    ;(async () => {
      const q = query(collection(db, 'clothes'), where('ownerId', '==', ownerUid))
      const snap = await getDocs(q)
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as ClothingItem[]
      list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
      try {
        localStorage.setItem(cacheKey, JSON.stringify(list))
      } catch {}
      setWardrobe(list)
      setLoading(false)
    })()
  }, [ownerHint])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: wardrobe.length }
    CATEGORIES.forEach((c) => {
      counts[c.key] = wardrobe.filter((w) => w.category === c.key).length
    })
    return counts
  }, [wardrobe])

  const filtered = useMemo(() => {
    const base = catFilter === 'all' ? wardrobe : wardrobe.filter((c) => c.category === catFilter)
    if (catFilter === 'all') {
      const result: ClothingItem[] = []
      CATEGORIES.forEach((c) => {
        const inCat = base.filter((x) => x.category === c.key)
        result.push(...sortByCustomOrder(inCat, orders[c.key]))
      })
      result.push(...base.filter((x) => !CATEGORIES.find((c) => c.key === x.category)))
      return result
    }
    return sortByCustomOrder(base, orders[catFilter])
  }, [wardrobe, catFilter, orders])

  const selectedItems = useMemo(
    () => Array.from(selected).map((id) => wardrobe.find((w) => w.id === id)).filter(Boolean) as ClothingItem[],
    [selected, wardrobe],
  )

  const toggle = (id: string) => {
    setSelected((prev) => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }

  const submit = async () => {
    if (!suggestion || selected.size === 0) {
      message.warning('En az bir parça seç.')
      return
    }
    setSaving(true)
    try {
      const trimmedNote = note.trim()
      // Notu değiştiyse mesaj geçmişine yeni bir stilist mesajı ekle (silmeden).
      const thread = buildThread(suggestion)
      const lastAdvisor = [...thread].reverse().find((m) => m.role === 'advisor')
      const noteChanged = !!trimmedNote && trimmedNote !== lastAdvisor?.text
      const newMessages: OutfitMessage[] | undefined = noteChanged
        ? appendMessage(suggestion, {
            role: 'advisor',
            uid: suggestion.advisorUid,
            text: trimmedNote,
            at: Date.now(),
          })
        : undefined
      await updateDoc(doc(db, 'outfitSuggestions', suggestion.id), {
        clothingItemIds: Array.from(selected),
        advisorNote: trimmedNote,
        liked: null,
        // Kombin değiştiği için eski puan artık geçersiz — sıfırla ki
        // "4 yıldız ama Bekliyor" gibi tutarsızlık olmasın, kullanıcı yeniden puanlasın.
        rating: 0,
        comment: '',
        feedbackAt: null,
        editedAt: Date.now(),
        ...(newMessages ? { messages: newMessages } : {}),
      })
      message.success('Öneri güncellendi! Kullanıcı tekrar değerlendirecek.')
      navigate('/home', { replace: true })
    } catch (e) {
      console.error(e)
      message.error('Kaydedilemedi.')
    } finally {
      setSaving(false)
    }
  }

  if (loadErr) {
    return (
      <AppLayout>
        <div className="bk-container">
          <Alert
            type="error"
            message={loadErr}
            action={
              <Button onClick={() => navigate('/home')} size="small">
                Geri Dön
              </Button>
            }
          />
        </div>
      </AppLayout>
    )
  }

  if (!suggestion) {
    return (
      <AppLayout>
        <div className="bk-container">
          <Skeleton active />
        </div>
      </AppLayout>
    )
  }

  const segOptions = [
    { label: `Tümü (${categoryCounts.all})`, value: 'all' },
    ...CATEGORIES.map((c) => ({
      label: `${c.emoji} ${categoryCounts[c.key] ?? 0}`,
      value: c.key,
    })),
  ]

  const selectedPanel = (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 600 }}>Seçili Parçalar</span>
          <Badge count={selected.size} showZero color={COLORS.primary} />
        </div>
      }
      style={{ marginBottom: 12 }}
      bodyStyle={{ padding: 12 }}
    >
      {request?.weather && (
        <div style={styles.weatherStrip}>
          <span style={{ fontSize: 22 }}>{request.weather.icon}</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>
              {request.weather.temp}°C · {request.weather.description}
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted }}>
              📍 {request.weather.district ? `${request.weather.district}, ` : ''}
              {request.weather.city}
            </div>
          </div>
        </div>
      )}

      {(request?.requestDate || request?.weekStartDate) && (
        <div style={styles.requestMeta}>
          <CalendarOutlined style={{ color: COLORS.primary, marginRight: 6 }} />
          <strong style={{ color: COLORS.text }}>İstek tarihi: </strong>
          {request?.requestType === 'weekly'
            ? `${dayjs(request.weekStartDate).format('DD MMM')} - ${dayjs(request.weekStartDate).add(4, 'day').format('DD MMM YYYY')}`
            : dayjs(request.requestDate).format('DD MMMM YYYY, dddd')}
        </div>
      )}

      {request?.note && (
        <div style={styles.requestNote}>
          <strong style={{ color: COLORS.text }}>Kullanıcı notu:</strong>{' '}
          <em>"{request.note}"</em>
        </div>
      )}

      {suggestion.comment && (
        <Alert
          type="error"
          showIcon
          icon={<WarningFilled />}
          message={<strong>Geri bildirim</strong>}
          description={`"${suggestion.comment}"`}
          style={{ marginBottom: 10 }}
        />
      )}

      {selectedItems.length === 0 ? (
        <Empty
          description={<span style={{ color: COLORS.textMuted, fontSize: 12 }}>Henüz seçili yok</span>}
          imageStyle={{ height: 40 }}
        />
      ) : (
        <div style={styles.selectedRow}>
          {selectedItems.map((c) => (
            <div key={c.id} style={styles.selThumbWrap}>
              <button
                type="button"
                onClick={() => toggle(c.id)}
                style={styles.selThumbBtn}
                title="Tıkla — çıkar"
              >
                <SmartImage
                  cacheKey={c.id}
                  src={clothingItemImageSrc(c)}
                  style={{ width: 56, height: 56, borderRadius: 8 }}
                />
                <span style={styles.selRemove}>×</span>
              </button>
            </div>
          ))}
        </div>
      )}

      <Input.TextArea
        placeholder="Not (isteğe bağlı)…"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        style={{ marginTop: 12 }}
      />
    </Card>
  )

  const wardrobePanel = (
    <>
      <div style={{ marginBottom: 12, overflowX: 'auto' }}>
        <Segmented
          value={catFilter}
          onChange={(v) => setCatFilter(v as string)}
          options={segOptions}
          block
        />
      </div>

      {loading ? (
        <div className="bk-wardrobe-grid-compact">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ aspectRatio: '1', borderRadius: 12 }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Empty description="Bu kategoride parça yok" />
      ) : (
        <div className="bk-wardrobe-grid-compact">
          {filtered.map((item) => {
            const isSelected = selected.has(item.id)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggle(item.id)}
                onContextMenu={(e) => {
                  e.preventDefault()
                  setEnlarged(item)
                }}
                style={{
                  ...styles.cell,
                  ...(isSelected ? styles.cellOn : {}),
                }}
              >
                <SmartImage
                  cacheKey={item.id}
                  src={clothingItemImageSrc(item)}
                  style={{ width: '100%', height: '100%' }}
                />
                {/* Sezon rozeti (read-only) — birden fazla olabilir */}
                {(() => {
                  const seasons = getItemSeasons(item)
                  if (seasons.length === 0) return null
                  return (
                    <span style={styles.seasonBadge}>
                      {seasons
                        .map((sk) => SEASONS.find((s) => s.key === sk)?.emoji)
                        .filter(Boolean)
                        .join('')}
                    </span>
                  )
                })()}
                {item.label && <span style={styles.labelTag}>{item.label}</span>}
                {isSelected && (
                  <div style={styles.check}>
                    <CheckOutlined style={{ fontSize: 14 }} />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      )}
      <p style={{ fontSize: 11, color: COLORS.textMuted, margin: '8px 0 0' }}>
        💡 Sağ tık ile büyütüp detayını görebilirsin
      </p>
    </>
  )

  return (
    <AppLayout>
      <div className="bk-container">
        <div style={{ marginBottom: 8 }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/home')}
            style={{ color: COLORS.textSecondary }}
          >
            Geri
          </Button>
        </div>

        <h1 style={styles.heroTitle}>
          Öneriyi Düzenle {request?.requestType === 'weekly' && <Tag color="purple">5 gün</Tag>}
        </h1>
        <p style={styles.heroSub}>Parçaları değiştirip tekrar gönderebilirsin</p>

        <Row gutter={[14, 14]}>
          <Col xs={24} lg={10}>
            <div style={styles.stickyCol}>{selectedPanel}</div>
          </Col>
          <Col xs={24} lg={14}>
            {wardrobePanel}
          </Col>
        </Row>
      </div>

      <StickySubmitBar>
        <Badge count={selected.size} showZero color={COLORS.primary}>
          <span style={{ color: COLORS.text, fontWeight: 600 }}>Seçili parça</span>
        </Badge>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          size="large"
          onClick={submit}
          loading={saving}
          disabled={selected.size === 0}
        >
          {saving ? 'Güncelleniyor…' : 'Güncelle'}
        </Button>
      </StickySubmitBar>

      <Card style={{ marginTop: 20, background: 'rgba(255,255,255,0.02)' }} bodyStyle={{ padding: 12 }}>
        <Button block type="text" onClick={() => navigate('/home')} style={{ color: COLORS.textMuted }}>
          Vazgeç
        </Button>
      </Card>

      <Lightbox
        open={!!enlarged}
        onClose={() => setEnlarged(null)}
        imageKey={enlarged?.id}
        src={enlarged ? clothingItemImageSrc(enlarged) : ''}
        title={enlarged?.label}
        description={enlarged?.description}
        actions={
          enlarged && (
            <Button
              type={selected.has(enlarged.id) ? 'default' : 'primary'}
              icon={selected.has(enlarged.id) ? <CheckOutlined /> : <PlusOutlined />}
              onClick={() => {
                toggle(enlarged.id)
                setEnlarged(null)
              }}
              size="large"
              block
            >
              {selected.has(enlarged.id) ? 'Seçildi — Çıkar' : 'Kombine Ekle'}
            </Button>
          )
        }
      />
    </AppLayout>
  )
}

const styles: Record<string, React.CSSProperties> = {
  heroTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '-0.4px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  heroSub: { margin: '4px 0 16px', color: COLORS.textSecondary, fontSize: 14 },
  stickyCol: { position: 'sticky' as const, top: 12 },
  weatherStrip: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 10px',
    borderRadius: 10,
    background: 'rgba(124,140,255,0.10)',
    border: `1px solid ${COLORS.border}`,
    marginBottom: 10,
  },
  requestMeta: {
    fontSize: 13,
    color: COLORS.textSecondary,
    padding: '8px 10px',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    marginBottom: 8,
  },
  requestNote: {
    fontSize: 13,
    color: COLORS.textSecondary,
    padding: '8px 10px',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    marginBottom: 10,
    fontStyle: 'italic' as const,
  },
  selectedRow: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  selThumbWrap: { position: 'relative' as const },
  selThumbBtn: {
    position: 'relative' as const,
    padding: 0,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: 8,
    overflow: 'visible',
    lineHeight: 0,
  },
  selRemove: {
    position: 'absolute' as const,
    top: -6,
    right: -6,
    background: COLORS.error,
    color: '#fff',
    width: 18,
    height: 18,
    borderRadius: '50%',
    fontSize: 13,
    lineHeight: '18px',
    textAlign: 'center' as const,
    fontWeight: 700,
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
    gap: 8,
  },
  cell: {
    position: 'relative' as const,
    aspectRatio: '1',
    borderRadius: 12,
    overflow: 'hidden',
    border: '2px solid transparent',
    padding: 0,
    cursor: 'pointer',
    background: COLORS.bgCard,
    transition: 'all 0.15s ease',
  },
  cellOn: {
    borderColor: COLORS.primary,
    boxShadow: `0 0 0 4px rgba(124, 140, 255, 0.18)`,
  },
  seasonBadge: {
    position: 'absolute' as const,
    top: 4,
    left: 4,
    width: 22,
    height: 22,
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    color: '#fff',
    fontSize: 12,
    lineHeight: '22px',
    textAlign: 'center' as const,
    zIndex: 2,
    pointerEvents: 'none' as const,
  },
  labelTag: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(0,0,0,0.75)',
    color: '#fff',
    fontSize: 10,
    padding: '3px 6px',
    textAlign: 'center' as const,
    overflow: 'hidden',
    whiteSpace: 'nowrap' as const,
    textOverflow: 'ellipsis',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  check: {
    position: 'absolute' as const,
    top: 6,
    right: 6,
    background: COLORS.primary,
    color: '#fff',
    width: 26,
    height: 26,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 10px rgba(124,140,255,0.4)',
  },
}

export default EditSuggestion
