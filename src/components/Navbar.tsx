import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, isAdmin } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (e) {
      console.error('Logout hatası:', e)
    } finally {
      navigate('/login', { replace: true })
    }
  }

  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo} onClick={() => navigate(isAdmin ? '/home' : '/wardrobe')}>
        {isAdmin ? '🎨 Admin Panel' : '🧥 Dolabım'}
      </h1>
      <div style={styles.links}>
        {isAdmin ? (
          <button
            type="button"
            onClick={() => navigate('/home')}
            style={{
              ...styles.link,
              ...(location.pathname === '/home' ? styles.activeLink : {}),
            }}
          >
            Ana Sayfa
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => navigate('/wardrobe')}
              style={{
                ...styles.link,
                ...(location.pathname.startsWith('/wardrobe') ? styles.activeLink : {}),
              }}
            >
              Dolabım
            </button>
            <button
              type="button"
              onClick={() => navigate('/kombin')}
              style={{
                ...styles.link,
                ...(location.pathname.startsWith('/kombin') ? styles.activeLink : {}),
              }}
            >
              Kombin
            </button>
          </>
        )}
        <button type="button" onClick={handleLogout} style={styles.logoutBtn}>
          Çıkış
        </button>
      </div>
    </nav>
  )
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    color: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  logo: {
    fontSize: '20px',
    cursor: 'pointer',
    margin: 0,
  },
  links: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  link: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: '#ccc',
    padding: '6px 14px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  activeLink: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: '#fff',
  },
  logoutBtn: {
    background: '#ef4444',
    border: 'none',
    color: '#fff',
    padding: '6px 14px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '13px',
  },
}

export default Navbar
