import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { CATEGORIES } from '../types'

const Wardrobe: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>👗 Bakçay Dolap</h2>
        <p style={styles.subtitle}>Kıyafetlerini görmek veya eklemek için kategori seç</p>
        <div style={styles.list}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => navigate(`/wardrobe/${cat.key}`)}
              style={styles.item}
            >
              <span style={styles.emoji}>{cat.emoji}</span>
              <span style={styles.label}>{cat.label}</span>
              <span style={styles.arrow}>›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0f0f14' },
  container: { padding: '24px 16px', maxWidth: '600px', margin: '0 auto' },
  title: { fontSize: '24px', textAlign: 'center', marginBottom: '4px', color: '#fff' },
  subtitle: { textAlign: 'center', color: '#888', marginBottom: '20px', fontSize: '14px' },
  list: { display: 'flex', flexDirection: 'column', gap: '10px' },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px 20px',
    backgroundColor: '#1a1a24',
    borderRadius: '14px',
    border: '1px solid rgba(255,255,255,0.06)',
    cursor: 'pointer',
    fontSize: '16px',
    textAlign: 'left',
  },
  emoji: { fontSize: '28px' },
  label: { flex: 1, fontWeight: 600, color: '#e2e2e2' },
  arrow: { fontSize: '22px', color: '#555' },
}

export default Wardrobe
