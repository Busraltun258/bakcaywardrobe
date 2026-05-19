import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { CATEGORIES, ClothingItem, OutfitRequest } from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'

const RespondOutfit: React.FC = () => {
  const { requestId } = useParams<{ requestId: string }>()
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const backPath = isAdmin ? '/home' : '/kombin'
  const [req, setReq] = useState<OutfitRequest | null>(null)
  const [loadErr, setLoadErr] = useState('')
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [catFilter, setCatFilter] = useState<string | 'all'>('all')
  const [enlargedItem, setEnlargedItem] = useState<ClothingItem | null>(null)

  useEffect(() => {
    if (!requestId || !user) return
    ;(async () => {
      const snap = await getDoc(doc(db, 'outfitRequests', requestId))
      if (!snap.exists) {
        setLoadErr('İstek bulunamadı.')
        return
      }
      const data = { id: snap.id, ...snap.data() } as OutfitRequest
      if (!isAdmin && data.toUid !== user.uid) {
        setLoadErr('Bu istek sana ait değil.')
        return
      }
      if (data.status !== 'pending') {
        setLoadErr('Bu istek zaten yanıtlanmış.')
        return
      }
      setReq(data)
    })()
  }, [requestId, user])

  useEffect(() => {
    if (!req?.wardrobeOwnerUid) return
    const ownerUid = req.wardrobeOwnerUid
    const cacheKey = `bk_clothes_all_${ownerUid}`

    // Önbellekten anında göster
    try {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        const list = JSON.parse(cached) as ClothingItem[]
        list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
        setWardrobe(list)
      }
    } catch {}

    // Sadece o kullanıcının kıyafetlerini çek (tüm koleksiyonu değil)
    ;(async () => {
      const q = query(collection(db, 'clothes'), where('ownerId', '==', ownerUid))
      const snap = await getDocs(q)
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as ClothingItem[]
      list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
      try { localStorage.setItem(cacheKey, JSON.stringify(list)) } catch {}
      setWardrobe(list)
    })()
  }, [req?.wardrobeOwnerUid])

  const filtered = useMemo(() => {
    if (catFilter === 'all') return wardrobe
    return wardrobe.filter((c) => c.category === catFilter)
  }, [wardrobe, catFilter])

  const toggle = (id: string) => {
    setSelected((prev) => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }

  const submit = async () => {
    if (!req || !user || selected.size === 0) {
      alert('En az bir parça seç.')
      return
    }
    setSaving(true)
    try {
      await addDoc(collection(db, 'outfitSuggestions'), {
        requestId: req.id,
        requesterUid: req.fromUid,
        advisorUid: user.uid,
        clothingItemIds: Array.from(selected),
        advisorNote: note.trim(),
        createdAt: Date.now(),
        liked: null,
        comment: '',
        feedbackAt: null,
      })
      await updateDoc(doc(db, 'outfitRequests', req.id), { status: 'answered' })
      navigate(backPath, { replace: true })
    } catch (e) {
      console.error(e)
      alert('Kaydedilemedi.')
    } finally {
      setSaving(false)
    }
  }

  if (loadErr) {
    return (
      <div style={styles.page}>
        <Navbar />
        <p style={styles.center}>{loadErr}</p>
        <button type="button" style={styles.back} onClick={() => navigate(backPath)}>
          Geri dön
        </button>
      </div>
    )
  }

  if (!req) {
    return (
      <div style={styles.page}>
        <Navbar />
        <p style={styles.center}>Yükleniyor…</p>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.wrap}>
        <h2 style={styles.h2}>Kombin öner</h2>
        <p style={styles.sub}>
          İstek sahibinin dolabından parça seç. Seçtiklerin bir kombin önerisi olarak gidecek.
        </p>
        {req.note ? (
          <p style={styles.note}>
            <strong>Not:</strong> {req.note}
          </p>
        ) : null}

        <div style={styles.tabs}>
          <button
            type="button"
            style={{ ...styles.tab, ...(catFilter === 'all' ? styles.tabOn : {}) }}
            onClick={() => setCatFilter('all')}
          >
            Tümü
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              style={{ ...styles.tab, ...(catFilter === c.key ? styles.tabOn : {}) }}
              onClick={() => setCatFilter(c.key)}
            >
              {c.emoji}
            </button>
          ))}
        </div>

        <div style={styles.grid}>
          {filtered.length === 0 ? (
            <p style={styles.empty}>Bu dolapta bu kategoride parça yok.</p>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setEnlargedItem(item)}
                style={{
                  ...styles.cell,
                  ...(selected.has(item.id) ? styles.cellOn : {}),
                }}
              >
                <img src={clothingItemImageSrc(item)} alt="" style={styles.img} />
                {(item.label || item.description) && (
                  <span style={styles.labelTag}>
                    {item.label || item.description}
                  </span>
                )}
                {selected.has(item.id) ? <span style={styles.check}>✓</span> : null}
              </button>
            ))
          )}
        </div>

        <textarea
          placeholder="Kısa not (isteğe bağlı)…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={styles.textarea}
          rows={3}
        />
        <p style={styles.count}>{selected.size} parça seçildi</p>
        <button type="button" style={styles.primary} onClick={submit} disabled={saving}>
          {saving ? 'Gönderiliyor…' : 'Öneriyi gönder'}
        </button>
        <button type="button" style={styles.secondary} onClick={() => navigate(backPath)}>
          Vazgeç
        </button>
      </div>

      {/* Kıyafet detay modalı */}
      {enlargedItem && (
        <div style={styles.lightbox} onClick={() => setEnlargedItem(null)}>
          <div style={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <button style={styles.lightboxClose} onClick={() => setEnlargedItem(null)}>✕</button>
            <img src={clothingItemImageSrc(enlargedItem)} alt="" style={styles.lightboxImg} />
            <div style={styles.lightboxBody}>
              {enlargedItem.label && (
                <p style={{ margin: 0, fontWeight: 700, color: '#fff', fontSize: 16 }}>{enlargedItem.label}</p>
              )}
              {enlargedItem.description && (
                <p style={{ margin: '6px 0 0', color: '#aaa', fontSize: 14, lineHeight: 1.6 }}>{enlargedItem.description}</p>
              )}
              <button
                type="button"
                style={{
                  ...styles.lightboxToggle,
                  ...(selected.has(enlargedItem.id) ? styles.lightboxToggleOn : {}),
                }}
                onClick={() => {
                  toggle(enlargedItem.id)
                  setEnlargedItem(null)
                }}
              >
                {selected.has(enlargedItem.id) ? '✓ Seçildi — Çıkar' : '+ Kombine Ekle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0f0f14' },
  wrap: { maxWidth: 640, margin: '0 auto', padding: '16px' },
  h2: { margin: '8px 0 4px', fontSize: 22, color: '#fff' },
  sub: { color: '#888', fontSize: 14, marginBottom: 12 },
  note: { background: '#1a1a24', padding: 12, borderRadius: 10, fontSize: 14, color: '#ccc', border: '1px solid rgba(255,255,255,0.06)' },
  tabs: { display: 'flex', flexWrap: 'wrap', gap: 6, margin: '12px 0' },
  tab: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: '6px 10px',
    cursor: 'pointer',
    fontSize: 13,
    color: '#ccc',
  },
  tabOn: { borderColor: '#818cf8', background: 'rgba(99,102,241,0.2)', color: '#fff' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 8,
    marginBottom: 12,
  },
  cell: {
    position: 'relative',
    aspectRatio: '1',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: 'transparent',
    padding: 0,
    cursor: 'pointer',
    background: '#1a1a24',
  },
  cellOn: { borderColor: '#818cf8' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  labelTag: { position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: 10, padding: '3px 6px', textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
  lightbox: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 },
  lightboxInner: { position: 'relative', maxWidth: 480, width: '100%', background: '#1a1a24', borderRadius: 16, overflow: 'hidden' },
  lightboxClose: { position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', width: 34, height: 34, borderRadius: '50%', fontSize: 16, cursor: 'pointer', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  lightboxImg: { width: '100%', maxHeight: '60vh', objectFit: 'contain', display: 'block' },
  lightboxBody: { padding: '14px 16px 18px' },
  lightboxToggle: { marginTop: 14, width: '100%', padding: '12px 0', borderRadius: 10, border: '2px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)', color: '#ccc', fontSize: 15, fontWeight: 600, cursor: 'pointer' },
  lightboxToggleOn: { borderColor: '#818cf8', background: 'rgba(99,102,241,0.25)', color: '#fff' },
  check: {
    position: 'absolute',
    top: 4,
    right: 4,
    background: '#6366f1',
    color: '#fff',
    width: 24,
    height: 24,
    borderRadius: '50%',
    fontSize: 14,
    lineHeight: '24px',
    textAlign: 'center',
  },
  textarea: {
    width: '100%',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    padding: 10,
    fontSize: 14,
    boxSizing: 'border-box',
  },
  count: { fontSize: 13, color: '#888' },
  primary: {
    width: '100%',
    marginTop: 8,
    padding: 14,
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    fontWeight: 600,
    cursor: 'pointer',
  },
  secondary: {
    width: '100%',
    marginTop: 8,
    padding: 10,
    background: 'transparent',
    border: 'none',
    color: '#888',
    cursor: 'pointer',
  },
  center: { textAlign: 'center', padding: 24, color: '#888' },
  back: { display: 'block', margin: '16px auto', padding: '10px 20px' },
  empty: { gridColumn: '1 / -1', textAlign: 'center', color: '#666' },
}

export default RespondOutfit
