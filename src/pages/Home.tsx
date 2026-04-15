import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { CATEGORIES } from '../types'
import './Home.css'

const Home: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Navbar />
      <div className="home">
        <h1>👗 Dolabım</h1>
        <p style={{ textAlign: 'center', color: '#666', marginTop: '-0.5rem', marginBottom: '1.5rem' }}>
          Kategorilere tıklayarak kıyafetlerini yönet
        </p>
        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              className="category-card"
              onClick={() => navigate(`/wardrobe/${cat.key}`)}
            >
              <span className="category-icon">{cat.emoji}</span>
              <span className="category-name">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
