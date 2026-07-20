import { BellFilled } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COLORS } from '../theme'

interface ToastData {
  title: string
  body: string
  link: string
}

/**
 * Uygulama açıkken (foreground) gelen bildirimi gösteren uygulama içi şerit.
 * iOS standalone PWA'da OS bildirim banner'ı çentiğin altında kalıp görünmediği
 * için, güvenli alanı (safe-area-inset-top) hesaba katan kendi şeridimizi
 * en üstte gösteriyoruz. Tıklayınca ilgili yere gider, birkaç saniyede kaybolur.
 */
const ForegroundNotif: React.FC = () => {
  const navigate = useNavigate()
  const [toast, setToast] = useState<ToastData | null>(null)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as ToastData
      setToast(detail)
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setToast(null), 6000)
    }
    window.addEventListener('bk-foreground-notif', handler)
    return () => {
      window.removeEventListener('bk-foreground-notif', handler)
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  if (!toast) return null

  const go = () => {
    const link = toast.link
    setToast(null)
    if (link) navigate(link.startsWith('/') ? link : `/${link}`)
  }

  return (
    <button type="button" onClick={go} style={styles.wrap} className="bk-toast-in">
      <div style={styles.icon}>
        <BellFilled />
      </div>
      <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
        <div style={styles.title}>{toast.title}</div>
        {toast.body && <div style={styles.body}>{toast.body}</div>}
      </div>
    </button>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    position: 'fixed',
    top: 'calc(env(safe-area-inset-top, 0px) + 8px)',
    left: 10,
    right: 10,
    margin: '0 auto',
    maxWidth: 460,
    zIndex: 5000,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 14px',
    borderRadius: 14,
    border: `1px solid rgba(124,140,255,0.3)`,
    background: 'rgba(20, 20, 30, 0.92)',
    backdropFilter: 'saturate(180%) blur(20px)',
    WebkitBackdropFilter: 'saturate(180%) blur(20px)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    cursor: 'pointer',
    width: 'calc(100% - 20px)',
    fontFamily: 'inherit',
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: COLORS.gradient,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    flexShrink: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
    color: COLORS.text,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  body: {
    fontSize: 12.5,
    color: COLORS.textSecondary,
    lineHeight: 1.35,
    marginTop: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
}

export default ForegroundNotif
