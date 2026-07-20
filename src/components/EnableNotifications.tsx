import { BellOutlined, CloseOutlined } from '@ant-design/icons'
import { App, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { enableNotifications } from '../hooks/useNotifications'
import { COLORS } from '../theme'

/**
 * "Bildirimleri Aç" şeridi.
 *
 * iOS'ta push bildirim yalnızca:
 *  - Uygulama ana ekrana eklenmiş (standalone) çalışıyorsa VE
 *  - İzin bir kullanıcı dokunuşuyla verildiyse çalışır.
 * Bu şerit, izin verilene kadar üstte görünür; iOS Safari sekmesindeyse önce
 * "ana ekrana ekle" yönlendirmesi gösterir.
 */
const isIOS = () => /iphone|ipad|ipod/i.test(window.navigator.userAgent)
const isStandalone = () =>
  window.matchMedia?.('(display-mode: standalone)').matches ||
  // iOS Safari'ye özel bayrak
  (window.navigator as unknown as { standalone?: boolean }).standalone === true

const EnableNotifications: React.FC = () => {
  const { user } = useAuth()
  const { message } = App.useApp()
  const [perm, setPerm] = useState<NotificationPermission | 'unsupported'>('default')
  const [busy, setBusy] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      setPerm('unsupported')
      return
    }
    setPerm(Notification.permission)
  }, [])

  if (!user || dismissed) return null
  if (perm === 'unsupported' || perm === 'granted' || perm === 'denied') {
    // granted: gerek yok. denied: tarayıcı ayarından açması gerek, şerit nag yapmasın.
    return null
  }

  const iosNeedsInstall = isIOS() && !isStandalone()

  const handleEnable = async () => {
    if (!user) return
    setBusy(true)
    try {
      const res = await enableNotifications(user.uid)
      setPerm(Notification.permission)
      if (res === 'granted') {
        message.success('Bildirimler açıldı 🔔')
        setDismissed(true)
      } else if (res === 'denied') {
        message.warning('İzin verilmedi. Ayarlar’dan bildirimlere izin verebilirsin.')
      } else {
        message.info('Bu cihaz/tarayıcı bildirimleri desteklemiyor.')
      }
    } catch (e) {
      console.error(e)
      message.error('Bildirimler açılamadı, tekrar dene.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.iconWrap}>
        <BellOutlined />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={styles.title}>Bildirimleri aç</div>
        <div style={styles.sub}>
          {iosNeedsInstall
            ? 'iPhone’da bildirim için: Safari’de Paylaş → “Ana Ekrana Ekle”, sonra ana ekrandaki Bakçay simgesinden aç.'
            : 'Kombin isteği ve öneri geldiğinde telefonuna haber gelsin.'}
        </div>
      </div>
      {!iosNeedsInstall && (
        <Button type="primary" size="small" loading={busy} onClick={handleEnable}>
          Aç
        </Button>
      )}
      <button
        type="button"
        onClick={() => setDismissed(true)}
        style={styles.close}
        aria-label="Kapat"
      >
        <CloseOutlined />
      </button>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    maxWidth: 1080,
    margin: '10px auto 0',
    padding: '10px 14px',
    borderRadius: 12,
    background: 'linear-gradient(135deg, rgba(124,140,255,0.12), rgba(192,132,252,0.12))',
    border: `1px solid rgba(124,140,255,0.28)`,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: COLORS.gradient,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    flexShrink: 0,
  },
  title: { fontSize: 14, fontWeight: 700, color: COLORS.text },
  sub: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.4, marginTop: 1 },
  close: {
    border: 'none',
    background: 'transparent',
    color: COLORS.textMuted,
    cursor: 'pointer',
    fontSize: 13,
    padding: 4,
    flexShrink: 0,
  },
}

export default EnableNotifications
