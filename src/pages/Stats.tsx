import {
  ArrowLeftOutlined,
  BulbOutlined,
  CheckCircleFilled,
  CommentOutlined,
  HeartFilled,
  PieChartOutlined,
  SendOutlined,
  SkinOutlined,
  ThunderboltOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { Button, Card, Col, Empty, Progress, Row, Skeleton, Statistic, Tag } from 'antd'
import Lightbox from '../components/Lightbox'
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import SmartImage from '../components/SmartImage'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { COLORS } from '../theme'
import { CATEGORIES, ClothingItem, OutfitSuggestion, SEASONS, UserProfile } from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'
import { getCurrentSeasons, getItemSeasons, isOutOfSeason } from '../utils/seasonFilter'

// "Deniz şortu"nu normal şorttan ayır: ayrı bir kategori olmadığı için parça
// adı/açıklamasındaki yüzme anahtar kelimelerine bakıyoruz. Sadece Şort kategorisinde
// aranıyor ki "deniz mavisi tişört" gibi renkler yanlışlıkla elenmesin.
const SWIM_SHORT_RE = /(deniz|mayo|y[uü]zme|havuz|plaj|swim|bikini|board ?short)/i
const isBeachShorts = (c: ClothingItem) =>
  c.category === 'sort' && SWIM_SHORT_RE.test(`${c.label ?? ''} ${c.description ?? ''}`)

/**
 * Kullanıcı istatistikleri:
 * - Dolap büyüklüğü ve kategori dağılımı
 * - Öneri performansı (toplam / beğenilen / değişiklik)
 * - Hiç önerilmemiş parçalar (admin'e ipucu)
 * - En sık önerilen parçalar
 */
const Stats: React.FC = () => {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [clothes, setClothes] = useState<ClothingItem[]>([])
  const [suggestions, setSuggestions] = useState<OutfitSuggestion[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxItems, setLightboxItems] = useState<ClothingItem[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  // "Bu parçalarla kombin iste": seçim modu + seçilen parça id'leri
  const [selecting, setSelecting] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  // İstatistiklerin hangi kullanıcıya ait olduğu:
  //  - Kamuran (admin değil) → kendi verisi
  //  - Büşra (admin) → Kamuran'ın (admin olmayan kullanıcının) verisi
  const [targetUid, setTargetUid] = useState<string | null>(null)
  const [targetName, setTargetName] = useState<string>('')

  useEffect(() => {
    if (!user) return
    if (!isAdmin) {
      setTargetUid(user.uid)
      setTargetName('')
      return
    }
    let cancelled = false
    ;(async () => {
      const snap = await getDocs(collection(db, 'profiles'))
      const profiles = snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserProfile))
      const target =
        profiles.find((p) => p.id !== user.uid && p.isAdmin !== true) ??
        profiles.find((p) => p.id !== user.uid)
      if (cancelled) return
      if (target) {
        setTargetUid(target.id)
        setTargetName(target.displayName ?? target.username ?? '')
      } else {
        setTargetUid(null)
        setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [user, isAdmin])

  useEffect(() => {
    if (!targetUid) return
    const q = query(collection(db, 'clothes'), where('ownerId', '==', targetUid))
    return onSnapshot(q, (snap) => {
      setClothes(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as ClothingItem[])
      setLoading(false)
    })
  }, [targetUid])

  useEffect(() => {
    if (!targetUid) return
    const q = query(collection(db, 'outfitSuggestions'), where('requesterUid', '==', targetUid))
    return onSnapshot(q, (snap) => {
      setSuggestions(snap.docs.map((d) => ({ id: d.id, ...d.data() } as OutfitSuggestion)))
    })
  }, [targetUid])

  const stats = useMemo(() => {
    const total = suggestions.length
    const liked = suggestions.filter((s) => s.liked === 'yes').length
    const favorites = suggestions.filter((s) => s.rating === 5).length
    const disliked = suggestions.filter((s) => s.liked === 'no').length
    const waiting = total - liked - disliked

    // Ortalama yıldız puanı: yıldız verilmiş önerilerin aritmetik ortalaması
    const rated = suggestions.filter(
      (s) => typeof s.rating === 'number' && s.rating > 0,
    )
    const avgRating =
      rated.length > 0
        ? rated.reduce((sum, s) => sum + (s.rating ?? 0), 0) / rated.length
        : 0
    // Progress bar için 0-100 ölçeği
    const ratingPercent = avgRating > 0 ? Math.round((avgRating / 5) * 100) : 0
    const ratedCount = rated.length

    // Parça bazlı kullanım sayıları
    const usage = new Map<string, number>()
    suggestions.forEach((s) => {
      s.clothingItemIds.forEach((id) => {
        usage.set(id, (usage.get(id) ?? 0) + 1)
      })
    })

    const usedIds = new Set(usage.keys())
    // Unutulmuş: dolapta en az 45 gündür olan + hiç öneride görmemiş + ŞU AN SEZONUNDA OLAN.
    // Yaz ayında kışlık parça flag'lenmez (zaten giyemez).
    // Aksesuarlar istatistiğe dahil edilmez.
    const FORTY_FIVE_DAYS = 45 * 24 * 60 * 60 * 1000
    const now = Date.now()
    const currentSeasons = getCurrentSeasons()
    const allUnused = clothes.filter(
      (c) =>
        c.category !== 'aksesuar' &&
        !isBeachShorts(c) &&
        !usedIds.has(c.id) &&
        (c.createdAt ?? now) <= now - FORTY_FIVE_DAYS &&
        !isOutOfSeason(getItemSeasons(c), currentSeasons),
    )
    // En uzun süredir bekleyen başta
    const unusedSorted = [...allUnused].sort(
      (a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0),
    )
    // Kategori bazlı sayım
    const unusedByCategory: Record<string, number> = {}
    allUnused.forEach((c) => {
      unusedByCategory[c.category] = (unusedByCategory[c.category] ?? 0) + 1
    })

    return {
      total,
      liked,
      favorites,
      disliked,
      waiting,
      avgRating,
      ratingPercent,
      ratedCount,
      unused: unusedSorted,
      unusedByCategory,
    }
  }, [suggestions, clothes])

  const categoryStats = useMemo(() => {
    // Aksesuarlar ve deniz şortları istatistiğe katılmaz — yüzdeler de bunlar hariç toplam üzerinden.
    const analytic = clothes.filter((c) => c.category !== 'aksesuar' && !isBeachShorts(c))
    const denom = analytic.length
    return CATEGORIES.filter((cat) => cat.key !== 'aksesuar')
      .map((cat) => {
        const count = analytic.filter((c) => c.category === cat.key).length
        const pct = denom > 0 ? Math.round((count / denom) * 100) : 0
        return { ...cat, count, pct }
      })
      .sort((a, b) => b.count - a.count)
  }, [clothes])

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // Seçilen parçaların id'lerini "Yeni Kombin" ekranına taşı — orada görselleriyle
  // birlikte gösterilip stiliste öyle gönderilecek.
  const requestWithSelected = () => {
    const chosen = stats.unused.filter((c) => selectedIds.has(c.id))
    if (chosen.length === 0) return
    setSelecting(false)
    setSelectedIds(new Set())
    navigate('/kombin?tab=new', { state: { requestItemIds: chosen.map((c) => c.id) } })
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="bk-container">
          <Skeleton active />
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="bk-container">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(isAdmin ? '/home' : '/wardrobe')}
          style={{ color: COLORS.textSecondary, marginBottom: 8 }}
        >
          Geri
        </Button>

        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>
            <PieChartOutlined style={{ color: COLORS.primary, marginRight: 10 }} />
            İstatistikler
          </h1>
          <p style={styles.heroSub}>
            {isAdmin
              ? `${targetName || 'Kullanıcı'} için dolap ve stil performansı`
              : 'Dolabını ve stil performansını incele'}
          </p>
        </div>

        {/* Performans özet */}
        <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
          <Col xs={12} sm={6}>
            <StatCard
              icon={<SkinOutlined />}
              value={clothes.length}
              title="Parça"
              color={COLORS.primary}
              onClick={() => navigate('/wardrobe')}
            />
          </Col>
          <Col xs={12} sm={6}>
            <StatCard
              icon={<ThunderboltOutlined />}
              value={stats.total}
              title="Toplam öneri"
              color={COLORS.accent}
              onClick={() => navigate('/kombin?tab=history')}
            />
          </Col>
          <Col xs={12} sm={6}>
            <StatCard
              icon={<HeartFilled />}
              value={stats.favorites}
              title="Favoriler (5⭐)"
              color={COLORS.success}
              onClick={() => navigate('/favorites')}
            />
          </Col>
          <Col xs={12} sm={6}>
            <StatCard
              icon={<CommentOutlined />}
              value={stats.disliked}
              title="Değişiklik"
              color={COLORS.warning}
              onClick={() => navigate('/kombin?tab=history')}
            />
          </Col>
        </Row>

        {/* Ortalama puan — yıldız verilen önerilerin ortalaması */}
        {stats.ratedCount > 0 && (
          <Card style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <strong style={{ color: COLORS.text }}>
                <HeartFilled style={{ color: COLORS.error, marginRight: 6 }} />
                Ortalama puan
              </strong>
              <span style={{ color: COLORS.textSecondary, fontWeight: 600 }}>
                {stats.avgRating.toFixed(1)} / 5 ⭐
              </span>
            </div>
            <Progress
              percent={stats.ratingPercent}
              showInfo={false}
              strokeColor={{ from: COLORS.primary, to: COLORS.accent }}
              trailColor="rgba(255,255,255,0.06)"
            />
            <p style={{ margin: '8px 0 0', fontSize: 12, color: COLORS.textMuted }}>
              {stats.ratedCount} öneri puanlandı
              {stats.waiting > 0 && ` · ${stats.waiting} öneri henüz değerlendirilmedi`}
            </p>
          </Card>
        )}

        {/* Kategori dağılımı */}
        <Card
          title={
            <span style={{ fontSize: 15, fontWeight: 600 }}>
              <PieChartOutlined style={{ color: COLORS.primary, marginRight: 8 }} />
              Kategori Dağılımı
            </span>
          }
          style={{ marginBottom: 16 }}
        >
          {categoryStats.filter((c) => c.count > 0).length === 0 ? (
            <Empty
              description={
                <span style={{ color: COLORS.textSecondary }}>Henüz dolapta parça yok</span>
              }
            />
          ) : (
            categoryStats
              .filter((c) => c.count > 0)
              .map((c) => (
                <div key={c.key} style={styles.catRow}>
                  <span style={{ fontSize: 20 }}>{c.emoji}</span>
                  <span style={{ flex: 1, color: COLORS.text, fontSize: 13 }}>{c.label}</span>
                  <span style={{ color: COLORS.textMuted, fontSize: 12, minWidth: 50, textAlign: 'right' }}>
                    {c.count} · %{c.pct}
                  </span>
                  <div style={{ flex: 2, marginLeft: 8 }}>
                    <Progress
                      percent={c.pct}
                      showInfo={false}
                      strokeColor={COLORS.primary}
                      trailColor="rgba(255,255,255,0.05)"
                      size="small"
                    />
                  </div>
                </div>
              ))
          )}
        </Card>

        {/* Hiç önerilmemiş parçalar */}
        {stats.unused.length > 0 ? (
          <Card
            title={
              <span style={{ fontSize: 15, fontWeight: 600 }}>
                <WarningOutlined style={{ color: COLORS.warning, marginRight: 8 }} />
                45 Gündür Kullanılmayan ({stats.unused.length})
              </span>
            }
            style={{ marginBottom: 16 }}
          >
            <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '0 0 10px' }}>
              45 gündür dolabında olup hiçbir öneride yer almamış parçalar.
              Şu an{' '}
              <strong style={{ color: COLORS.text }}>
                {getCurrentSeasons()
                  .map((s) => {
                    const meta = SEASONS.find((x) => x.key === s)
                    return meta ? `${meta.emoji} ${meta.label}` : ''
                  })
                  .filter(Boolean)
                  .join(' / ')}
              </strong>{' '}
              sezonu olduğu için sezon dışı parçalar (örn. yazın kışlıklar) listelenmez.
            </p>

            {/* Kategori dağılımı */}
            <div style={styles.catChips}>
              {CATEGORIES.filter((cat) => (stats.unusedByCategory[cat.key] ?? 0) > 0).map((cat) => (
                <Tag key={cat.key} style={styles.catChip}>
                  {cat.emoji} {cat.label} · {stats.unusedByCategory[cat.key]}
                </Tag>
              ))}
            </div>

            {selecting && (
              <p style={{ fontSize: 12, color: COLORS.primary, margin: '0 0 8px' }}>
                Kombin istemek istediğin parçalara dokun, sonra "İste" de.
              </p>
            )}

            <div style={styles.unusedGrid}>
              {stats.unused.map((c, idx) => {
                const isSel = selectedIds.has(c.id)
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      if (selecting) {
                        toggleSelect(c.id)
                      } else {
                        setLightboxItems(stats.unused)
                        setLightboxIndex(idx)
                      }
                    }}
                    style={{
                      ...styles.unusedCell,
                      ...(selecting && isSel ? styles.unusedCellSelected : {}),
                    }}
                  >
                    <SmartImage
                      cacheKey={c.id}
                      src={clothingItemImageSrc(c)}
                      style={{ width: '100%', height: '100%' }}
                    />
                    {selecting && (
                      <span style={styles.selectOverlay}>
                        {isSel && <CheckCircleFilled style={styles.selectCheck} />}
                      </span>
                    )}
                    {(c.label || c.description) && (
                      <span style={styles.unusedLabel}>{c.label || c.description}</span>
                    )}
                  </button>
                )
              })}
            </div>

            {!selecting ? (
              <Button
                type="primary"
                icon={<SendOutlined />}
                block
                style={{ marginTop: 12 }}
                onClick={() => {
                  setSelecting(true)
                  setSelectedIds(new Set())
                }}
              >
                Bu Parçalarla Kombin İste
              </Button>
            ) : (
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <Button
                  block
                  onClick={() => {
                    setSelecting(false)
                    setSelectedIds(new Set())
                  }}
                >
                  Vazgeç
                </Button>
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  block
                  disabled={selectedIds.size === 0}
                  onClick={requestWithSelected}
                >
                  İste{selectedIds.size > 0 ? ` (${selectedIds.size})` : ''}
                </Button>
              </div>
            )}
          </Card>
        ) : clothes.length > 0 ? (
          <Card style={{ marginBottom: 16 }}>
            <Empty
              description={
                <span style={{ color: COLORS.textSecondary }}>
                  Harika! Dolabındaki tüm parçalar en az bir öneride yer almış.
                </span>
              }
            />
          </Card>
        ) : null}

        {/* İpucu */}
        <Card style={{ background: 'rgba(124,140,255,0.06)' }}>
          <p style={{ margin: 0, color: COLORS.textSecondary, fontSize: 13 }}>
            <BulbOutlined style={{ color: COLORS.primary, marginRight: 8 }} />
            <strong style={{ color: COLORS.text }}>İpucu:</strong> Unutulmuş parçalar için
            stilistinden yeni bir kombin talep et — notuna "şu parçaları kullan" diye yaz.
          </p>
        </Card>
      </div>

      <Lightbox
        open={!!lightboxItems}
        onClose={() => setLightboxItems(null)}
        slides={
          lightboxItems?.map((c) => ({
            src: clothingItemImageSrc(c),
            imageKey: c.id,
            title: c.label,
            description: c.description,
          })) ?? []
        }
        startIndex={lightboxIndex}
      />
    </AppLayout>
  )
}

