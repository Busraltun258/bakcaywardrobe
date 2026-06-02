import {
  ArrowLeftOutlined,
  BulbOutlined,
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
import { CATEGORIES, ClothingItem, OutfitSuggestion } from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'

/**
 * Kullanıcı istatistikleri:
 * - Dolap büyüklüğü ve kategori dağılımı
 * - Öneri performansı (toplam / beğenilen / değişiklik)
 * - Hiç önerilmemiş parçalar (admin'e ipucu)
 * - En sık önerilen parçalar
 */
const Stats: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [clothes, setClothes] = useState<ClothingItem[]>([])
  const [suggestions, setSuggestions] = useState<OutfitSuggestion[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxItems, setLightboxItems] = useState<ClothingItem[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    if (!user) return
    const q = query(collection(db, 'clothes'), where('ownerId', '==', user.uid))
    return onSnapshot(q, (snap) => {
      setClothes(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as ClothingItem[])
      setLoading(false)
    })
  }, [user])

  useEffect(() => {
    if (!user) return
    const q = query(collection(db, 'outfitSuggestions'), where('requesterUid', '==', user.uid))
    return onSnapshot(q, (snap) => {
      setSuggestions(snap.docs.map((d) => ({ id: d.id, ...d.data() } as OutfitSuggestion)))
    })
  }, [user])

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

    // Beğenilen önerilerde geçen parçalar
    const likedUsage = new Map<string, number>()
    suggestions
      .filter((s) => s.liked === 'yes')
      .forEach((s) => {
        s.clothingItemIds.forEach((id) => {
          likedUsage.set(id, (likedUsage.get(id) ?? 0) + 1)
        })
      })

    const usedIds = new Set(usage.keys())
    // Unutulmuş: dolapta en az 30 gündür olan + hiç öneride görmemiş
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000
    const now = Date.now()
    const allUnused = clothes.filter(
      (c) => !usedIds.has(c.id) && (c.createdAt ?? now) <= now - THIRTY_DAYS,
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

    const mostLoved = clothes
      .map((c) => ({ c, count: likedUsage.get(c.id) ?? 0 }))
      .filter((x) => x.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)

    return {
      total,
      liked,
      favorites,
      disliked,
      waiting,
      avgRating,
      ratingPercent,
      ratedCount,
      mostLoved,
      unused: unusedSorted,
      unusedByCategory,
    }
  }, [suggestions, clothes])

  const categoryStats = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const count = clothes.filter((c) => c.category === cat.key).length
      const pct = clothes.length > 0 ? Math.round((count / clothes.length) * 100) : 0
      return { ...cat, count, pct }
    }).sort((a, b) => b.count - a.count)
  }, [clothes])

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
          onClick={() => navigate('/wardrobe')}
          style={{ color: COLORS.textSecondary, marginBottom: 8 }}
        >
          Geri
        </Button>

        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>
            <PieChartOutlined style={{ color: COLORS.primary, marginRight: 10 }} />
            İstatistikler
          </h1>
          <p style={styles.heroSub}>Dolabını ve stil performansını incele</p>
        </div>

        {/* Performans özet */}
        <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
          <Col xs={12} sm={6}>
            <StatCard icon={<SkinOutlined />} value={clothes.length} title="Parça" color={COLORS.primary} />
          </Col>
          <Col xs={12} sm={6}>
            <StatCard
              icon={<ThunderboltOutlined />}
              value={stats.total}
              title="Toplam öneri"
              color={COLORS.accent}
            />
          </Col>
          <Col xs={12} sm={6}>
            <StatCard
              icon={<HeartFilled />}
              value={stats.favorites}
              title="Favoriler (5⭐)"
              color={COLORS.success}
            />
          </Col>
          <Col xs={12} sm={6}>
            <StatCard
              icon={<CommentOutlined />}
              value={stats.disliked}
              title="Değişiklik"
              color={COLORS.warning}
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

        {/* En çok sevilen parçalar */}
        {stats.mostLoved.length > 0 && (
          <Card
            title={
              <span style={{ fontSize: 15, fontWeight: 600 }}>
                <HeartFilled style={{ color: COLORS.error, marginRight: 8 }} />
                En Çok Beğendiğin Parçalar
              </span>
            }
            style={{ marginBottom: 16 }}
          >
            <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '0 0 12px' }}>
              Beğendiğin önerilerde en sık geçen parçalar
            </p>
            <div style={styles.thumbsRow}>
              {stats.mostLoved.map(({ c, count }) => (
                <div key={c.id} style={styles.thumbCol}>
                  <div style={{ position: 'relative' }}>
                    <SmartImage
                      cacheKey={c.id}
                      src={clothingItemImageSrc(c)}
                      style={{ width: 80, height: 80, borderRadius: 12 }}
                    />
                    <Tag color="success" style={styles.countTag}>
                      ×{count}
                    </Tag>
                  </div>
                  {(c.label || c.description) && (
                    <span style={styles.thumbLabel}>{c.label || c.description}</span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Hiç önerilmemiş parçalar */}
        {stats.unused.length > 0 ? (
          <Card
            title={
              <span style={{ fontSize: 15, fontWeight: 600 }}>
                <WarningOutlined style={{ color: COLORS.warning, marginRight: 8 }} />
                1 Aydır Kullanılmayan ({stats.unused.length})
              </span>
            }
            style={{ marginBottom: 16 }}
          >
            <p style={{ fontSize: 12, color: COLORS.textMuted, margin: '0 0 10px' }}>
              1 aydır dolabında olup hiçbir öneride yer almamış parçalar.
              En uzun bekleyen başta.
            </p>

            {/* Kategori dağılımı */}
            <div style={styles.catChips}>
              {CATEGORIES.filter((cat) => (stats.unusedByCategory[cat.key] ?? 0) > 0).map((cat) => (
                <Tag key={cat.key} style={styles.catChip}>
                  {cat.emoji} {cat.label} · {stats.unusedByCategory[cat.key]}
                </Tag>
              ))}
            </div>

            <div style={styles.unusedGrid}>
              {stats.unused.map((c, idx) => {
                const days = Math.floor(
                  (Date.now() - (c.createdAt ?? Date.now())) / (24 * 60 * 60 * 1000),
                )
                const months = Math.floor(days / 30)
                const ageLabel = months >= 1 ? `${months} ay` : `${days}g`
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setLightboxItems(stats.unused)
                      setLightboxIndex(idx)
                    }}
                    style={styles.unusedCell}
                  >
                    <SmartImage
                      cacheKey={c.id}
                      src={clothingItemImageSrc(c)}
                      style={{ width: '100%', height: '100%' }}
                    />
                    <Tag color="warning" style={styles.daysTag}>
                      {ageLabel}
                    </Tag>
                    {(c.label || c.description) && (
                      <span style={styles.unusedLabel}>{c.label || c.description}</span>
                    )}
                  </button>
                )
              })}
            </div>

            <Button
              type="primary"
              icon={<SendOutlined />}
              block
              style={{ marginTop: 12 }}
              onClick={() => navigate('/kombin')}
            >
              Bu Parçalarla Kombin İste
            </Button>
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
}> = ({ icon, value, title, color }) => (
  <Card style={{ height: '100%' }} bodyStyle={{ padding: 14 }}>
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
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    background: COLORS.bgCard,
  },
  daysTag: {
    position: 'absolute' as const,
    top: 4,
    left: 4,
    fontSize: 10,
    margin: 0,
    padding: '1px 6px',
    zIndex: 1,
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
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
