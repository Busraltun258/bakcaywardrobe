import {
  ArrowLeftOutlined,
  CheckOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons'
import {
  Alert,
  App,
  Avatar,
  Badge,
  Button,
  Card,
  Empty,
  Input,
  Segmented,
  Select,
  Skeleton,
} from 'antd'
import StickySubmitBar from '../../components/StickySubmitBar'
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
import AppLayout from '../../components/AppLayout'
import Lightbox from '../../components/Lightbox'
import SmartImage from '../../components/SmartImage'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../firebase'
import { COLORS } from '../../theme'
import {
  CATEGORIES,
  ClothingItem,
  OCCASIONS,
  OutfitDraft,
  SEASONS,
  Season,
  UserProfile,
} from '../../types'
import { clothingItemImageSrc } from '../../utils/imageUtils'
import {
  sortByCustomOrder,
  subscribeWardrobeOrders,
  WardrobeOrders,
} from '../../utils/wardrobeOrder'

/**
 * Taslak kombin oluşturma / düzenleme.
 *  - mode === 'new': URL'de userId var → o kullanıcının dolabından yeni taslak
 *  - mode === 'edit': URL'de draftId var → mevcut taslağı düzenle
 */
const EditDraft: React.FC = () => {
  const { userId, draftId } = useParams<{ userId?: string; draftId?: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { message } = App.useApp()
  const mode = draftId ? 'edit' : 'new'

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([])
  const [orders, setOrders] = useState<WardrobeOrders>({})
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [name, setName] = useState('')
  const [occasion, setOccasion] = useState<string>('casual')
  const [note, setNote] = useState('')
  const [catFilter, setCatFilter] = useState<string | 'all'>('all')
  const [seasonFilter, setSeasonFilter] = useState<Season | 'any'>('any')
  const [enlarged, setEnlarged] = useState<ClothingItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [ownerUid, setOwnerUid] = useState<string | null>(null)
  const [loadErr, setLoadErr] = useState('')

  // Edit modunda mevcut taslağı yükle, new modunda kullanıcı id'sini al
  useEffect(() => {
    if (mode === 'edit' && draftId) {
      ;(async () => {
        const snap = await getDoc(doc(db, 'outfitDrafts', draftId))
        if (!snap.exists()) {
          setLoadErr('Taslak bulunamadı.')
          return
        }
        const d = { id: snap.id, ...snap.data() } as OutfitDraft
        if (d.advisorUid !== user?.uid) {
          setLoadErr('Bu taslağı düzenleme yetkin yok.')
          return
        }
        setOwnerUid(d.wardrobeOwnerUid)
        setName(d.name)
        setOccasion(d.occasion ?? 'casual')
        setNote(d.note ?? '')
        setSelected(new Set(d.clothingItemIds))
      })()
    } else if (mode === 'new' && userId) {
      setOwnerUid(userId)
    }
  }, [mode, draftId, userId, user])

  // Sahip profili
  useEffect(() => {
    if (!ownerUid) return
    ;(async () => {
      const snap = await getDoc(doc(db, 'profiles', ownerUid))
      if (snap.exists()) setProfile({ id: snap.id, ...snap.data() } as UserProfile)
    })()
  }, [ownerUid])

  // Dolap
  useEffect(() => {
    if (!ownerUid) return
    ;(async () => {
      const q = query(collection(db, 'clothes'), where('ownerId', '==', ownerUid))
      const snap = await getDocs(q)
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as ClothingItem[]
      setWardrobe(list)
      setLoading(false)
    })()
  }, [ownerUid])

  // Sahip kullanıcının sıralamasını canlı dinle
  useEffect(() => {
    if (!ownerUid) return
    return subscribeWardrobeOrders(ownerUid, setOrders)
  }, [ownerUid])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: wardrobe.length }
    CATEGORIES.forEach((c) => {
      counts[c.key] = wardrobe.filter((w) => w.category === c.key).length
    })
    return counts
  }, [wardrobe])

  const filtered = useMemo(() => {
    const bySeason =
      seasonFilter === 'any'
        ? wardrobe
        : wardrobe.filter(
            (c) => !c.season || c.season === seasonFilter || c.season === 'all',
          )
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

  const submit = async () => {
    if (!user || !ownerUid) return
    if (selected.size === 0) {
      message.warning('En az bir parça seç.')
      return
    }
    const finalName = name.trim() || `Taslak ${new Date().toLocaleDateString('tr-TR')}`
    setSaving(true)
    try {
      if (mode === 'edit' && draftId) {
        await updateDoc(doc(db, 'outfitDrafts', draftId), {
          name: finalName,
          occasion,
          note: note.trim(),
          clothingItemIds: Array.from(selected),
          updatedAt: Date.now(),
        })
        message.success('Taslak güncellendi')
      } else {
        await addDoc(collection(db, 'outfitDrafts'), {
          advisorUid: user.uid,
          wardrobeOwnerUid: ownerUid,
          name: finalName,
          occasion,
          note: note.trim(),
          clothingItemIds: Array.from(selected),
          createdAt: Date.now(),
        })
        message.success('Taslak kaydedildi')
      }
      navigate('/admin/taslaklar', { replace: true })
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
              <Button onClick={() => navigate('/admin/taslaklar')} size="small">
                Geri
              </Button>
            }
          />
        </div>
      </AppLayout>
    )
  }

  if (!ownerUid) {
    return (
      <AppLayout>
        <div className="bk-container">
          <Skeleton active />
        </div>
      </AppLayout>
    )
  }

  const ownerName = profile?.displayName ?? profile?.username ?? 'Kullanıcı'
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
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          style={{ color: COLORS.textSecondary, marginBottom: 8 }}
        >
          Geri
        </Button>

        <h1 style={styles.heroTitle}>
          {mode === 'edit' ? 'Taslağı Düzenle' : 'Yeni Taslak Kombin'}
        </h1>
        <p style={styles.heroSub}>
          <Avatar size={20} style={{ background: COLORS.gradient, marginRight: 8 }}>
            {ownerName[0]?.toUpperCase()}
          </Avatar>
          <strong style={{ color: COLORS.text }}>{ownerName}</strong>'in dolabından
        </p>

        <Card style={{ marginTop: 16, marginBottom: 16 }}>
          <Input
            placeholder="Taslak adı (örn: Davet kombini)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="large"
            style={{ marginBottom: 12 }}
          />
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
            <span style={{ color: COLORS.textSecondary, fontSize: 13, minWidth: 80 }}>Durum:</span>
            <Select
              value={occasion}
              onChange={(v) => setOccasion(v)}
              style={{ flex: 1, minWidth: 180 }}
              options={OCCASIONS.map((o) => ({
                value: o.key,
                label: (
                  <span>
                    {o.emoji} {o.label}
                  </span>
                ),
              }))}
            />
          </div>
          <Input.TextArea
            placeholder="Not (isteğe bağlı) — kullanıcıya gönderirken bu not görünür"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
          />
        </Card>

        {/* Seçili parçaların minik halleri — taslak hazırlanırken üstte */}
        {selected.size > 0 && (
          <Card style={styles.selectedStrip} bodyStyle={{ padding: 10 }}>
            <div style={styles.selectedRow}>
              <span style={styles.selectedLabel}>Seçili ({selected.size}):</span>
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

        {/* Sezon filtresi */}
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
          <Empty description={<span style={{ color: COLORS.textSecondary }}>Bu kategoride parça yok</span>} />
        ) : (
          <div className="bk-wardrobe-grid-compact">
            {filtered.map((item) => {
              const isSelected = selected.has(item.id)
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setEnlarged(item)}
                  style={{ ...styles.cell, ...(isSelected ? styles.cellOn : {}) }}
                >
                  <SmartImage
                    cacheKey={item.id}
                    src={clothingItemImageSrc(item)}
                    style={{ width: '100%', height: '100%' }}
                  />
                  {/* Sezon rozeti (read-only) */}
                  {item.season && item.season !== 'all' && (
                    <span style={styles.seasonBadge}>
                      {SEASONS.find((s) => s.key === item.season)?.emoji}
                    </span>
                  )}
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

      </div>

      <StickySubmitBar>
        <Badge count={selected.size} showZero color={COLORS.primary}>
          <span style={{ color: COLORS.text, fontWeight: 600 }}>Parça</span>
        </Badge>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          size="large"
          onClick={submit}
          loading={saving}
          disabled={selected.size === 0}
        >
          {saving ? 'Kaydediliyor…' : mode === 'edit' ? 'Güncelle' : 'Taslağı Kaydet'}
        </Button>
      </StickySubmitBar>

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
              {selected.has(enlarged.id) ? 'Seçildi — Çıkar' : 'Taslağa Ekle'}
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
  },
  heroSub: {
    margin: '4px 0 0',
    color: COLORS.textSecondary,
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
  },
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

export default EditDraft