const StatCard: React.FC<{
  icon: React.ReactNode
  value: number
  title: string
  color: string
  onClick?: () => void
}> = ({ icon, value, title, color, onClick }) => (
  <Card
    style={{ height: '100%', cursor: onClick ? 'pointer' : 'default' }}
    bodyStyle={{ padding: 14 }}
    hoverable={!!onClick}
    onClick={onClick}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 11,
          background: `${color}1f`,
          color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 17,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <Statistic
        value={value}
        title={<span style={{ color: COLORS.textSecondary, fontSize: 11 }}>{title}</span>}
        valueStyle={{ fontSize: 20, fontWeight: 700, color: COLORS.text }}
      />
    </div>
  </Card>
)

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
  catRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 0',
    borderBottom: `1px solid ${COLORS.border}`,
  },
  thumbsRow: { display: 'flex', flexWrap: 'wrap', gap: 12 },
  thumbCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 4,
    maxWidth: 90,
  },
  countTag: {
    position: 'absolute' as const,
    top: -6,
    right: -6,
    fontSize: 11,
    margin: 0,
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
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
  catChips: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 6,
    marginBottom: 12,
  },
  catChip: {
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${COLORS.border}`,
    color: COLORS.textSecondary,
    fontSize: 11,
    padding: '2px 8px',
    margin: 0,
  },
  unusedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
    gap: 8,
  },
  unusedCell: {
    position: 'relative' as const,
    aspectRatio: '1',
    borderRadius: 10,
    overflow: 'hidden',
    border: '2px solid transparent',
    padding: 0,
    cursor: 'pointer',
    background: COLORS.bgCard,
  },
  unusedCellSelected: {
    border: `2px solid ${COLORS.primary}`,
    boxShadow: `0 0 0 2px ${COLORS.primary}55`,
  },
  selectOverlay: {
    position: 'absolute' as const,
    inset: 0,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 4,
    background: 'rgba(0,0,0,0.15)',
  },
  selectCheck: {
    color: COLORS.primary,
    fontSize: 20,
    background: '#fff',
    borderRadius: '50%',
  },
  unusedLabel: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
    color: '#fff',
    fontSize: 10,
    padding: '12px 4px 3px',
    textAlign: 'center' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
    lineHeight: 1.3,
  },
}

export default Stats
