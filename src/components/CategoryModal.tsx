import React, { useState, useEffect, useRef } from 'react'
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES, ClothingItem } from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'
import { db } from '../firebase'
import { summarizeBatchUpload, uploadClothesBatch } from '../utils/uploadClothesBatch'
interface Props {
  categoryKey: string
  onClose: () => void
}

const CategoryModal: React.FC<Props> = ({ categoryKey, onClose }) => {
  const { user } = useAuth()
  const category = CATEGORIES.find((c) => c.key === categoryKey)!
  const [items, setItems] = useState<ClothingItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Firestore'dan bu kategoriye ait kıyafetleri dinle
  useEffect(() => {
    if (!user) return
    const q = query(collection(db, 'clothes'), where('category', '==', categoryKey))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mapped = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as ClothingItem[]
      const mine = mapped.filter((x) => x.ownerId === user.uid)
      mine.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
      setItems(mine)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [categoryKey, user])

  // Resim seçildiğinde sıkıştır ve Firestore'a kaydet
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files
    if (!list?.length || !user) return

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

  // Kıyafet sil
  const handleDelete = async (itemId: string) => {
    if (!window.confirm('Bu kıyafeti silmek istediğine emin misin?')) return
    try {
      await deleteDoc(doc(db, 'clothes', itemId))
    } catch (error) {
      console.error('Silme hatası:', error)
    }
  }

  // Modal dışına tıklayınca kapat
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div style={styles.backdrop} onClick={handleBackdropClick}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            {category.emoji} {category.label}
          </h2>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {/* Upload Button */}
        <label style={{
          ...styles.uploadBtn,
          opacity: uploading ? 0.6 : 1,
          cursor: uploading ? 'not-allowed' : 'pointer',
        }}>
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

        {/* Content */}
        <div style={styles.content}>
          {loading ? (
            <p style={styles.empty}>Yükleniyor...</p>
          ) : items.length === 0 ? (
            <p style={styles.empty}>
              Henüz kıyafet eklenmemiş.<br />
              Yukarıdaki butona tıklayarak ekle! 👆
            </p>
          ) : (
            <div style={styles.grid}>
              {items.map((item) => (
                <div key={item.id} style={styles.card}>
                  <img
                    src={clothingItemImageSrc(item)}
                    alt={category.label}
                    style={styles.image}
                  />
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={styles.deleteBtn}
                    title="Sil"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '500px',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px 12px',
    borderBottom: '1px solid #eee',
  },
  title: {
    fontSize: '20px',
    margin: 0,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '22px',
    cursor: 'pointer',
    color: '#999',
    padding: '4px 8px',
    borderRadius: '8px',
  },
  uploadBtn: {
    display: 'block',
    margin: '16px 24px',
    padding: '14px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
    textAlign: 'center' as const,
  },
  content: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '0 24px 24px',
  },
  empty: {
    textAlign: 'center' as const,
    color: '#aaa',
    marginTop: '30px',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  card: {
    position: 'relative' as const,
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    aspectRatio: '1',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  deleteBtn: {
    position: 'absolute' as const,
    top: '6px',
    right: '6px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'rgba(255,255,255,0.9)',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
  },
}

export default CategoryModal
