import { App, Button } from 'antd'
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { COLORS } from '../theme'

/**
 * 💳 Ücret Tarifesi — Büşra'nın pazarlık konusu etmediği davranış koşulları.
 * Durum tek bir paylaşılan dokümanda: loveStreak/tariff (Trip Modu ile aynı desen,
 * mevcut loveStreak/{docId} kuralı auth'a izin verir).
 * Aktifken Kamuran uygulamayı her açtığında tam ekran görür; sadece Büşra kapatabilir.
 */

interface TariffState {
  active?: boolean
  setAt?: number
}

const TARIFF_REF = () => doc(db, 'loveStreak', 'tariff')

const ITEMS = [
  'İnsan gibi davranmak',
  'Değersizleştirmemek',
  'Kadın-erkek ilişkisini anlamak',
  'Ezikletmemek, küçümsememek',
  'Saygısızlık etmemek',
  'Sözünü tutmak',
  'Tutarlı davranmak',
  'Olmadığı biri gibi görünmemek',
  'İlgisinin dışarıda olmaması',
  'Yanlış anlaşılacak davranışlara yer vermemek',
]

const RelationshipTariff: React.FC = () => {
  const { user, isAdmin } = useAuth()
  const { message } = App.useApp()
  const [tariff, setTariff] = useState<TariffState | null>(null)
  const [busy, setBusy] = useState(false)
  const [minimized, setMinimized] = useState(false)

  useEffect(() => {
    if (!user) return
    return onSnapshot(TARIFF_REF(), (snap) => setTariff((snap.data() as TariffState) ?? {}))
  }, [user])

  // Tarife kapanınca (Büşra kapatınca) küçültme durumunu sıfırla
  useEffect(() => {
    if (tariff?.active !== true) setMinimized(false)
  }, [tariff?.active])

  if (!user || !tariff) return null
  const active = tariff.active === true

  const activateTariff = async () => {
    setBusy(true)
    try {
      await setDoc(TARIFF_REF(), { active: true, setAt: Date.now() }, { merge: true })
      message.success('Tarife aktif edildi')
    } catch {
      message.error('Olmadı, tekrar dene')
    } finally {
      setBusy(false)
    }
  }

  const deactivateTariff = async () => {
    setBusy(true)
    try {
      await updateDoc(TARIFF_REF(), { active: false })
      message.success('Tarife kapatıldı')
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
        <button
          type="button"
          style={styles.fab}
          onClick={activateTariff}
          title="Ücret tarifesini göster"
          disabled={busy}
        >
          💳
        </button>
      )
    }
    return (
      <button
        type="button"
        style={styles.fabActive}
        onClick={deactivateTariff}
        title="Tarifeyi kapat"
        disabled={busy}
      >
        💳 Tarifeyi kapat
      </button>
    )
  }

  // ===== KAMURAN (non-admin) =====
  if (!active) return null

  // Küçültülmüşse: sadece küçük bir hatırlatma balonu (uygulamayı kullanabilsin)
  if (minimized) {
    return (
      <button type="button" style={styles.pill} onClick={() => setMinimized(false)}>
        💳 Ücret Tarifesi
      </button>
    )
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <div style={{ fontSize: 34 }}>💳</div>
        <div style={styles.title}>Ücret Tarifesi</div>
        <div style={styles.sub}>Bu ilişkinin bedeli, pazarlık konusu değil:</div>
        <div style={styles.list}>
          {ITEMS.map((item, i) => (
            <div key={i} style={styles.row}>
              <span style={styles.rowIcon}>💰</span>
              <span style={styles.rowText}>{item}</span>
            </div>
          ))}
        </div>
        <Button type="primary" block style={{ marginTop: 16 }} onClick={() => setMinimized(true)}>
          Anladım
        </Button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  fab: {
    position: 'fixed',
    right: 16,
    bottom: 'calc(84px + env(safe-area-inset-bottom))',
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(124,140,255,0.18)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.4)',
    fontSize: 20,
    cursor: 'pointer',
    zIndex: 90,
  },
  fabActive: {
    position: 'fixed',
    right: 16,
    bottom: 'calc(84px + env(safe-area-inset-bottom))',
    padding: '10px 14px',
    borderRadius: 999,
    border: '1px solid rgba(124,140,255,0.4)',
    background: 'rgba(124,140,255,0.18)',
    color: COLORS.text,
    fontWeight: 600,
    fontSize: 13,
    cursor: 'pointer',
    boxShadow: '0 6px 18px rgba(0,0,0,0.4)',
    zIndex: 90,
  },
  pill: {
    position: 'fixed',
    top: 'calc(env(safe-area-inset-top,0px) + 66px)',
    left: 12,
    right: 12,
    margin: '0 auto',
    maxWidth: 420,
    zIndex: 4500,
    padding: '10px 14px',
    borderRadius: 999,
    border: '1px solid rgba(124,140,255,0.4)',
    background: 'rgba(124,140,255,0.18)',
    color: COLORS.text,
    fontWeight: 600,
    fontSize: 13,
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
  },
  wrap: {
    position: 'fixed',
    inset: 0,
    zIndex: 4500,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 'calc(env(safe-area-inset-top,0px) + 60px) 16px 16px',
    background: 'rgba(10,10,16,0.82)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    overflowY: 'auto',
  },
  card: {
    position: 'relative',
    width: '100%',
    maxWidth: 420,
    background: COLORS.bgCard,
    border: '1px solid rgba(124,140,255,0.35)',
    borderRadius: 20,
    padding: 20,
    textAlign: 'center',
    boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
  },
  title: { fontSize: 20, fontWeight: 700, color: COLORS.text, marginTop: 6 },
  sub: { color: COLORS.textSecondary, fontSize: 13, marginTop: 6, marginBottom: 4 },
  list: { display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10, textAlign: 'left' },
  row: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    padding: '8px 10px',
    borderRadius: 10,
    background: 'rgba(255,255,255,0.04)',
  },
  rowIcon: { fontSize: 14, flexShrink: 0, marginTop: 1 },
  rowText: { fontSize: 13, color: COLORS.text, fontWeight: 500, lineHeight: 1.4 },
}

export default RelationshipTariff
