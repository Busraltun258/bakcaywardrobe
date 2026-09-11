import { HeartFilled, SmileOutlined } from '@ant-design/icons'
import { App, Button, Input, Modal } from 'antd'
import { arrayUnion, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { COLORS } from '../theme'

/**
 * 💢 Trip Modu — Büşra (admin) trip attığında Kamuran'a "gönlünü al" akışı.
 * Durum tek bir paylaşılan dokümanda: loveStreak/tripMode (mevcut kural auth'a izin verir).
 */

interface Gesture {
  type: string
  emoji: string
  label: string
  text?: string
  at: number
}
interface TripState {
  active?: boolean
  startedAt?: number
  note?: string
  gestures?: Gesture[]
  resolvedAt?: number | null
}

const TRIP_REF = () => doc(db, 'loveStreak', 'tripMode')

const GESTURES = [
  { type: 'kahve', emoji: '☕', label: 'Kahve ısmarlıyorum' },
  { type: 'cicek', emoji: '🌸', label: 'Çiçek alıyorum' },
  { type: 'film', emoji: '🎬', label: 'Film gecesi sözü' },
  { type: 'sarilma', emoji: '🫂', label: 'Sıkı sarılma' },
  { type: 'yemek', emoji: '🍽️', label: 'Yemeğe çıkaracağım' },
  { type: 'tatli', emoji: '🍰', label: 'Tatlı getiriyorum' },
]

const TripMode: React.FC = () => {
  const { user, isAdmin } = useAuth()
  const { message } = App.useApp()
  const [trip, setTrip] = useState<TripState | null>(null)
  const [note, setNote] = useState('')
  const [kamMsg, setKamMsg] = useState('')
  const [askOpen, setAskOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [minimized, setMinimized] = useState(false)

  useEffect(() => {
    if (!user) return
    return onSnapshot(TRIP_REF(), (snap) => setTrip((snap.data() as TripState) ?? {}))
  }, [user])

  // Trip kapanınca (Büşra barışınca) küçültme durumunu sıfırla
  useEffect(() => {
    if (trip?.active !== true) setMinimized(false)
  }, [trip?.active])

  if (!user || !trip) return null
  const active = trip.active === true

  // --- Büşra (admin) ---
  const startTrip = async () => {
    setBusy(true)
    try {
      await setDoc(
        TRIP_REF(),
        {
          active: true,
          startedAt: Date.now(),
          note: note.trim(),
          gestures: [],
          resolvedAt: null,
        },
        { merge: true },
      )
      setAskOpen(false)
      setNote('')
      message.success('Trip modu açıldı 😤 Kamuran’a haber gitti')
    } catch {
      message.error('Olmadı, tekrar dene')
    } finally {
      setBusy(false)
    }
  }

  const makeUp = async () => {
    setBusy(true)
    try {
      await updateDoc(TRIP_REF(), { active: false, resolvedAt: Date.now() })
      message.success('Barıştınız 💛')
    } catch {
      message.error('Olmadı')
    } finally {
      setBusy(false)
    }
  }

  const sendGesture = async (g: (typeof GESTURES)[number], text?: string) => {
    setBusy(true)
    try {
      const gesture: Gesture = { type: g.type, emoji: g.emoji, label: g.label, text: text ?? '', at: Date.now() }
      await updateDoc(TRIP_REF(), { gestures: arrayUnion(gesture) })
      setKamMsg('')
      message.success('Gönderildi 💌')
    } catch {
      message.error('Olmadı')
    } finally {
      setBusy(false)
    }
  }

  // ===== ADMIN (Büşra) =====
  if (isAdmin) {
    if (!active) {
      return (
        <>
          <button type="button" style={styles.fab} onClick={() => setAskOpen(true)} title="Trip moduna geç">
            😤
          </button>
          <Modal
            open={askOpen}
            onCancel={() => setAskOpen(false)}
            onOk={startTrip}
            okText="Trip moduna geç 😤"
            cancelText="Vazgeç"
            confirmLoading={busy}
            centered
            title="Trip Modu"
          >
            <p style={{ color: COLORS.textSecondary, marginTop: 0 }}>
              Kamuran’a “gönlünü al” bildirimi gidecek. İstersen bir not bırak:
            </p>
            <Input.TextArea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="örn: bugün beni hiç aramadın 😔"
              rows={2}
              maxLength={140}
            />
          </Modal>
        </>
      )
    }
    // aktif → jestleri gör + barış
    const gestures = trip.gestures ?? []
    return (
      <div style={styles.adminCard}>
        <div style={styles.adminHead}>
          <span style={{ fontWeight: 700, color: COLORS.text }}>😤 Trip modu açık</span>
          <Button size="small" type="primary" icon={<HeartFilled />} onClick={makeUp} loading={busy}>
            Barıştık
          </Button>
        </div>
        {gestures.length === 0 ? (
          <div style={{ fontSize: 12, color: COLORS.textMuted }}>Kamuran henüz bir şey yapmadı 👀</div>
        ) : (
          <div style={styles.gestureList}>
            {gestures.map((g, i) => (
              <div key={i} style={styles.gestureRow}>
                <span style={{ fontSize: 16 }}>{g.emoji}</span>
                <span style={{ color: COLORS.text, fontSize: 13 }}>
                  {g.label}
                  {g.text ? <span style={{ color: COLORS.textSecondary }}> — “{g.text}”</span> : null}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ===== KAMURAN (non-admin) =====
  if (!active) return null

  // Küçültülmüşse: sadece küçük bir hatırlatma balonu (uygulamayı kullanabilsin)
  if (minimized) {
    return (
      <button type="button" style={styles.kamPill} onClick={() => setMinimized(false)}>
        😤 Büşra küskün — gönlünü al 🥺
      </button>
    )
  }

  return (
    <div style={styles.kamWrap}>
      <div style={styles.kamCard}>
        <button type="button" style={styles.kamClose} onClick={() => setMinimized(true)} title="Şimdilik kapat">
          ✕
        </button>
        <div style={{ fontSize: 34 }}>😤💔</div>
        <div style={styles.kamTitle}>Büşra sana trip attı</div>
        {trip.note ? <div style={styles.kamNote}>“{trip.note}”</div> : null}
        <div style={styles.kamSub}>Hadi gönlünü al 🥺</div>

        <div style={styles.gestureGrid}>
          {GESTURES.map((g) => (
            <button key={g.type} type="button" style={styles.gestureBtn} disabled={busy} onClick={() => sendGesture(g)}>
              <span style={{ fontSize: 22 }}>{g.emoji}</span>
              <span style={{ fontSize: 11, color: COLORS.textSecondary, textAlign: 'center' }}>{g.label}</span>
            </button>
          ))}
        </div>

        <Input.TextArea
          value={kamMsg}
          onChange={(e) => setKamMsg(e.target.value)}
          placeholder="Tatlı bir şeyler yaz… 💛"
          rows={2}
          style={{ marginTop: 10 }}
        />
        <Button
          type="primary"
          icon={<SmileOutlined />}
          block
          style={{ marginTop: 10 }}
          loading={busy}
          disabled={!kamMsg.trim()}
          onClick={() => sendGesture({ type: 'mesaj', emoji: '💌', label: 'Mesaj' }, kamMsg.trim())}
        >
          Gönlünü almaya çalış
        </Button>
        <p style={{ fontSize: 11, color: COLORS.textMuted, textAlign: 'center', margin: '10px 0 0' }}>
          Büşra “Barıştık” diyene kadar burada 🫶
        </p>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  fab: {
    position: 'fixed',
    left: 16,
    bottom: 'calc(84px + env(safe-area-inset-bottom))',
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(244,114,182,0.18)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.4)',
    fontSize: 22,
    cursor: 'pointer',
    zIndex: 90,
  },
  adminCard: {
    margin: '0 16px 12px',
    padding: 12,
    borderRadius: 14,
    background: 'rgba(244,114,182,0.10)',
    border: '1px solid rgba(244,114,182,0.30)',
  },
  adminHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  gestureList: { display: 'flex', flexDirection: 'column', gap: 6 },
  gestureRow: { display: 'flex', alignItems: 'center', gap: 8 },
  kamWrap: {
    position: 'fixed',
    inset: 0,
    zIndex: 4500,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 'calc(env(safe-area-inset-top,0px) + 60px) 16px 16px',
    background: 'rgba(10,10,16,0.75)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    overflowY: 'auto',
  },
  kamClose: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 30,
    height: 30,
    borderRadius: '50%',
    border: `1px solid ${COLORS.border}`,
    background: 'rgba(255,255,255,0.06)',
    color: COLORS.textSecondary,
    fontSize: 14,
    cursor: 'pointer',
  },
  kamPill: {
    position: 'fixed',
    top: 'calc(env(safe-area-inset-top,0px) + 66px)',
    left: 12,
    right: 12,
    margin: '0 auto',
    maxWidth: 420,
    zIndex: 4500,
    padding: '10px 14px',
    borderRadius: 999,
    border: '1px solid rgba(244,114,182,0.4)',
    background: 'rgba(244,114,182,0.18)',
    color: COLORS.text,
    fontWeight: 600,
    fontSize: 13,
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
  },
  kamCard: {
    position: 'relative',
    width: '100%',
    maxWidth: 420,
    background: COLORS.bgCard,
    border: '1px solid rgba(244,114,182,0.35)',
    borderRadius: 20,
    padding: 20,
    textAlign: 'center',
    boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
  },
  kamTitle: { fontSize: 20, fontWeight: 700, color: COLORS.text, marginTop: 6 },
  kamNote: {
    margin: '10px 0',
    padding: '8px 12px',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.04)',
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    fontSize: 14,
  },
  kamSub: { color: COLORS.textSecondary, fontSize: 14, marginTop: 4 },
  gestureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 8,
    marginTop: 14,
  },
  gestureBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    padding: '12px 6px',
    borderRadius: 12,
    border: `1px solid ${COLORS.border}`,
    background: 'rgba(255,255,255,0.03)',
    cursor: 'pointer',
  },
}

export default TripMode
