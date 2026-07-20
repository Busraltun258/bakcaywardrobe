import {
  AppstoreOutlined,
  BarChartOutlined,
  CalendarOutlined,
  DashboardOutlined,
  FolderOpenOutlined,
  HeartFilled,
  LogoutOutlined,
  SkinOutlined,
  TeamOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { Badge, Button, Tooltip } from 'antd'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { COLORS } from '../theme'
import EnableNotifications from './EnableNotifications'
import ForegroundNotif from './ForegroundNotif'
import KamuranGreeting from './KamuranGreeting'

interface Props {
  children: React.ReactNode
}

const AppLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout, isAdmin } = useAuth()
  const [badge, setBadge] = useState(0)

  useEffect(() => {
    if (!user) return
    if (isAdmin) {
      const q = query(collection(db, 'outfitRequests'), where('status', '==', 'pending'))
      return onSnapshot(q, (snap) => setBadge(snap.size))
    } else {
      const q = query(
        collection(db, 'outfitSuggestions'),
        where('requesterUid', '==', user.uid),
        where('liked', '==', null),
      )
      return onSnapshot(q, (snap) => setBadge(snap.size))
    }
  }, [user, isAdmin])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (e) {
      console.error('Logout hatası:', e)
    } finally {
      navigate('/login', { replace: true })
    }
  }

  const navItems = isAdmin
    ? [
        { key: '/home', label: 'Panel', icon: <DashboardOutlined />, badge },
        { key: '/admin/kullanicilar', label: 'Kullanıcılar', icon: <TeamOutlined /> },
        { key: '/admin/taslaklar', label: 'Taslaklar', icon: <FolderOpenOutlined /> },
        { key: '/stats', label: 'İstatistik', icon: <BarChartOutlined /> },
      ]
    : [
        { key: '/wardrobe', label: 'Dolabım', icon: <SkinOutlined /> },
        { key: '/kombin', label: 'Kombin', icon: <ThunderboltOutlined />, badge },
        { key: '/favorites', label: 'Favoriler', icon: <HeartFilled /> },
        { key: '/outfit-diary', label: 'Günlük', icon: <CalendarOutlined /> },
        { key: '/stats', label: 'İstatistik', icon: <BarChartOutlined /> },


      ]

  const isActive = (key: string) => {
    if (key === '/wardrobe') return location.pathname.startsWith('/wardrobe')
    if (key === '/kombin') return location.pathname.startsWith('/kombin')
    if (key === '/admin/kullanicilar') return location.pathname.startsWith('/admin/kullanic')
    if (key === '/admin/taslaklar') return location.pathname.startsWith('/admin/taslak')
    return location.pathname === key
  }

  return (
    <div className="bk-page">
      <ForegroundNotif />
      <header style={styles.topBar}>
        <div style={styles.topBarInner}>
          <div
            style={styles.brand}
            onClick={() => navigate(isAdmin ? '/home' : '/wardrobe')}
          >
            <div style={styles.brandIcon}>
              <AppstoreOutlined />
            </div>
            <div>
              <div style={styles.brandTitle}>Bakçay</div>
              <div style={styles.brandSub}>{isAdmin ? 'Stilist Paneli' : 'Dijital Dolap'}</div>
            </div>
          </div>

          <nav style={styles.desktopNav} className="bk-desktop-nav">
            {navItems.map((item) => {
              const active = isActive(item.key)
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => navigate(item.key)}
                  style={{
                    ...styles.navBtn,
                    ...(active ? styles.navBtnActive : {}),
                  }}
                >
                  <Badge count={item.badge ?? 0} size="small" offset={[6, -2]}>
                    <span style={styles.navIcon}>{item.icon}</span>
                  </Badge>
                  <span>{item.label}</span>
                </button>
              )
            })}
            <Tooltip title="Çıkış">
              <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                style={{ color: COLORS.textSecondary }}
              />
            </Tooltip>
          </nav>
        </div>
      </header>

      <div style={{ padding: '0 16px' }}>
        <EnableNotifications />
      </div>

      <main className="fade-in">{children}</main>

      <KamuranGreeting />

      <nav className="bk-mobile-bottom-nav bk-mobile-only">
        {navItems.map((item) => {
          const active = isActive(item.key)
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => navigate(item.key)}
              style={{
                ...styles.bottomNavItem,
                color: active ? COLORS.primary : COLORS.textSecondary,
              }}
            >
              <Badge count={item.badge ?? 0} size="small" offset={[6, -2]}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
              </Badge>
              <span style={{ fontSize: 10, marginTop: 2, fontWeight: active ? 600 : 500 }}>
                {item.label}
              </span>
            </button>
          )
        })}
        <button type="button" onClick={handleLogout} style={styles.bottomNavItem}>
          <span style={{ fontSize: 20, color: COLORS.textSecondary }}>
            <LogoutOutlined />
          </span>
          <span style={{ fontSize: 10, marginTop: 2, color: COLORS.textMuted }}>Çıkış</span>
        </button>
      </nav>

      <style>{`
        .bk-mobile-only { display: none; }
        @media (max-width: 720px) {
          .bk-mobile-only { display: flex; }
          .bk-desktop-nav { display: none !important; }
          main { padding-bottom: 90px; }
        }
      `}</style>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  topBar: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: 'rgba(10, 10, 16, 0.85)',
    backdropFilter: 'saturate(180%) blur(16px)',
    WebkitBackdropFilter: 'saturate(180%) blur(16px)',
    borderBottom: `1px solid ${COLORS.border}`,
    // iOS PWA notch/status bar için safe area
    paddingTop: 'env(safe-area-inset-top)',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
  },
  topBarInner: {
    maxWidth: 1080,
    margin: '0 auto',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
    userSelect: 'none' as const,
  },
  brandIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    background: COLORS.gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 18,
    boxShadow: '0 6px 16px rgba(124,140,255,0.35)',
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.text,
    lineHeight: 1.1,
    letterSpacing: '-0.3px',
  },
  brandSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    lineHeight: 1.1,
    marginTop: 2,
  },
  desktopNav: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  navBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 14px',
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: 10,
    color: COLORS.textSecondary,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
    transition: 'all 0.15s ease',
  },
  navBtnActive: {
    background: 'rgba(124, 140, 255, 0.1)',
    borderColor: 'rgba(124, 140, 255, 0.25)',
    color: COLORS.text,
  },
  navIcon: { fontSize: 16, display: 'inline-flex' },
  bottomNavItem: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 0',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
}

export default AppLayout
