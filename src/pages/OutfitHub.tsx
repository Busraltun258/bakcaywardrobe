import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import {
  ClothingItem,
  OutfitRequest,
  OutfitSuggestion,
  UserProfile,
} from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'
import { db } from '../firebase'

const OutfitHub: React.FC = () => {
  const { user } = useAuth()
  const [profiles, setProfiles] = useState<UserProfile[]>([])
  const [fromMe, setFromMe] = useState<OutfitRequest[]>([])
  const [toMe, setToMe] = useState<OutfitRequest[]>([])
  const [allSuggestions, setAllSuggestions] = useState<OutfitSuggestion[]>([])
  const [clothesCache, setClothesCache] = useState<Record<string, ClothingItem>>({})
  const [recipientUid, setRecipientUid] = useState('')
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
      .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
  }, [allSuggestions, requests])

  const profileName = (uid: string) =>
    profiles.find((p) => p.id === uid)?.displayName ??
    profiles.find((p) => p.id === uid)?.username ??
    uid.slice(0, 6)

  const incomingPending = useMemo(
    () => requests.filter((r) => r.toUid === user?.uid && r.status === 'pending'),
    [requests, user]
  )
  const myOutgoing = useMemo(
    () => requests.filter((r) => r.fromUid === user?.uid),
    [requests, user]
  )

  const loadClothesForSuggestion = async (ids: string[]) => {
    const need = ids.filter((id) => !clothesCache[id])
    if (!need.length) return
    const entries = await Promise.all(
      need.map(async (id) => {
        const s = await getDoc(doc(db, 'clothes', id))
        if (!s.exists) return null
        return { id: s.id, ...s.data() } as ClothingItem
      })
    )
    const next = { ...clothesCache }
    entries.forEach((c) => {
      if (c) next[c.id] = c
    })
    setClothesCache(next)
  }

  const sendRequest = async () => {
    if (!user || !recipientUid) {
      alert('Kime göndereceğini seç.')
      return
    }
    if (recipientUid === user.uid) {
      alert('Kendine istek gönderemezsin.')
      return
    }
    setSending(true)
    try {
      await addDoc(collection(db, 'outfitRequests'), {
        fromUid: user.uid,
        toUid: recipientUid,
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
    } catch (e) {
      console.error(e)
      alert('Kaydedilemedi.')
    }
  }

  const others = profiles.filter((p) => p.id !== user?.uid)

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.wrap}>
        <h2 style={styles.h2}>Kombin istekleri</h2>
        <p style={styles.sub}>
          Dolabından parça seçtirmek için birine istek at; gelen isteklerde onun dolabından kombin öner.
        </p>

        <section style={styles.card}>
          <h3 style={styles.h3}>Yeni istek (benim dolabım)</h3>
          <select
            value={recipientUid}
            onChange={(e) => setRecipientUid(e.target.value)}
            style={styles.select}
          >
            <option value="">Kime?</option>
            {others.map((p) => (
              <option key={p.id} value={p.id}>
                {p.displayName || p.username || p.email || p.id.slice(0, 8)}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Kısa not (ör. yarın akşam davet var)…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={styles.textarea}
            rows={2}
          />
          <button type="button" style={styles.btn} onClick={sendRequest} disabled={sending}>
            {sending ? 'Gönderiliyor…' : 'İstek gönder'}
          </button>
        </section>

        <section style={styles.card}>
          <h3 style={styles.h3}>Bana gelen (yanıt bekleyen)</h3>
          {incomingPending.length === 0 ? (
            <p style={styles.muted}>Bekleyen istek yok.</p>
          ) : (
            <ul style={styles.list}>
              {incomingPending.map((r) => (
                <li key={r.id} style={styles.li}>
                  <span>
                    <strong>{profileName(r.fromUid)}</strong> senin için kombin istiyor (dolap:{' '}
                    {profileName(r.wardrobeOwnerUid)}).
                  </span>
                  <Link to={`/kombin/yanit/${r.id}`} style={styles.link}>
                    Öneri hazırla →
                  </Link>
                </li>
              ))}
            </ul>
          )}
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
                  <p style={styles.reqLine}>
                    → <strong>{profileName(r.toUid)}</strong> · {r.status === 'pending' ? 'bekliyor' : 'yanıtlandı'}
                    {r.note ? ` · “${r.note}”` : ''}
                  </p>
                  {suggs.length === 0 && r.status === 'pending' ? (
                    <p style={styles.muted}>Öneri henüz yok.</p>
                  ) : null}
                  {suggs.map((s) => (
                    <SuggestionFeedback
                      key={s.id}
                      s={s}
                      itemIdsKey={[...s.clothingItemIds].sort().join('|')}
                      profileName={profileName}
                      onLoadItems={() => loadClothesForSuggestion(s.clothingItemIds)}
                      clothesCache={clothesCache}
                      onSave={saveFeedback}
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
  onLoadItems: () => void
  clothesCache: Record<string, ClothingItem>
  onSave: (s: OutfitSuggestion, liked: 'yes' | 'no' | null | undefined, comment: string) => void
}> = ({ s, itemIdsKey, profileName, onLoadItems, clothesCache, onSave }) => {
  const [comment, setComment] = useState(s.comment ?? '')
  const [liked, setLiked] = useState<'yes' | 'no' | null>(s.liked ?? null)

  useEffect(() => {
    setComment(s.comment ?? '')
    setLiked(s.liked ?? null)
  }, [s.id, s.comment, s.liked])

  useEffect(() => {
    onLoadItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- üst bileşenden gelen callback her render'da yenilenir
  }, [s.id, itemIdsKey])

  return (
    <div style={styles.sugg}>
      <p style={styles.suggMeta}>
        Öneri: <strong>{profileName(s.advisorUid)}</strong>
        {s.advisorNote ? ` · ${s.advisorNote}` : ''}
      </p>
      <div style={styles.prevRow}>
        {s.clothingItemIds.map((id) => {
          const c = clothesCache[id]
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
      <button type="button" style={styles.btnGhost} onClick={() => onSave(s, undefined, comment)}>
        Yorumu kaydet
      </button>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#f0f2f5' },
  wrap: { maxWidth: 640, margin: '0 auto', padding: 16 },
  h2: { margin: '8px 0 4px', fontSize: 24 },
  sub: { color: '#666', fontSize: 14, marginBottom: 16 },
  card: {
    background: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
  },
  h3: { margin: '0 0 12px', fontSize: 16 },
  select: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    border: '1px solid #ddd',
    marginBottom: 8,
    fontSize: 14,
  },
  textarea: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    border: '1px solid #ddd',
    marginBottom: 8,
    fontSize: 14,
    boxSizing: 'border-box',
  },
  textareaSmall: {
    width: '100%',
    padding: 8,
    borderRadius: 8,
    border: '1px solid #ddd',
    marginTop: 8,
    fontSize: 13,
    boxSizing: 'border-box',
  },
  btn: {
    padding: '12px 16px',
    background: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    fontWeight: 600,
    cursor: 'pointer',
  },
  btnGhost: {
    marginTop: 6,
    padding: '8px 12px',
    background: '#f3f4f6',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 13,
  },
  muted: { color: '#999', fontSize: 14 },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  li: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: '12px 0',
    borderBottom: '1px solid #eee',
    fontSize: 14,
  },
  link: { color: '#4f46e5', fontWeight: 600 },
  block: { marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #eee' },
  reqLine: { fontSize: 14, marginBottom: 8 },
  sugg: {
    background: '#f9fafb',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
  suggMeta: { fontSize: 13, margin: '0 0 8px', color: '#444' },
  prevRow: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  thumb: { width: 72, height: 72, objectFit: 'cover', borderRadius: 8 },
  thumbPlaceholder: { width: 72, height: 72, background: '#e5e7eb', borderRadius: 8 },
  feedRow: { display: 'flex', gap: 8, marginTop: 10 },
  pill: {
    padding: '8px 14px',
    borderRadius: 20,
    border: '1px solid #ccc',
    background: '#fff',
    cursor: 'pointer',
    fontSize: 13,
  },
  pillOn: { borderColor: '#4f46e5', background: '#eef2ff' },
}

export default OutfitHub
