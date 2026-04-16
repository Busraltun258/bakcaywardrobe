import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    updateDoc,
    where,
} from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import {
    ClothingItem,
    OutfitRequest,
    OutfitSuggestion,
    UserProfile,
} from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'

const OutfitHub: React.FC = () => {
  const { user } = useAuth()
  const [profiles, setProfiles] = useState<UserProfile[]>([])
  const [fromMe, setFromMe] = useState<OutfitRequest[]>([])
  const [toMe, setToMe] = useState<OutfitRequest[]>([])
  const [allSuggestions, setAllSuggestions] = useState<OutfitSuggestion[]>([])
  const [note, setNote] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (!user) return
    ;(async () => {
      const snap = await getDocs(collection(db, 'profiles'))
      setProfiles(
        snap.docs
          .map((d) => ({ id: d.id, ...d.data() })) as UserProfile[]
      )
    })()
  }, [user])

  useEffect(() => {
    if (!user) return
    const q1 = query(collection(db, 'outfitRequests'), where('fromUid', '==', user.uid))
    const q2 = query(collection(db, 'outfitRequests'), where('toUid', '==', user.uid))
    const u1 = onSnapshot(q1, (s) =>
      setFromMe(s.docs.map((d) => ({ id: d.id, ...d.data() } as OutfitRequest)))
    )
    const u2 = onSnapshot(q2, (s) =>
      setToMe(s.docs.map((d) => ({ id: d.id, ...d.data() } as OutfitRequest)))
    )
    return () => {
      u1()
      u2()
    }
  }, [user])

  const requests = useMemo(() => {
    const m = new Map<string, OutfitRequest>()
    fromMe.forEach((r) => m.set(r.id, r))
    toMe.forEach((r) => m.set(r.id, r))
    return Array.from(m.values()).sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
  }, [fromMe, toMe])

  useEffect(() => {
    if (!user) return
    const u = onSnapshot(collection(db, 'outfitSuggestions'), (snap) => {
      setAllSuggestions(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as OutfitSuggestion))
      )
    })
    return () => u()
  }, [user])

  const suggestions = useMemo(() => {
    const ids = new Set(requests.map((r) => r.id))
    return allSuggestions
      .filter((s) => ids.has(s.requestId))
      .sort((a, b) => (b.feedbackAt ?? b.createdAt ?? 0) - (a.feedbackAt ?? a.createdAt ?? 0))
  }, [allSuggestions, requests])

  const profileName = (uid: string) =>
    profiles.find((p) => p.id === uid)?.displayName ??
    profiles.find((p) => p.id === uid)?.username ??
    uid.slice(0, 6)

  const myOutgoing = useMemo(
    () => requests.filter((r) => r.fromUid === user?.uid),
    [requests, user]
  )

  // Admin kullanıcıyı bul (isAdmin: true veya bilinen admin email)
  const ADMIN_EMAILS = ['altunbusra32@gmail.com', 'busra@dolap.com']
  const adminProfile = useMemo(
    () =>
      profiles.find((p) => p.isAdmin === true) ??
      profiles.find((p) => ADMIN_EMAILS.includes(p.email ?? '')),
    [profiles]
  )

  const sendRequest = async () => {
    if (!user) return
    const adminUid = adminProfile?.id
    console.log('Admin profile:', adminProfile)
    console.log('All profiles:', profiles.map(p => ({ id: p.id, email: p.email, isAdmin: p.isAdmin })))
    if (!adminUid) {
      alert('Admin kullanıcı bulunamadı. Profiller yükleniyor olabilir, tekrar deneyin.')
      return
    }
    setSending(true)
    try {
      await addDoc(collection(db, 'outfitRequests'), {
        fromUid: user.uid,
        toUid: adminUid,
        wardrobeOwnerUid: user.uid,
        note: note.trim(),
        status: 'pending',
        createdAt: Date.now(),
      })
      setNote('')
      alert('İstek gönderildi.')
    } catch (e) {
      console.error(e)
      alert('Gönderilemedi.')
    } finally {
      setSending(false)
    }
  }

  const saveFeedback = async (
    s: OutfitSuggestion,
    liked: 'yes' | 'no' | null | undefined,
    comment: string
  ) => {
    try {
      const patch: Record<string, unknown> = {
        comment: comment.trim(),
        feedbackAt: Date.now(),
      }
      if (liked !== undefined) patch.liked = liked
      await updateDoc(doc(db, 'outfitSuggestions', s.id), patch as Partial<OutfitSuggestion>)
      alert('✅ Kaydedildi!')
    } catch (e) {
      console.error(e)
      alert('Kaydedilemedi.')
    }
  }

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.wrap}>
        <h2 style={styles.h2}>Kombin istekleri</h2>
        <p style={styles.sub}>
          Dolabından parça seçtirmek için birine istek at; gelen isteklerde onun dolabından kombin öner.
        </p>

        <section style={styles.card}>
          <h3 style={styles.h3}>✨ Kombin İsteği Gönder</h3>
          <p style={{ fontSize: 13, color: '#888', margin: '0 0 10px' }}>
            Dolabından kombin önerilmesini iste — istek stilistimize iletilecek.
          </p>
          <textarea
            placeholder="Kısa not (ör. yarın akşam davet var)…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={styles.textarea}
            rows={2}
          />
          <button type="button" style={styles.btn} onClick={sendRequest} disabled={sending}>
            {sending ? 'Gönderiliyor…' : '📩 İstek Gönder'}
          </button>
        </section>

        <section style={styles.card}>
          <h3 style={styles.h3}>Gönderdiğim istekler & öneriler</h3>
          {myOutgoing.length === 0 ? (
            <p style={styles.muted}>Henüz istek yok.</p>
          ) : (
            myOutgoing.map((r) => {
              const suggs = suggestions.filter((s) => s.requestId === r.id)
              return (
                <div key={r.id} style={styles.block}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={styles.reqLine}>
                      → <strong>{profileName(r.toUid)}</strong> · {r.status === 'pending' ? 'bekliyor' : 'yanıtlandı'}
                      {r.note ? ` · "${r.note}"` : ''}
                    </p>
                    <button
                      type="button"
                      style={styles.btnDeleteSugg}
                      onClick={async () => {
                        if (!confirm('Bu talebi silmek istediğine emin misin?')) return
                        try {
                          const relatedSuggs = allSuggestions.filter((sg) => sg.requestId === r.id)
                          await Promise.all(relatedSuggs.map((sg) => deleteDoc(doc(db, 'outfitSuggestions', sg.id))))
                          await deleteDoc(doc(db, 'outfitRequests', r.id))
                        } catch (e) {
                          console.error(e)
                          alert('Silinemedi.')
                        }
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                  {suggs.length === 0 && r.status === 'pending' ? (
                    <p style={styles.muted}>Öneri henüz yok.</p>
                  ) : null}
                  {suggs.map((s) => (
                    <SuggestionFeedback
                      key={s.id}
                      s={s}
                      itemIdsKey={[...s.clothingItemIds].sort().join('|')}
                      profileName={profileName}
                      onSave={saveFeedback}
                      onDelete={async () => {
                        if (!confirm('Bu kombin önerisini silmek istediğine emin misin?')) return
                        try {
                          await deleteDoc(doc(db, 'outfitSuggestions', s.id))
                        } catch (e) {
                          console.error(e)
                          alert('Silinemedi.')
                        }
                      }}
                    />
                  ))}
                </div>
              )
            })
          )}
        </section>
      </div>
    </div>
  )
}

