import { collection, deleteDoc, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { ClothingItem, OutfitRequest, OutfitSuggestion, UserProfile } from '../types'
import { clothingItemImageSrc } from '../utils/imageUtils'

const AdminHome: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [suggestions, setSuggestions] = useState<OutfitSuggestion[]>([])
  const [profiles, setProfiles] = useState<UserProfile[]>([])
  const [reqCache, setReqCache] = useState<Record<string, OutfitRequest>>({})
  const [clothesCache, setClothesCache] = useState<Record<string, ClothingItem>>({})
  const [pendingRequests, setPendingRequests] = useState<OutfitRequest[]>([])

  // Gelen bekleyen talepleri dinle (admin tüm pending istekleri görür)
  useEffect(() => {
    if (!user) return
    const q = query(
      collection(db, 'outfitRequests'),
      where('status', '==', 'pending')
    )
    return onSnapshot(q, (snap) => {
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as OutfitRequest))
      list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
      setPendingRequests(list)
    })
  }, [user])

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
    setReqCache((prev) => ({ ...prev, [requestId]: { id: s.id, ...s.data() } as OutfitRequest }))
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

  const stats = useMemo(() => {
    const total = suggestions.length
    const liked = suggestions.filter((s) => s.liked === 'yes').length
    const disliked = suggestions.filter((s) => s.liked === 'no').length
    const waiting = suggestions.filter((s) => s.liked === null || s.liked === undefined).length
    return { total, liked, disliked, waiting }
  }, [suggestions])

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.wrap}>
        <h2 style={styles.h2}>🎨 Önerdiğim Kombinler</h2>
        <p style={styles.sub}>Kullanıcılara önerdiğin kombinlerin ve geri bildirimleri burada.</p>

        {/* İstatistikler */}
        <div style={styles.statsRow}>
          <div style={{ ...styles.statCard, borderLeft: '4px solid #4f46e5' }}>
            <span style={styles.statNum}>{stats.total}</span>
            <span style={styles.statLabel}>Toplam</span>
          </div>
          <div style={{ ...styles.statCard, borderLeft: '4px solid #22c55e' }}>
            <span style={styles.statNum}>{stats.liked}</span>
            <span style={styles.statLabel}>👍 Beğenildi</span>
          </div>
          <div style={{ ...styles.statCard, borderLeft: '4px solid #ef4444' }}>
            <span style={styles.statNum}>{stats.disliked}</span>
            <span style={styles.statLabel}>👎 Beğenilmedi</span>
          </div>
          <div style={{ ...styles.statCard, borderLeft: '4px solid #f59e0b' }}>
            <span style={styles.statNum}>{stats.waiting}</span>
            <span style={styles.statLabel}>⏳ Bekliyor</span>
          </div>
        </div>

        {/* Gelen talepler */}
        <h3 style={{ fontSize: 18, margin: '0 0 10px', color: '#e2e2e2' }}>📬 Gelen Talepler</h3>
        {pendingRequests.length === 0 ? (
          <div style={styles.card}>
            <p style={styles.muted}>Bekleyen talep yok.</p>
          </div>
        ) : (
          pendingRequests.map((r) => {
            const who = profileName(r.fromUid)
            const time = new Date(r.createdAt).toLocaleString('tr-TR')
            return (
              <div key={r.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <p style={styles.meta}>
                    <strong>{who}</strong> kombin önerisi istiyor
                  </p>
                  <span style={{ ...styles.badge, backgroundColor: '#f59e0b' }}>⏳ Bekliyor</span>
                </div>
                <p style={styles.time}>📅 {time}</p>
                {r.note ? <p style={{ fontSize: 14, color: '#ccc', margin: '6px 0 0' }}><strong>Not:</strong> {r.note}</p> : null}
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <button
                    type="button"
                    onClick={() => navigate(`/kombin/yanit/${r.id}`)}
                    style={styles.respondBtn}
                  >
                    👗 Öneri Hazırla
                  </button>
                  <button
                    type="button"
                    style={styles.btnDeleteReq}
                    onClick={async () => {
                      if (!confirm('Bu talebi silmek istediğine emin misin?')) return
                      try {
                        await deleteDoc(doc(db, 'outfitRequests', r.id))
                      } catch (e) {
                        console.error(e)
                        alert('Silinemedi.')
                      }
                    }}
                  >
                    🗑️ Talebi Sil
                  </button>
                </div>
              </div>
            )
          })
        )}

        {/* Öneri listesi */}
        <h3 style={{ fontSize: 18, margin: '20px 0 10px', color: '#e2e2e2' }}>🎨 Önerdiğim Kombinler</h3>
        {rows.length === 0 ? (
          <div style={styles.card}>
            <p style={styles.muted}>Henüz öneri yapmadın.</p>
          </div>
        ) : (
          rows.map(({ s, r }) => {
            const who = r ? profileName(r.fromUid) : '...'
            const likedLabel =
              s.liked === 'yes' ? '👍 Beğendi' : s.liked === 'no' ? '👎 Beğenmedi' : '⏳ Bekleniyor'
            const likedColor =
              s.liked === 'yes' ? '#22c55e' : s.liked === 'no' ? '#ef4444' : '#f59e0b'
            const feedbackTime =
              s.feedbackAt ? new Date(s.feedbackAt).toLocaleString('tr-TR') : null
            const createdTime = new Date(s.createdAt).toLocaleString('tr-TR')

            return (
              <div key={s.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <p style={styles.meta}>
                    <strong>{who}</strong> için öneri
                  </p>
                  <span style={{ ...styles.badge, backgroundColor: likedColor }}>{likedLabel}</span>
                </div>

                <p style={styles.time}>📅 {createdTime}</p>

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

                {s.advisorNote ? (
                  <p style={styles.comment}>
                    <strong>Notun:</strong> {s.advisorNote}
                  </p>
                ) : null}

                {s.comment ? (
                  <p style={styles.comment}>
                    <strong>Kullanıcı yorumu:</strong> {s.comment}
                  </p>
                ) : null}

                {feedbackTime ? <p style={styles.time}>🕒 Geri bildirim: {feedbackTime}</p> : null}

                {r ? (
                  <p style={styles.smallMuted}>
                    İstek notu: {r.note ? `"${r.note}"` : 'yok'}
                  </p>
                ) : (
                  <p style={styles.smallMuted}>İstek yükleniyor…</p>
                )}
                <button
                  type="button"
                  style={styles.btnDeleteSugg}
                  onClick={async () => {
                    if (!confirm('Bu kombin önerisini silmek istediğine emin misin?')) return
                    try {
                      await deleteDoc(doc(db, 'outfitSuggestions', s.id))
                    } catch (e) {
                      console.error(e)
                      alert('Silinemedi.')
                    }
                  }}
                >
                  🗑️ Öneriyi Sil
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0f0f14' },
  wrap: { maxWidth: 700, margin: '0 auto', padding: 16 },
  h2: { margin: '8px 0 4px', fontSize: 26, color: '#fff' },
  sub: { color: '#888', fontSize: 14, marginBottom: 16 },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    background: '#1a1a24',
    borderRadius: 12,
    padding: '14px 16px',
    border: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  statNum: { fontSize: 28, fontWeight: 700, color: '#fff' },
  statLabel: { fontSize: 13, color: '#888' },
  card: {
    background: '#1a1a24',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    border: '1px solid rgba(255,255,255,0.06)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  meta: { margin: 0, fontSize: 15, color: '#e2e2e2' },
  badge: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: 20,
  },
  muted: { color: '#666', fontSize: 14, margin: 0 },
  smallMuted: { color: '#555', fontSize: 12, margin: '10px 0 0' },
  prevRow: { display: 'flex', gap: 6, flexWrap: 'wrap', margin: '10px 0' },
  thumb: { width: 80, height: 80, objectFit: 'cover', borderRadius: 10 },
  thumbPh: { width: 80, height: 80, background: '#2a2a3a', borderRadius: 10 },
  comment: { margin: '8px 0 0', fontSize: 14, color: '#ccc' },
  time: { margin: '4px 0 0', fontSize: 12, color: '#666' },
  respondBtn: {
    marginTop: 10,
    padding: '10px 18px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 14,
  },
  btnDeleteReq: {
    padding: '10px 18px',
    background: 'rgba(239,68,68,0.12)',
    border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: 10,
    cursor: 'pointer',
    fontSize: 14,
    color: '#f87171',
  },
  btnDeleteSugg: {
    marginTop: 10,
    padding: '8px 14px',
    background: 'rgba(239,68,68,0.12)',
    border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 13,
    color: '#f87171',
    width: '100%',
  },
}

export default AdminHome
