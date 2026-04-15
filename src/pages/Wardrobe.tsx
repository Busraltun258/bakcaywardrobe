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
        <h2 style={styles.title}>👗 Dolabım</h2>
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
  page: { minHeight: '100vh', backgroundColor: '#f0f2f5' },
  container: { padding: '24px 16px', maxWidth: '600px', margin: '0 auto' },
  title: { fontSize: '24px', textAlign: 'center', marginBottom: '4px' },
  subtitle: { textAlign: 'center', color: '#888', marginBottom: '20px', fontSize: '14px' },
  list: { display: 'flex', flexDirection: 'column', gap: '10px' },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px 20px',
    backgroundColor: '#fff',
    borderRadius: '14px',
    border: 'none',
    boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
    cursor: 'pointer',
    fontSize: '16px',
    textAlign: 'left',
  },
  emoji: { fontSize: '28px' },
  label: { flex: 1, fontWeight: 600, color: '#333' },
  arrow: { fontSize: '22px', color: '#aaa' },
}

export default Wardrobe
