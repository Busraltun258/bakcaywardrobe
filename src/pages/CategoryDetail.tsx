import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    updateDoc,
    where,
} from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { CATEGORIES, ClothingItem } from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'
import { summarizeBatchUpload, uploadClothesBatch } from '../utils/uploadClothesBatch'

const CategoryDetail: React.FC = () => {
  const { user } = useAuth()
  const { categoryKey } = useParams<{ categoryKey: string }>()
  const category = CATEGORIES.find((c) => c.key === categoryKey)
  const [items, setItems] = useState<ClothingItem[]>([])
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editLabel, setEditLabel] = useState('')

  useEffect(() => {
    if (!categoryKey || !user) return
    const q = query(collection(db, 'clothes'), where('category', '==', categoryKey))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mapped = snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as ClothingItem[]
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
      console.error(error)
      alert('Yükleme sırasında hata oluştu!')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDelete = async (item: ClothingItem) => {
    if (!confirm('Bu kıyafeti silmek istediğine emin misin?')) return
    try { await deleteDoc(doc(db, 'clothes', item.id)) } catch (e) { console.error(e) }
  }

  const startEdit = (item: ClothingItem) => {
    setEditingId(item.id)
    setEditLabel(item.label ?? '')
  }

  const saveLabel = async (item: ClothingItem) => {
    try { await updateDoc(doc(db, 'clothes', item.id), { label: editLabel.trim() }) } catch (e) { console.error(e) }
    setEditingId(null)
  }

  if (!category) {
    return (<div style={st.page}><Navbar /><p style={{ textAlign: 'center', marginTop: 40, color: '#666' }}>Kategori bulunamadı</p></div>)
  }

  return (
    <div style={st.page}>
      <Navbar />
      <div style={st.container}>
        <div style={st.header}>
          <span style={{ fontSize: 40 }}>{category.emoji}</span>
          <div>
            <h2 style={st.title}>{category.label}</h2>
            <p style={st.count}>{items.length} parça</p>
          </div>
        </div>

        <label style={st.uploadBtn}>
          {uploading ? '⏳ Yükleniyor...' : '+ Kıyafet Ekle'}
          <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleUpload} style={{ display: 'none' }} disabled={uploading} />
        </label>

        {items.length === 0 ? (
          <div style={st.emptyState}>
            <span style={{ fontSize: 48 }}>📂</span>
            <p style={{ color: '#888', fontSize: 16, margin: 0, fontWeight: 600 }}>Henüz kıyafet yok</p>
            <p style={{ color: '#666', fontSize: 13, margin: 0 }}>Yukarıdan ekle</p>
          </div>
        ) : (
          <div style={st.grid}>
            {items.map((item) => (
              <div key={item.id} style={st.card}>
                <img src={clothingItemImageSrc(item)} alt="" style={st.image} loading="lazy" decoding="async" />
                <div style={st.cardOverlay}>
                  {editingId === item.id ? (
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center', minWidth: 0, width: '100%' }}>
                      <input type="text" value={editLabel} onChange={(e) => setEditLabel(e.target.value)}
                        placeholder="ör. Baggy jean" autoFocus onKeyDown={(e) => e.key === 'Enter' && saveLabel(item)}
                        style={{ flex: 1, minWidth: 0, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 6, color: '#fff', padding: '5px 8px', fontSize: 12, outline: 'none', boxSizing: 'border-box' }} />
                      <button type="button" onClick={() => saveLabel(item)} style={{ flexShrink: 0, background: '#22c55e', border: 'none', color: '#fff', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', fontSize: 12, minWidth: 28 }}>✓</button>
                      <button type="button" onClick={() => setEditingId(null)} style={{ flexShrink: 0, background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', fontSize: 12, minWidth: 28 }}>✕</button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => startEdit(item)} style={st.labelBtn}>
                      {item.label ? `✏️ ${item.label}` : '✏️ Açıklama ekle'}
                    </button>
                  )}
                </div>
                {item.ownerId === user?.uid && (
                  <button type="button" onClick={() => handleDelete(item)} style={st.deleteBtn}>🗑️</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const st: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0f0f14' },
  container: { padding: '20px 16px', maxWidth: 600, margin: '0 auto', boxSizing: 'border-box' },
  header: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 },
  title: { margin: 0, fontSize: 22, color: '#fff', fontWeight: 700 },
  count: { margin: 0, fontSize: 13, color: '#888' },
  uploadBtn: { display: 'block', width: '100%', padding: 14, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 600, textAlign: 'center', cursor: 'pointer', marginBottom: 20, boxSizing: 'border-box' },
  emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '60px 0' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 },
  card: { position: 'relative', borderRadius: 14, overflow: 'hidden', background: '#1a1a24', aspectRatio: '1' },
  image: { width: '100%', height: '100%', objectFit: 'cover', background: '#2a2a35' },
  cardOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.75))', padding: '24px 8px 8px' },
  labelBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 12, cursor: 'pointer', padding: '2px 0', textAlign: 'left', width: '100%' },
  deleteBtn: { position: 'absolute', top: 8, right: 8, width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.5)', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
}

export default CategoryDetail
