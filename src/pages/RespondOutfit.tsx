import {
  ArrowLeftOutlined,
  CalendarOutlined,
  CheckOutlined,
  FolderOpenOutlined,
  PlusOutlined,
  SendOutlined,
} from '@ant-design/icons'
import {
  Alert,
  App,
  Badge,
  Button,
  Card,
  Empty,
  Input,
  Modal,
  Radio,
  Segmented,
  Skeleton,
  Tag,
} from 'antd'
import StickySubmitBar from '../components/StickySubmitBar'
import dayjs from 'dayjs'
import {
  addDoc,
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
  OCCASIONS,
  OutfitDraft,
  OutfitRequest,
  SEASONS,
  Season,
  WEEKDAYS,
} from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'
import { getItemSeasons } from '../utils/seasonFilter'
import {
  sortByCustomOrder,
  subscribeWardrobeOrders,
  WardrobeOrders,
} from '../utils/wardrobeOrder'

const RespondOutfit: React.FC = () => {
  const { requestId } = useParams<{ requestId: string }>()
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const backPath = isAdmin ? '/home' : '/kombin'

  const [req, setReq] = useState<OutfitRequest | null>(null)
  const [loadErr, setLoadErr] = useState('')
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([])
  const [orders, setOrders] = useState<WardrobeOrders>({})
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [catFilter, setCatFilter] = useState<string | 'all'>('all')
  const [seasonFilter, setSeasonFilter] = useState<Season | 'any'>('any')
  const [enlargedItem, setEnlargedItem] = useState<ClothingItem | null>(null)
  const [loading, setLoading] = useState(true)

  // Haftalık talep için: hangi günü dolduruyor
  const isWeekly = req?.requestType === 'weekly'
  const [dayIndex, setDayIndex] = useState<number>(0)

  // Taslak desteği
  const [drafts, setDrafts] = useState<OutfitDraft[]>([])
  const [draftPickerOpen, setDraftPickerOpen] = useState(false)

  useEffect(() => {
    if (!requestId || !user) return
    ;(async () => {
      const snap = await getDoc(doc(db, 'outfitRequests', requestId))
      if (!snap.exists()) {
        setLoadErr('İstek bulunamadı.')
        return
      }
      const data = { id: snap.id, ...snap.data() } as OutfitRequest
      if (!isAdmin && data.toUid !== user.uid) {
        setLoadErr('Bu istek sana ait değil.')
        return
      }
      // Haftalık için status 'pending' olmasa bile gün ekleyebilmek için izin ver
      if (data.requestType !== 'weekly' && data.status !== 'pending') {
        setLoadErr('Bu istek zaten yanıtlanmış.')
        return
      }
      setReq(data)
    })()
  }, [requestId, user, isAdmin])

  // Sahip kullanıcının Firestore sıralamasını dinle
  useEffect(() => {
    if (!req?.wardrobeOwnerUid) return
    return subscribeWardrobeOrders(req.wardrobeOwnerUid, setOrders)
  }, [req?.wardrobeOwnerUid])

  // Dolap
  useEffect(() => {
    if (!req?.wardrobeOwnerUid) return
    const ownerUid = req.wardrobeOwnerUid
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
      try {
        localStorage.setItem(cacheKey, JSON.stringify(list))
      } catch {}
      setWardrobe(list)
      setLoading(false)
    })()
  }, [req?.wardrobeOwnerUid])

  // Bu kullanıcı için hazırlanmış taslakları çek (admin için)
  useEffect(() => {
    if (!req?.wardrobeOwnerUid || !isAdmin) return
    ;(async () => {
      const q = query(
        collection(db, 'outfitDrafts'),
        where('wardrobeOwnerUid', '==', req.wardrobeOwnerUid),
      )
      const snap = await getDocs(q)
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() } as OutfitDraft))
      list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
      setDrafts(list)
    })()
  }, [req?.wardrobeOwnerUid, isAdmin])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: wardrobe.length }
    CATEGORIES.forEach((c) => {
      counts[c.key] = wardrobe.filter((w) => w.category === c.key).length
    })
    return counts
  }, [wardrobe])

  const filtered = useMemo(() => {
    // Önce sezon filtresi: 'any' tümünü gösterir; seçili sezon + 'all' (tüm-sezon) etiketli olanlar geçer
    const bySeason =
      seasonFilter === 'any'
        ? wardrobe
        : wardrobe.filter((c) => {
            const seasons = getItemSeasons(c)
            return seasons.length === 0 || seasons.includes(seasonFilter as Season)
          })
    const base = catFilter === 'all' ? bySeason : bySeason.filter((c) => c.category === catFilter)
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
  }, [wardrobe, catFilter, orders, seasonFilter])

  const toggle = (id: string) => {
    setSelected((prev) => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }

  const loadFromDraft = (d: OutfitDraft) => {
    setSelected(new Set(d.clothingItemIds))
    setNote(d.note ?? '')
    setDraftPickerOpen(false)
    message.success(`"${d.name}" yüklendi`)
  }

  const submit = async () => {
    if (!req || !user || selected.size === 0) {
      message.warning('En az bir parça seç.')
      return
    }
    setSaving(true)
    try {
      const now = Date.now()
      const trimmedNote = note.trim()
      const payload: Record<string, unknown> = {
        requestId: req.id,
        requesterUid: req.fromUid,
        advisorUid: user.uid,
        clothingItemIds: Array.from(selected),
        advisorNote: trimmedNote,
        createdAt: now,
        liked: null,
        comment: '',
        feedbackAt: null,
        // Mesaj geçmişini stilistin ilk notuyla başlat (varsa)
        messages: trimmedNote
          ? [{ role: 'advisor', uid: user.uid, text: trimmedNote, at: now }]
          : [],
      }
      if (isWeekly) payload.dayIndex = dayIndex

      await addDoc(collection(db, 'outfitSuggestions'), payload)

      // Haftalık için her gün eklendikçe status 'answered' yapma, son gün geldikçe
      // user görsün diye yapıyoruz ama tek tek de görür. Mantıklı: ilk öneriyle answered.
      if (!isWeekly || req.status !== 'answered') {
        await updateDoc(doc(db, 'outfitRequests', req.id), { status: 'answered' })
      }
      message.success(isWeekly ? `${WEEKDAYS[dayIndex].label} kaydedildi` : 'Öneri gönderildi!')

      if (isWeekly) {
        // Haftalık: bir sonraki güne geç, seçimi temizle
        setSelected(new Set())
        setNote('')
        if (dayIndex < WEEKDAYS.length - 1) setDayIndex(dayIndex + 1)
        else navigate(backPath, { replace: true })
      } else {
        navigate(backPath, { replace: true })
      }
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
              <Button onClick={() => navigate(backPath)} size="small">
                Geri Dön
              </Button>
            }
          />
        </div>
      </AppLayout>
    )
  }

  if (!req) {
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

  return (
    <AppLayout>
      <div className="bk-container">
        <div style={{ marginBottom: 8 }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(backPath)}
            style={{ color: COLORS.textSecondary }}
          >
            Geri
          </Button>
        </div>

        <h1 style={styles.heroTitle}>
          {isWeekly ? 'Haftalık Kombin Öner' : 'Kombin Öner'}
        </h1>
        <p style={styles.heroSub}>
          {isWeekly
            ? 'Her gün için bir kombin hazırla'
            : 'Dolaptan parça seç ve öneriyi gönder'}
        </p>

        {req.weather && (
          <Card
            style={{
              marginBottom: 14,
              background: 'linear-gradient(135deg, rgba(124,140,255,0.10), rgba(124,140,255,0.04))',
            }}
            bodyStyle={{ padding: 12 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 30 }}>{req.weather.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 16 }}>
                  {req.weather.temp}°C · {req.weather.description}
                </div>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>
                  📍 {req.weather.district ? `${req.weather.district}, ` : ''}
                  {req.weather.city || 'Konum belirtilmemiş'}
                </div>
              </div>
              <Tag color="blue" style={{ margin: 0 }}>
                Talep anı
              </Tag>
            </div>
          </Card>
        )}

        {req.note && (
          <Card style={{ marginBottom: 14 }}>
            <p style={{ margin: 0, color: COLORS.textSecondary, fontStyle: 'italic' }}>
              <strong style={{ color: COLORS.text }}>İstek notu:</strong> "{req.note}"
            </p>
          </Card>
        )}

        {/* Haftalık ise gün seçici */}
        {isWeekly && (
          <Card style={{ marginBottom: 14 }} bodyStyle={{ padding: 14 }}>
            <p style={{ margin: '0 0 10px', color: COLORS.textSecondary, fontSize: 13 }}>
              <CalendarOutlined style={{ marginRight: 6 }} />
              Şu an hazırladığın gün:
            </p>
            <Radio.Group
              value={dayIndex}
              onChange={(e) => setDayIndex(e.target.value)}
              buttonStyle="solid"
              style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}
            >
              {WEEKDAYS.map((d) => (
                <Radio.Button key={d.key} value={d.key}>
                  {d.short}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Card>
        )}

        {/* Taslaktan yükle (sadece admin) */}
        {isAdmin && drafts.length > 0 && (
          <Card style={{ marginBottom: 14 }} bodyStyle={{ padding: 14 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <strong style={{ color: COLORS.text }}>
                  <FolderOpenOutlined style={{ marginRight: 6, color: COLORS.primary }} />
                  Taslaklarım
                </strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: COLORS.textMuted }}>
                  {drafts.length} hazır taslak — birini seç, parçalar otomatik dolsun
                </p>
              </div>
              <Button type="primary" onClick={() => setDraftPickerOpen(true)}>
                Taslak Seç
              </Button>
            </div>
          </Card>
        )}

        {/* Üst şerit — seçili parçaların minik halleri */}
        {selected.size > 0 && (
          <Card
            style={styles.selectedStrip}
            bodyStyle={{ padding: 10 }}
          >
            <div style={styles.selectedRow}>
              <span style={styles.selectedLabel}>
                Seçili ({selected.size}):
              </span>
              <div style={styles.selectedThumbs}>
                {Array.from(selected).map((id) => {
                  const c = wardrobe.find((w) => w.id === id)
                  if (!c) return null
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggle(id)}
                      style={styles.selectedThumbBtn}
                      title="Tıkla — çıkar"
                    >
                      <SmartImage
                        cacheKey={c.id}
                        src={clothingItemImageSrc(c)}
                        style={{ width: 42, height: 42, borderRadius: 6 }}
                      />
                      <span style={styles.selectedRemove}>×</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </Card>
        )}

        {/* Sezon filtresi — hangi mevsim kıyafetleri görmek istiyorsun */}
        <div style={{ marginBottom: 8, overflowX: 'auto' }}>
          <Segmented
            value={seasonFilter}
            onChange={(v) => setSeasonFilter(v as Season | 'any')}
            options={[
              { label: '🗂️ Hepsi', value: 'any' },
              ...SEASONS.map((s) => ({
                label: `${s.emoji} ${s.label}`,
                value: s.key,
              })),
            ]}
            block
          />
        </div>

        <div style={{ marginBottom: 14, overflowX: 'auto' }}>
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
                  onClick={() => setEnlargedItem(item)}
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
                  {/* Sezon rozeti (read-only) — birden fazla sezon olabilir */}
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
                  {(item.label || item.description) && (
                    <span style={styles.labelTag}>{item.label || item.description}</span>
                  )}
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

        <Input.TextArea
          placeholder="Kombin için kısa not (isteğe bağlı)…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          style={{ marginTop: 18 }}
        />

      </div>

      <StickySubmitBar>
        <Badge count={selected.size} showZero color={COLORS.primary}>
          <span style={{ color: COLORS.text, fontWeight: 600 }}>
            {isWeekly ? WEEKDAYS[dayIndex].label : 'Seçili'}
          </span>
        </Badge>
        <Button
          type="primary"
          icon={<SendOutlined />}
          size="large"
          onClick={submit}
          loading={saving}
          disabled={selected.size === 0}
        >
          {saving
            ? 'Gönderiliyor…'
            : isWeekly
            ? dayIndex === WEEKDAYS.length - 1
              ? 'Son Günü Gönder'
              : `${WEEKDAYS[dayIndex].label}'yi Kaydet`
            : 'Öneriyi Gönder'}
        </Button>
      </StickySubmitBar>

      <Lightbox
        open={!!enlargedItem}
        onClose={() => setEnlargedItem(null)}
        imageKey={enlargedItem?.id}
        src={enlargedItem ? clothingItemImageSrc(enlargedItem) : ''}
        title={enlargedItem?.label}
        description={enlargedItem?.description}
        actions={
          enlargedItem && (
            <Button
              type={selected.has(enlargedItem.id) ? 'default' : 'primary'}
              icon={selected.has(enlargedItem.id) ? <CheckOutlined /> : <PlusOutlined />}
              onClick={() => {
                toggle(enlargedItem.id)
                setEnlargedItem(null)
              }}
              size="large"
              block
            >
              {selected.has(enlargedItem.id) ? 'Seçildi — Çıkar' : 'Kombine Ekle'}
            </Button>
          )
        }
      />

      {/* Taslak seçici modal */}
      <Modal
        open={draftPickerOpen}
        title="Taslaktan Yükle"
        footer={null}
        onCancel={() => setDraftPickerOpen(false)}
        centered
        width={520}
      >
        <p style={{ color: COLORS.textSecondary, fontSize: 13, marginTop: 0 }}>
          Bir taslağı seçince parçalar ve not otomatik doldurulur, sonra
          istersen düzenleyip gönderebilirsin.
        </p>
        {drafts.map((d) => {
          const occ = OCCASIONS.find((o) => o.key === d.occasion)
          return (
            <Card
              key={d.id}
              style={{ marginBottom: 10, cursor: 'pointer' }}
              hoverable
              bodyStyle={{ padding: 14 }}
              onClick={() => loadFromDraft(d)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <strong style={{ color: COLORS.text }}>{d.name}</strong>
                  <p style={{ margin: '2px 0 4px', fontSize: 12, color: COLORS.textMuted }}>
                    {d.clothingItemIds.length} parça · {dayjs(d.createdAt).format('DD MMM')}
                  </p>
                  {occ && (
                    <Tag color="purple" style={{ marginTop: 4 }}>
                      {occ.emoji} {occ.label}
                    </Tag>
                  )}
                </div>
                <Button type="primary">Kullan</Button>
              </div>
            </Card>
          )
        })}
      </Modal>
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
  },
  heroSub: { margin: '4px 0 16px', color: COLORS.textSecondary, fontSize: 14 },
  selectedStrip: {
    position: 'sticky' as const,
    top: 10,
    zIndex: 5,
    marginBottom: 12,
    background: 'rgba(124,140,255,0.10)',
    border: `1px solid rgba(124,140,255,0.30)`,
  },
  selectedRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap' as const,
  },
  selectedLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: COLORS.text,
    whiteSpace: 'nowrap' as const,
  },
  selectedThumbs: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 6,
    flex: 1,
  },
  selectedThumbBtn: {
    position: 'relative' as const,
    padding: 0,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: 6,
    lineHeight: 0,
  },
  selectedRemove: {
    position: 'absolute' as const,
    top: -5,
    right: -5,
    background: COLORS.error,
    color: '#fff',
    width: 16,
    height: 16,
    borderRadius: '50%',
    fontSize: 11,
    lineHeight: '16px',
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

export default RespondOutfit
