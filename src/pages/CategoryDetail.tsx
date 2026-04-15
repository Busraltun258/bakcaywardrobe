import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES, ClothingItem, MAX_CLOTHES_TOTAL } from '../types'
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { clothingItemImageSrc } from '../utils/imageUtils'
import { summarizeBatchUpload, uploadClothesBatch } from '../utils/uploadClothesBatch'
import { db } from '../firebase'

const CategoryDetail: React.FC = () => {
  const { user } = useAuth()
  const { categoryKey } = useParams<{ categoryKey: string }>()
  const category = CATEGORIES.find((c) => c.key === categoryKey)
  const [items, setItems] = useState<ClothingItem[]>([])
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!categoryKey || !user) return

    const q = query(collection(db, 'clothes'), where('category', '==', categoryKey))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mapped = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as ClothingItem[]
      const mine = mapped.filter((x) => x.ownerId === user.uid)
      mine.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
      setItems(mine)
    })

    return () => unsubscribe()
  }, [categoryKey, user])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files
    if (!list?.length || !categoryKey || !user) return

    setUploading(true)
    try {
      const r = await uploadClothesBatch(list, categoryKey, user.uid)
      const msg = summarizeBatchUpload(r)
      if (msg) alert(msg)
    } catch (error) {
      console.error('Yükleme hatası:', error)
      alert('Yükleme sırasında hata oluştu!')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDelete = async (item: ClothingItem) => {
    if (!confirm('Bu kıyafeti silmek istediğine emin misin?')) return

    try {
      await deleteDoc(doc(db, 'clothes', item.id))
    } catch (error) {
      console.error('Silme hatası:', error)
    }
  }

  if (!category) {
    return (
      <div>
        <Navbar />
        <p style={{ textAlign: 'center', marginTop: '40px' }}>Kategori bulunamadı</p>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>
          {category.emoji} {category.label}
        </h2>
        <p style={styles.hint}>
          Sadece senin dolabın (hesabına kayıtlı parçalar). Aynı anda çoklu fotoğraf. Kişi başı en fazla{' '}
          {MAX_CLOTHES_TOTAL} parça.
        </p>

        <label style={styles.uploadBtn}>
          {uploading ? '⏳ Yükleniyor...' : '📷 Kıyafet Ekle (çoklu seçim)'}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            style={{ display: 'none' }}
            disabled={uploading}
          />
        </label>

        {items.length === 0 ? (
          <p style={styles.empty}>
            Henüz kıyafet eklenmemiş. Yukarıdaki butona tıklayarak ekle!
          </p>
        ) : (
          <div style={styles.grid}>
            {items.map((item) => (
              <div key={item.id} style={styles.card}>
                <img src={clothingItemImageSrc(item)} alt={category.label} style={styles.image} />
                {item.ownerId === user?.uid ? (
                  <button type="button" onClick={() => handleDelete(item)} style={styles.deleteBtn}>
                    🗑️
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', backgroundColor: '#f0f2f5' },
  container: { padding: '24px 16px', maxWidth: '600px', margin: '0 auto' },
  title: { fontSize: '24px', textAlign: 'center', marginBottom: '8px' },
  hint: {
    textAlign: 'center',
    color: '#888',
    fontSize: '12px',
    marginBottom: '16px',
    lineHeight: 1.4,
  },
  uploadBtn: {
    display: 'block',
    width: '100%',
    padding: '16px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: 600,
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '24px',
  },
  empty: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: '40px',
    fontSize: '14px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  card: {
    position: 'relative',
    borderRadius: '14px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    aspectRatio: '1',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  deleteBtn: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'rgba(255,255,255,0.9)',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
  },
}

export default CategoryDetail
