import {
  ArrowLeftOutlined,
  PlusOutlined,
  SkinOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Card, Empty, Segmented } from 'antd'
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'
import Lightbox from '../../components/Lightbox'
import SmartImage from '../../components/SmartImage'
import { db } from '../../firebase'
import { COLORS } from '../../theme'
import { CATEGORIES, ClothingItem, SEASONS, UserProfile } from '../../types'
import { clothingItemImageSrc } from '../../utils/imageUtils'
import { warmImageCache } from '../../utils/imageCache'
import { sortByCustomOrder, subscribeWardrobeOrders, WardrobeOrders } from '../../utils/wardrobeOrder'

/**
 * Admin'in seçili kullanıcının dolabını görüntülediği sayfa.
 * Kategoriler arası segment ile filtrelenir, görsel açılırsa Lightbox ile büyür.
 * "Bu dolaptan taslak hazırla" CTA'sı ile taslak oluşturma sayfasına yönlendirir.
 */
const AdminUserWardrobe: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [items, setItems] = useState<ClothingItem[]>([])
  const [orders, setOrders] = useState<WardrobeOrders>({})
  const [catFilter, setCatFilter] = useState<string | 'all'>('all')
  const [loading, setLoading] = useState(true)
  const [enlarged, setEnlarged] = useState<ClothingItem | null>(null)

  useEffect(() => {
    if (!userId) return
    ;(async () => {
      const snap = await getDoc(doc(db, 'profiles', userId))
      if (snap.exists()) setProfile({ id: snap.id, ...snap.data() } as UserProfile)
    })()
  }, [userId])

  useEffect(() => {
    if (!userId) return
    const q = query(collection(db, 'clothes'), where('ownerId', '==', userId))
    return onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as ClothingItem[]
      setItems(list)
      setLoading(false)
      warmImageCache(list.map((c) => c.id))
    })
  }, [userId])

  // Kullanıcının Firestore'daki sıralamasını dinle — kamuran sürükledikçe burası da güncellenir
  useEffect(() => {
    if (!userId) return
    return subscribeWardrobeOrders(userId, setOrders)
  }, [userId])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: items.length }
    CATEGORIES.forEach((c) => {
      counts[c.key] = items.filter((w) => w.category === c.key).length
    })
    return counts
  }, [items])

  const filtered = useMemo(() => {
    const base = catFilter === 'all' ? items : items.filter((c) => c.category === catFilter)
    if (catFilter === 'all') {
      // "Tümü" görünümünde her kategori kendi sırasında, kategori sırasıyla
      const result: ClothingItem[] = []
      CATEGORIES.forEach((c) => {
        const inCat = base.filter((x) => x.category === c.key)
        result.push(...sortByCustomOrder(inCat, orders[c.key]))
      })
      // Kategori bulunamayanlar sona
      result.push(...base.filter((x) => !CATEGORIES.find((c) => c.key === x.category)))
      return result
    }
    return sortByCustomOrder(base, orders[catFilter])
  }, [items, catFilter, orders])

  const segOptions = [
    { label: `Tümü (${categoryCounts.all})`, value: 'all' },
    ...CATEGORIES.map((c) => ({
      label: `${c.emoji} ${categoryCounts[c.key] ?? 0}`,
      value: c.key,
    })),
  ]

  const name = profile?.displayName ?? profile?.username ?? 'Kullanıcı'

  return (
    <AppLayout>
      <div className="bk-container">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/admin/kullanicilar')}
          style={{ color: COLORS.textSecondary, marginBottom: 8 }}
        >
          Geri
        </Button>

        <div style={styles.hero}>
          <Avatar size={56} style={{ background: COLORS.gradient, flexShrink: 0 }}>
            {name[0]?.toUpperCase()}
          </Avatar>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={styles.heroTitle}>{name}</h1>
            <p style={styles.heroSub}>
              <SkinOutlined style={{ marginRight: 6 }} />
              {items.length} parça
            </p>
          </div>
        </div>

        <Card style={{ marginBottom: 14 }} bodyStyle={{ padding: 14 }}>
          <Button
            type="primary"
            size="large"
            icon={<ThunderboltOutlined />}
            block
            onClick={() => navigate(`/admin/taslak/yeni/${userId}`)}
          >
            Bu Dolaptan Taslak Kombin Hazırla
          </Button>
        </Card>

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
          <Empty
            description={<span style={{ color: COLORS.textSecondary }}>Bu kategoride parça yok</span>}
            image={<PlusOutlined style={{ fontSize: 32, color: COLORS.textMuted }} />}
          />
        ) : (
          <div className="bk-wardrobe-grid-compact">
            {filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setEnlarged(item)}
                style={styles.cell}
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
              </button>
            ))}
          </div>
        )}
      </div>

      <Lightbox
        open={!!enlarged}
        onClose={() => setEnlarged(null)}
        slides={filtered.map((c) => ({
          src: clothingItemImageSrc(c),
          imageKey: c.id,
          title: c.label,
          description: c.description,
        }))}
        startIndex={Math.max(0, filtered.findIndex((c) => c.id === enlarged?.id))}
      />
    </AppLayout>
  )
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '4px 0 16px',
  },
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
  },
  cell: {
    position: 'relative' as const,
    aspectRatio: '1',
    borderRadius: 12,
    overflow: 'hidden',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    background: COLORS.bgCard,
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
    background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
    color: '#fff',
    fontSize: 10,
    padding: '14px 6px 4px',
    textAlign: 'center' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
    lineHeight: 1.3,
  },
}

export default AdminUserWardrobe
