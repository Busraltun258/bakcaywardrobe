import {
  CrownFilled,
  RightOutlined,
  SearchOutlined,
  SkinOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Avatar, Card, Empty, Input, Skeleton, Tag } from 'antd'
import {
  collection,
  getCountFromServer,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../firebase'
import { COLORS } from '../../theme'
import { UserProfile } from '../../types'

/**
 * Admin için kullanıcılar listesi.
 * Her satır kullanıcının dolap büyüklüğünü ve hızlıca eylem butonlarını gösterir.
 */
const AdminUsers: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [profiles, setProfiles] = useState<UserProfile[]>([])
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!user) return
    return onSnapshot(collection(db, 'profiles'), (snap) => {
      setProfiles(snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserProfile)))
      setLoading(false)
    })
  }, [user])

  // Her kullanıcının kıyafet sayısını al (count() — görsel datası inmez)
  useEffect(() => {
    if (!profiles.length) return
    let cancelled = false
    ;(async () => {
      const entries: Record<string, number> = {}
      await Promise.all(
        profiles
          .filter((p) => !p.isAdmin)
          .map(async (p) => {
            try {
              const q = query(collection(db, 'clothes'), where('ownerId', '==', p.id))
              const snap = await getCountFromServer(q)
              entries[p.id] = snap.data().count
            } catch {
              entries[p.id] = 0
            }
          }),
      )
      if (!cancelled) setCounts(entries)
    })()
    return () => {
      cancelled = true
    }
  }, [profiles.map((p) => p.id).join('|')])

  const regularUsers = useMemo(() => {
    const list = profiles.filter((p) => !p.isAdmin)
    const s = search.trim().toLowerCase()
    if (!s) return list
    return list.filter(
      (p) =>
        p.displayName?.toLowerCase().includes(s) ||
        p.username?.toLowerCase().includes(s) ||
        p.email?.toLowerCase().includes(s),
    )
  }, [profiles, search])

  return (
    <AppLayout>
      <div className="bk-container-wide">
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>
            <TeamOutlined style={{ color: COLORS.primary, marginRight: 10 }} />
            Kullanıcılar
          </h1>
          <p style={styles.heroSub}>
            Kullanıcı dolaplarını gör, taslak kombin hazırla
          </p>
        </div>

        <Input
          size="large"
          placeholder="İsim veya e-posta ara…"
          prefix={<SearchOutlined style={{ color: COLORS.textMuted }} />}
          allowClear
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 16 }}
        />

        {loading ? (
          <Card>
            <Skeleton active avatar paragraph={{ rows: 2 }} />
          </Card>
        ) : regularUsers.length === 0 ? (
          <Card>
            <Empty description={<span style={{ color: COLORS.textSecondary }}>Kullanıcı bulunamadı</span>} />
          </Card>
        ) : (
          <div style={styles.grid}>
            {regularUsers.map((p) => {
              const count = counts[p.id] ?? 0
              const name = p.displayName ?? p.username ?? p.email?.split('@')[0] ?? 'Kullanıcı'
              return (
                <Card
                  key={p.id}
                  hoverable
                  bodyStyle={{ padding: 18 }}
                  onClick={() => navigate(`/admin/kullanici/${p.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={styles.row}>
                    <Avatar size={52} style={{ background: COLORS.gradient, flexShrink: 0 }}>
                      {name[0]?.toUpperCase()}
                    </Avatar>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={styles.name}>
                        {name}
                        {p.isAdmin && (
                          <Tag color="gold" icon={<CrownFilled />} style={{ marginLeft: 8 }}>
                            Admin
                          </Tag>
                        )}
                      </div>
                      <div style={styles.email}>{p.email}</div>
                      <div style={styles.meta}>
                        <SkinOutlined style={{ marginRight: 4 }} />
                        <span>{count} parça</span>
                      </div>
                    </div>
                    <RightOutlined style={{ color: COLORS.textMuted }} />
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </AppLayout>
  )
}

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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: 12,
  },
  row: { display: 'flex', alignItems: 'center', gap: 14 },
  name: {
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.text,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: 4,
  },
  email: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  meta: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
}

export default AdminUsers
