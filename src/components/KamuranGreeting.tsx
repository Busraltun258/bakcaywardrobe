import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { UserProfile } from '../types'

/**
 * Kamuran için minimal, sıcak karşılama.
 * Username eşleşirse her oturumda 1 kez sade bir banner + birkaç süzülen kalp.
 * Username'i güncellemek için:
 */
const KAMURAN_USERNAME = 'kamuran'

const HEART_COUNT = 10
const TOTAL_DURATION = 4200 // ms

const KamuranGreeting: React.FC = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!user) return
    let cancelled = false
    ;(async () => {
      try {
        const snap = await getDoc(doc(db, 'profiles', user.uid))
        if (!cancelled && snap.exists()) {
          setProfile({ id: snap.id, ...snap.data() } as UserProfile)
        }
      } catch (e) {
        console.error('KamuranGreeting profile error:', e)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [user])

  useEffect(() => {
    if (!profile) return
    const isKamuran =
      (profile.username ?? '').toLowerCase() === KAMURAN_USERNAME.toLowerCase()
    if (!isKamuran) return
    try {
      if (sessionStorage.getItem('bk_kamuran_greeted') === '1') return
      sessionStorage.setItem('bk_kamuran_greeted', '1')
    } catch {}
    setShow(true)
    const t = setTimeout(() => setShow(false), TOTAL_DURATION)
    return () => clearTimeout(t)
  }, [profile])

  const hearts = useMemo(
    () =>
      Array.from({ length: HEART_COUNT }).map((_, i) => ({
        id: i,
        left: 15 + Math.random() * 70,
        delay: 0.2 + i * 0.25 + Math.random() * 0.3,
        duration: 3.4 + Math.random() * 1.2,
        size: 14 + Math.random() * 10,
        drift: -10 + Math.random() * 20,
      })),
    [],
  )

  if (!show) return null

  return createPortal(
    <div style={styles.overlay} aria-hidden>
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            position: 'absolute',
            bottom: -20,
            left: `${h.left}%`,
            fontSize: h.size,
            opacity: 0,
            animation: `bk-heart-float ${h.duration}s ease-out ${h.delay}s forwards`,
            // CSS değişkeni — keyframes içinde sürüklenme için kullanılır
            ['--bk-drift' as any]: `${h.drift}vw`,
          }}
        >
          🤍
        </span>
      ))}

      <div style={styles.banner}>
        <span style={styles.bannerHeart}>💗</span>
        <span style={styles.bannerText}>Hoş geldin</span>
      </div>

      <style>{`
        @keyframes bk-heart-float {
          0%   { transform: translate(0, 0) scale(0.7); opacity: 0; }
          15%  { opacity: 0.85; }
          100% { transform: translate(var(--bk-drift), -100vh) scale(1); opacity: 0; }
        }
        @keyframes bk-banner-soft-in {
          0%   { transform: translate(-50%, -10px); opacity: 0; }
          20%  { transform: translate(-50%, 0);     opacity: 1; }
          80%  { transform: translate(-50%, 0);     opacity: 1; }
          100% { transform: translate(-50%, -8px);  opacity: 0; }
        }
      `}</style>
    </div>,
    document.body,
  )
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed' as const,
    inset: 0,
    pointerEvents: 'none' as const,
    overflow: 'hidden' as const,
    zIndex: 3000,
  },
  banner: {
    position: 'fixed' as const,
    top: 22,
    left: '50%',
    transform: 'translate(-50%, -10px)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: 'rgba(20, 18, 30, 0.78)',
    color: '#fff',
    padding: '9px 18px',
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    opacity: 0,
    animation: 'bk-banner-soft-in 4s ease-in-out 0.2s forwards',
  },
  bannerHeart: {
    fontSize: 14,
    filter: 'drop-shadow(0 0 6px rgba(244,114,182,0.5))',
  },
  bannerText: {
    fontSize: 13.5,
    fontWeight: 500,
    letterSpacing: '0.1px',
  },
}

export default KamuranGreeting
