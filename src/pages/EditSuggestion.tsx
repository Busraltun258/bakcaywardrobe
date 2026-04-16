import {
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { CATEGORIES, ClothingItem, OutfitRequest, OutfitSuggestion } from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'

const EditSuggestion: React.FC = () => {
  const { suggestionId } = useParams<{ suggestionId: string }>()
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [suggestion, setSuggestion] = useState<OutfitSuggestion | null>(null)
  const [request, setRequest] = useState<OutfitRequest | null>(null)
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [catFilter, setCatFilter] = useState<string | 'all'>('all')
  const [loadErr, setLoadErr] = useState('')

  useEffect(() => {
    if (!suggestionId || !user) return
    ;(async () => {
      const snap = await getDoc(doc(db, 'outfitSuggestions', suggestionId))
      if (!snap.exists()) {
        setLoadErr('Öneri bulunamadı.')
        return
      }
      const s = { id: snap.id, ...snap.data() } as OutfitSuggestion
      if (!isAdmin && s.advisorUid !== user.uid) {
        setLoadErr('Bu öneriyi düzenleme yetkin yok.')
        return
      }
      setSuggestion(s)
      setSelected(new Set(s.clothingItemIds))
      setNote(s.advisorNote ?? '')

      // İsteği yükle
      const reqSnap = await getDoc(doc(db, 'outfitRequests', s.requestId))
      if (reqSnap.exists()) {
        setRequest({ id: reqSnap.id, ...reqSnap.data() } as OutfitRequest)
      }
    })()
  }, [suggestionId, user])

  // Dolabı yükle
  useEffect(() => {
    if (!request?.wardrobeOwnerUid) return
    ;(async () => {
      const snap = await getDocs(collection(db, 'clothes'))
      const mapped = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as ClothingItem[]
      const list = mapped.filter((c) => c.ownerId === request.wardrobeOwnerUid)
      list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
      setWardrobe(list)
    })()
  }, [request?.wardrobeOwnerUid])

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
    if (!suggestion || selected.size === 0) {
      alert('En az bir parça seç.')
      return
    }
    setSaving(true)
    try {
      await updateDoc(doc(db, 'outfitSuggestions', suggestion.id), {
        clothingItemIds: Array.from(selected),
        advisorNote: note.trim(),
        liked: null,         // Feedback sıfırla — user tekrar değerlendirecek
        comment: '',
        feedbackAt: null,
        editedAt: Date.now(),
      })
      alert('✅ Öneri güncellendi! Kullanıcı tekrar değerlendirecek.')
      navigate('/home', { replace: true })
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
        <button type="button" style={styles.secondary} onClick={() => navigate('/home')}>Geri dön</button>
      </div>
    )
  }

  if (!suggestion) {
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
        <h2 style={styles.h2}>✏️ Öneriyi Düzenle</h2>
        <p style={styles.sub}>
          Kullanıcı bu kombini beğenmedi. Parçaları değiştirip tekrar gönderebilirsin.
        </p>

        {suggestion.comment && (
          <div style={styles.feedbackBox}>
            <p style={{ margin: 0, fontSize: 14, color: '#f87171' }}>
              <strong>👎 Kullanıcı yorumu:</strong> {suggestion.comment}
            </p>
          </div>
        )}

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
            <p style={styles.empty}>Bu kategoride parça yok.</p>
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
                <img src={clothingItemImageSrc(item)} alt="" style={styles.img} loading="lazy" />
                {item.label ? <span style={styles.labelTag}>{item.label}</span> : null}
                {selected.has(item.id) ? <span style={styles.check}>✓</span> : null}
              </button>
            ))
          )}
        </div>

        <textarea
          placeholder="Not (isteğe bağlı)…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={styles.textarea}
          rows={3}
        />
        <p style={styles.count}>{selected.size} parça seçildi</p>
        <button type="button" style={styles.primary} onClick={submit} disabled={saving}>
          {saving ? 'Güncelleniyor…' : '✅ Öneriyi Güncelle'}
        </button>
        <button type="button" style={styles.secondary} onClick={() => navigate('/home')}>
          Vazgeç
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0f0f14' },
  wrap: { maxWidth: 640, margin: '0 auto', padding: '16px' },
  h2: { margin: '8px 0 4px', fontSize: 22, color: '#fff' },
  sub: { color: '#888', fontSize: 14, marginBottom: 12 },
  center: { textAlign: 'center', padding: 24, color: '#888' },
  feedbackBox: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  tabs: { display: 'flex', flexWrap: 'wrap', gap: 6, margin: '12px 0' },
  tab: {
    borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: '6px 10px',
    cursor: 'pointer', fontSize: 13, color: '#ccc',
  },
  tabOn: { borderColor: '#818cf8', background: 'rgba(99,102,241,0.2)', color: '#fff' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 },
  cell: {
    position: 'relative', aspectRatio: '1', borderRadius: 10, overflow: 'hidden',
    borderWidth: 3, borderStyle: 'solid', borderColor: 'transparent',
    padding: 0, cursor: 'pointer', background: '#1a1a24',
  },
  cellOn: { borderColor: '#818cf8' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  labelTag: {
    position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.65)',
    color: '#fff', fontSize: 10, padding: '3px 6px', textAlign: 'center',
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
  },
  check: {
    position: 'absolute', top: 4, right: 4, background: '#6366f1', color: '#fff',
    width: 24, height: 24, borderRadius: '50%', fontSize: 14, lineHeight: '24px', textAlign: 'center',
  },
  textarea: {
    width: '100%', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)', color: '#fff', padding: 10, fontSize: 14, boxSizing: 'border-box',
  },
  count: { fontSize: 13, color: '#888' },
  primary: {
    width: '100%', marginTop: 8, padding: 14,
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer',
  },
  secondary: {
    width: '100%', marginTop: 8, padding: 10,
    background: 'transparent', border: 'none', color: '#888', cursor: 'pointer',
  },
  empty: { gridColumn: '1 / -1', textAlign: 'center', color: '#666' },
}

export default EditSuggestion
