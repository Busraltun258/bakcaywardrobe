import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES, ClothingItem, OutfitRequest } from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'
import { db } from '../firebase'

const RespondOutfit: React.FC = () => {
  const { requestId } = useParams<{ requestId: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [req, setReq] = useState<OutfitRequest | null>(null)
  const [loadErr, setLoadErr] = useState('')
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [catFilter, setCatFilter] = useState<string | 'all'>('all')

  useEffect(() => {
    if (!requestId || !user) return
    ;(async () => {
      const snap = await getDoc(doc(db, 'outfitRequests', requestId))
      if (!snap.exists) {
        setLoadErr('İstek bulunamadı.')
        return
      }
      const data = { id: snap.id, ...snap.data() } as OutfitRequest
      if (data.toUid !== user.uid) {
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
    ;(async () => {
      const snap = await getDocs(collection(db, 'clothes'))
      const mapped = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as ClothingItem[]
      const list = mapped.filter((c) => c.ownerId === req.wardrobeOwnerUid)
      list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
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
        advisorUid: user.uid,
        clothingItemIds: Array.from(selected),
        advisorNote: note.trim(),
        createdAt: Date.now(),
        liked: null,
        comment: '',
        feedbackAt: null,
      })
      await updateDoc(doc(db, 'outfitRequests', req.id), { status: 'answered' })
      navigate('/kombin', { replace: true })
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
        <button type="button" style={styles.back} onClick={() => navigate('/kombin')}>
          Kombinlere dön
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
                onClick={() => toggle(item.id)}
                style={{
                  ...styles.cell,
                  ...(selected.has(item.id) ? styles.cellOn : {}),
                }}
              >
                <img src={clothingItemImageSrc(item)} alt="" style={styles.img} />
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
        <button type="button" style={styles.secondary} onClick={() => navigate('/kombin')}>
          Vazgeç
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#f0f2f5' },
  wrap: { maxWidth: 640, margin: '0 auto', padding: '16px' },
  h2: { margin: '8px 0 4px', fontSize: 22 },
  sub: { color: '#666', fontSize: 14, marginBottom: 12 },
  note: { background: '#fff', padding: 12, borderRadius: 10, fontSize: 14 },
  tabs: { display: 'flex', flexWrap: 'wrap', gap: 6, margin: '12px 0' },
  tab: {
    border: '1px solid #ccc',
    background: '#fff',
    borderRadius: 20,
    padding: '6px 10px',
    cursor: 'pointer',
    fontSize: 13,
  },
  tabOn: { borderColor: '#4f46e5', background: '#eef2ff' },
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
    border: '3px solid transparent',
    padding: 0,
    cursor: 'pointer',
    background: '#ddd',
  },
  cellOn: { borderColor: '#4f46e5' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  check: {
    position: 'absolute',
    top: 4,
    right: 4,
    background: '#4f46e5',
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
    border: '1px solid #ddd',
    padding: 10,
    fontSize: 14,
    boxSizing: 'border-box',
  },
  count: { fontSize: 13, color: '#666' },
  primary: {
    width: '100%',
    marginTop: 8,
    padding: 14,
    background: '#4f46e5',
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
    color: '#666',
    cursor: 'pointer',
  },
  center: { textAlign: 'center', padding: 24 },
  back: { display: 'block', margin: '16px auto', padding: '10px 20px' },
  empty: { gridColumn: '1 / -1', textAlign: 'center', color: '#999' },
}

export default RespondOutfit
