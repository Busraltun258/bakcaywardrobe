import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { ClothingItem, OutfitRequest, OutfitSuggestion, UserProfile } from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'
import { db } from '../firebase'

const MySuggestions: React.FC = () => {
  const { user } = useAuth()
  const [suggestions, setSuggestions] = useState<OutfitSuggestion[]>([])
  const [profiles, setProfiles] = useState<UserProfile[]>([])
  const [reqCache, setReqCache] = useState<Record<string, OutfitRequest>>({})
  const [clothesCache, setClothesCache] = useState<Record<string, ClothingItem>>({})

  useEffect(() => {
    if (!user) return
    const q = query(collection(db, 'outfitSuggestions'), where('advisorUid', '==', user.uid))
    return onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() } as OutfitSuggestion))
      list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
      setSuggestions(list)
    })
  }, [user])

  useEffect(() => {
    if (!user) return
    return onSnapshot(collection(db, 'profiles'), (snap) => {
      setProfiles(snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserProfile)))
    })
  }, [user])

  const profileName = (uid: string) =>
    profiles.find((p) => p.id === uid)?.displayName ??
    profiles.find((p) => p.id === uid)?.username ??
    uid.slice(0, 6)

  const loadRequest = async (requestId: string) => {
    if (reqCache[requestId]) return
    const s = await getDoc(doc(db, 'outfitRequests', requestId))
    if (!s.exists()) return
    setReqCache((prev) => ({ ...prev, [requestId]: ({ id: s.id, ...s.data() } as OutfitRequest) }))
  }

  const loadClothes = async (ids: string[]) => {
    const need = ids.filter((id) => !clothesCache[id])
    if (!need.length) return
    const entries = await Promise.all(
      need.map(async (id) => {
        const s = await getDoc(doc(db, 'clothes', id))
        if (!s.exists()) return null
        return { id: s.id, ...s.data() } as ClothingItem
      })
    )
    setClothesCache((prev) => {
      const next = { ...prev }
      entries.forEach((c) => {
        if (c) next[c.id] = c
      })
      return next
    })
  }

  useEffect(() => {
    // yeni gelen suggestions için request ve kıyafetleri arka planda yükle
    suggestions.forEach((s) => {
      loadRequest(s.requestId)
      loadClothes(s.clothingItemIds ?? [])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestions.map((s) => s.id).join('|')])

  const rows = useMemo(() => {
    return suggestions.map((s) => {
      const r = reqCache[s.requestId]
      return { s, r }
    })
  }, [suggestions, reqCache])

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.wrap}>
        <h2 style={styles.h2}>Önerilerim (Yorumlar)</h2>
        <p style={styles.sub}>Kamuran’ın beğeni/yorumu geldiyse burada görürsün.</p>

        {rows.length === 0 ? (
          <div style={styles.card}>
            <p style={styles.muted}>Henüz öneri yok.</p>
            <Link to="/kombin" style={styles.link}>Kombin isteklerine git →</Link>
          </div>
        ) : (
          rows.map(({ s, r }) => {
            const who = r ? profileName(r.fromUid) : '...'
            const likedLabel =
              s.liked === 'yes' ? '👍 Beğendi' : s.liked === 'no' ? '👎 Beğenmedi' : '⏳ Geri bildirim yok'
            const feedbackTime =
              s.feedbackAt ? new Date(s.feedbackAt).toLocaleString('tr-TR') : null

            return (
              <div key={s.id} style={styles.card}>
                <p style={styles.meta}>
                  <strong>{who}</strong> için öneri · {likedLabel}
                </p>

                <div style={styles.prevRow}>
                  {(s.clothingItemIds ?? []).map((id) => {
                    const c = clothesCache[id]
                    return c ? (
                      <img key={id} src={clothingItemImageSrc(c)} alt="" style={styles.thumb} />
                    ) : (
                      <div key={id} style={styles.thumbPh} />
                    )
                  })}
                </div>

                {s.comment ? (
                  <p style={styles.comment}>
                    <strong>Yorum:</strong> {s.comment}
                  </p>
                ) : null}

                {feedbackTime ? <p style={styles.time}>🕒 {feedbackTime}</p> : null}

                {r ? (
                  <p style={styles.smallMuted}>
                    İstek notu: {r.note ? `“${r.note}”` : 'yok'}
                  </p>
                ) : (
                  <p style={styles.smallMuted}>İstek yükleniyor…</p>
                )}
              </div>
            )
          })
        )}
      </div>
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
  meta: { margin: '0 0 10px', fontSize: 14, color: '#111' },
  muted: { color: '#999', fontSize: 14, margin: 0 },
  smallMuted: { color: '#777', fontSize: 12, margin: '10px 0 0' },
  link: { color: '#4f46e5', fontWeight: 600, textDecoration: 'none' },
  prevRow: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  thumb: { width: 72, height: 72, objectFit: 'cover', borderRadius: 8 },
  thumbPh: { width: 72, height: 72, background: '#e5e7eb', borderRadius: 8 },
  comment: { margin: '10px 0 0', fontSize: 14, color: '#333' },
  time: { margin: '6px 0 0', fontSize: 12, color: '#666' },
}

export default MySuggestions
