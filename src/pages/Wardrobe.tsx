import { RightOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import {
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { COLORS } from '../theme'
import { CATEGORIES, SEASONS, Season } from '../types'
import {
  getItemSeasons,
  getStoredSeasonFilter,
  matchesSeasonFilter,
  setStoredSeasonFilter,
} from '../utils/seasonFilter'

interface ItemMeta {
  category: string
  season?: Season
  seasons?: Season[]
}

const Wardrobe: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  // Hafif meta listesi: sadece category + season; base64 görsel taşımıyoruz.
  const [items, setItems] = useState<ItemMeta[]>([])
  const [seasonFilter, setSeasonFilter] = useState<Set<Season>>(() =>
    getStoredSeasonFilter(),
  )

  // localStorage cache (hızlı boot için)
  useEffect(() => {
    if (!user) return
    try {
      const cached = localStorage.getItem(`bk_wardrobe_meta_${user.uid}`)
      if (cached) setItems(JSON.parse(cached))
    } catch {}
  }, [user])

  // Canlı listener — sadece category + season alanlarını sakla
  useEffect(() => {
    if (!user) return
    const q = query(collection(db, 'clothes'), where('ownerId', '==', user.uid))
    return onSnapshot(q, (snap) => {
      const list: ItemMeta[] = snap.docs.map((d) => ({
        category: (d.get('category') as string) ?? '',
        season: d.get('season') as Season | undefined,
        seasons: d.get('seasons') as Season[] | undefined,
      }))
      setItems(list)
      try {
        localStorage.setItem(`bk_wardrobe_meta_${user.uid}`, JSON.stringify(list))
      } catch {}
    })
  }, [user])

  // Filtreyi her değişiklikte localStorage'a yaz — login/logout'ta korunur
  useEffect(() => {
    setStoredSeasonFilter(seasonFilter)
  }, [seasonFilter])

  // Filtreli sayımlar
  const counts = useMemo(() => {
    const out: Record<string, number> = {}
    items.forEach((it) => {
      if (!matchesSeasonFilter(getItemSeasons(it), seasonFilter)) return
      out[it.category] = (out[it.category] ?? 0) + 1
    })
    return out
  }, [items, seasonFilter])

  const totalCount = useMemo(
    () => Object.values(counts).reduce((a, b) => a + b, 0),
    [counts],
  )

  const toggleSeason = (s: Season) => {
    setSeasonFilter((prev) => {
      const next = new Set(prev)
      if (next.has(s)) next.delete(s)
      else next.add(s)
      return next
    })
  }


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
            <span style={styles.statValue}>{totalCount}</span>
            <span style={styles.heroStatSuffix}>parça</span>
          </div>
        </section>

        {/* Sezon filtresi — birden fazla seçilebilir, login/logout'ta korunur */}
        <div style={styles.seasonRow}>
          {SEASONS.map((s) => (
            <Tag.CheckableTag
              key={s.key}
              checked={seasonFilter.has(s.key)}
              onChange={() => toggleSeason(s.key)}
              style={styles.seasonTag}
            >
              {s.emoji} {s.label}
            </Tag.CheckableTag>
          ))}
          {seasonFilter.size > 0 && (
            <button
              type="button"
              onClick={() => setSeasonFilter(new Set())}
              style={styles.seasonClear}
            >
              Temizle
            </button>
          )}
        </div>

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
  seasonRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 6,
    alignItems: 'center',
    padding: '0 0 14px',
  },
  seasonLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginRight: 4,
  },
  seasonTag: {
    fontSize: 12,
    padding: '4px 10px',
    borderRadius: 999,
    cursor: 'pointer',
  },
  seasonClear: {
    background: 'transparent',
    border: 'none',
    color: COLORS.textMuted,
    fontSize: 11,
    textDecoration: 'underline',
    cursor: 'pointer',
    padding: '4px 6px',
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