const SuggestionFeedback: React.FC<{
  s: OutfitSuggestion
  itemIdsKey: string
  profileName: (uid: string) => string
  onSave: (s: OutfitSuggestion, liked: 'yes' | 'no' | null | undefined, comment: string) => void
  onDelete: () => void
}> = ({ s, itemIdsKey, profileName, onSave, onDelete }) => {
  const [comment, setComment] = useState(s.comment ?? '')
  const [liked, setLiked] = useState<'yes' | 'no' | null>(s.liked ?? null)
  const [items, setItems] = useState<Record<string, ClothingItem>>({})

  useEffect(() => {
    setComment(s.comment ?? '')
    setLiked(s.liked ?? null)
  }, [s.id, s.comment, s.liked])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const results = await Promise.all(
        s.clothingItemIds.map(async (id) => {
          const snap = await getDoc(doc(db, 'clothes', id))
          if (!snap.exists()) return null
          return { id: snap.id, ...snap.data() } as ClothingItem
        })
      )
      if (cancelled) return
      const map: Record<string, ClothingItem> = {}
      results.forEach((c) => { if (c) map[c.id] = c })
      setItems(map)
    }
    load()
    return () => { cancelled = true }
  }, [s.id, itemIdsKey])

  return (
    <div style={styles.sugg}>
      <p style={styles.suggMeta}>
        Öneri: <strong>{profileName(s.advisorUid)}</strong>
        {s.advisorNote ? ` · ${s.advisorNote}` : ''}
      </p>
      <div style={styles.prevRow}>
        {s.clothingItemIds.map((id) => {
          const c = items[id]
          return c ? (
            <img key={id} src={clothingItemImageSrc(c)} alt="" style={styles.thumb} />
          ) : (
            <div key={id} style={styles.thumbPlaceholder} />
          )
        })}
      </div>
      <div style={styles.feedRow}>
        <button
          type="button"
          style={{ ...styles.pill, ...(liked === 'yes' ? styles.pillOn : {}) }}
          onClick={() => {
            setLiked('yes')
            onSave(s, 'yes', comment)
          }}
        >
          Beğendim
        </button>
        <button
          type="button"
          style={{ ...styles.pill, ...(liked === 'no' ? styles.pillOn : {}) }}
          onClick={() => {
            setLiked('no')
            onSave(s, 'no', comment)
          }}
        >
          Beğenmedim
        </button>
      </div>
      <textarea
        placeholder="Yorum…"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={styles.textareaSmall}
        rows={2}
      />
      <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
        <button type="button" style={styles.btnGhost} onClick={() => onSave(s, undefined, comment)}>
          Yorumu kaydet
        </button>
        <button type="button" style={styles.btnDeleteSugg} onClick={onDelete}>
          🗑️ Öneriyi Sil
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0f0f14' },
  wrap: { maxWidth: 640, margin: '0 auto', padding: 16 },
  h2: { margin: '8px 0 4px', fontSize: 24, color: '#fff' },
  sub: { color: '#888', fontSize: 14, marginBottom: 16 },
  card: {
    background: '#1a1a24',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    border: '1px solid rgba(255,255,255,0.06)',
  },
  h3: { margin: '0 0 12px', fontSize: 16, color: '#e2e2e2' },
  select: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    marginBottom: 8,
    fontSize: 14,
  },
  textarea: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    marginBottom: 8,
    fontSize: 14,
    boxSizing: 'border-box',
  },
  textareaSmall: {
    width: '100%',
    padding: 8,
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    marginTop: 8,
    fontSize: 13,
    boxSizing: 'border-box',
  },
  btn: {
    padding: '12px 16px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    fontWeight: 600,
    cursor: 'pointer',
  },
  btnGhost: {
    padding: '8px 14px',
    background: 'rgba(255,255,255,0.08)',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 13,
    color: '#ccc',
  },
  muted: { color: '#666', fontSize: 14 },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  li: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: '12px 0',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    fontSize: 14,
    color: '#ccc',
  },
  link: { color: '#818cf8', fontWeight: 600 },
  block: { marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' },
  reqLine: { fontSize: 14, marginBottom: 8, color: '#ccc' },
  sugg: {
    background: 'rgba(255,255,255,0.04)',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
  suggMeta: { fontSize: 13, margin: '0 0 8px', color: '#aaa' },
  prevRow: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  thumb: { width: 68, height: 68, objectFit: 'cover', borderRadius: 8, flexShrink: 0 },
  thumbPlaceholder: { width: 68, height: 68, background: '#2a2a3a', borderRadius: 8, flexShrink: 0 },
  feedRow: { display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' },
  pill: {
    padding: '8px 14px',
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.05)',
    cursor: 'pointer',
    fontSize: 13,
    color: '#ccc',
  },
  pillOn: { borderColor: '#818cf8', background: 'rgba(99,102,241,0.2)', color: '#fff' },
  btnDeleteReq: {
    background: 'rgba(239,68,68,0.12)',
    border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: 8,
    padding: '6px 10px',
    cursor: 'pointer',
    fontSize: 14,
    color: '#f87171',
    flexShrink: 0,
  },
  btnDeleteSugg: {
    padding: '8px 14px',
    background: 'rgba(239,68,68,0.12)',
    border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 13,
    color: '#f87171',
  },
}

export default OutfitHub
