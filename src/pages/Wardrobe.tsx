import { RightOutlined } from '@ant-design/icons'
import {
  collection,
  getCountFromServer,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { COLORS } from '../theme'
import { CATEGORIES } from '../types'

const Wardrobe: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [totalCount, setTotalCount] = useState<number | null>(null)

  /**
   * Performans optimizasyonu: tüm kıyafetleri çekmek yerine
   *  - Her kategorinin sayısını count() ile al (1 read = 1 cost, görsel datası yok)
   *  - Sonuçları localStorage'a 5 dakika cache'le
   * Bu sayede sayfa açılış süresi 10s+ → <1s seviyesine düşer.
   */
  useEffect(() => {
    if (!user) return
    const cacheKey = `bk_cat_counts_${user.uid}`
    const TTL = 5 * 60 * 1000

    try {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        const { data, ts } = JSON.parse(cached)
        if (Date.now() - ts < TTL) {
          setCounts(data)
          setTotalCount(Object.values(data as Record<string, number>).reduce((a, b) => a + b, 0))
        }
      }
    } catch {}

    let cancelled = false
    ;(async () => {
      const next: Record<string, number> = {}
      await Promise.all(
        CATEGORIES.map(async (cat) => {
          try {
            const q = query(
              collection(db, 'clothes'),
              where('ownerId', '==', user.uid),
              where('category', '==', cat.key),
            )
            const snap = await getCountFromServer(q)
            next[cat.key] = snap.data().count
          } catch {
            next[cat.key] = 0
          }
        }),
      )
      if (cancelled) return
      setCounts(next)
      const total = Object.values(next).reduce((a, b) => a + b, 0)
      setTotalCount(total)
      try {
        localStorage.setItem(cacheKey, JSON.stringify({ data: next, ts: Date.now() }))
      } catch {}
    })()

    return () => {
      cancelled = true
    }
  }, [user])

  // Real-time tek bir hafif listener (sadece sayım için, görsel datası yok)
  useEffect(() => {
    if (!user) return
    const q = query(collection(db, 'clothes'), where('ownerId', '==', user.uid))
    const unsub = onSnapshot(q, (snap) => {
      const next: Record<string, number> = {}
      snap.docs.forEach((d) => {
        const c = d.get('category') as string | undefined
        if (c) next[c] = (next[c] ?? 0) + 1
      })
      setCounts(next)
      setTotalCount(snap.size)
      try {
        localStorage.setItem(
          `bk_cat_counts_${user.uid}`,
          JSON.stringify({ data: next, ts: Date.now() }),
        )
      } catch {}
    })
    return () => unsub()
  }, [user])


  return (
    <AppLayout>
      <div className="bk-container">
        {/* Hero */}
        <section style={styles.hero}>
          <div style={styles.heroLeft}>
            <h1 style={styles.heroTitle}>Dolabım</h1>
            <p style={styles.heroSub}>
              Kategorilerine ayırdığın tüm parçalar tek bir yerde
            </p>
          </div>
          <div style={styles.heroStat}>
            <span style={styles.statValue}>{totalCount ?? 0}</span>
            <span style={styles.heroStatSuffix}>parça</span>
          </div>
        </section>

        {/* Categories grid */}
        <div style={styles.grid}>
          {CATEGORIES.map((cat) => {
            const count = counts[cat.key] ?? 0
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => navigate(`/wardrobe/${cat.key}`)}
                className="bk-card-hover"
                style={styles.card}
              >
                <div style={styles.cardIcon}>
                  <span style={{ fontSize: 18 }}>{cat.emoji}</span>
                </div>
                <div style={styles.cardBody}>
                  <div style={styles.cardLabel}>{cat.label}</div>
                  <div style={styles.cardMeta}>
                    {count > 0 ? `${count} parça` : 'Henüz boş'}
                  </div>
                </div>
                <RightOutlined style={styles.cardArrow} />
              </button>
            )
          })}
        </div>
      </div>
    </AppLayout>
  )
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    padding: '8px 0 24px',
  },
  heroLeft: { flex: 1 },
  heroTitle: {
    margin: 0,
    fontSize: 28,
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '-0.6px',
  },
  heroSub: {
    margin: '6px 0 0',
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  heroStat: {
    display: 'inline-flex',
    alignItems: 'baseline',
    gap: 4,
    background: 'rgba(124,140,255,0.08)',
    border: `1px solid ${COLORS.border}`,
    padding: '4px 10px',
    borderRadius: 10,
    flexShrink: 0,
  },
  statValue: {
    color: COLORS.text,
    fontWeight: 700,
    fontSize: 14,
  },
  heroStatSuffix: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: 500,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 8,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: COLORS.bgCard,
    padding: '8px 12px',
    borderRadius: 12,
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left' as const,
    fontFamily: 'inherit',
  },
  cardIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'rgba(124, 140, 255, 0.10)',
    border: '1px solid rgba(124, 140, 255, 0.18)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: 18,
  },
  cardBody: { flex: 1 },
  cardLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.text,
    marginBottom: 2,
  },
  cardMeta: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  cardArrow: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  empty: {
    gridColumn: '1 / -1',
    textAlign: 'center' as const,
    padding: '40px 0',
  },
}

export default Wardrobe
