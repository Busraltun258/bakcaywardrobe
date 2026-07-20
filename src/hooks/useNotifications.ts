import { arrayUnion, doc, setDoc } from 'firebase/firestore'
import { getToken, onMessage } from 'firebase/messaging'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { db, messagingPromise } from '../firebase'

// Firebase Console → Project Settings → Cloud Messaging → "Web configuration"
// Web Push certificates → "Current pair" public key (20 Tem 2026)
const VAPID_KEY =
  'BIb3fkM-0H_rqXG0EvhCxJlyOJqiihq_DOD0zBbZUgwGBkNlnRyjw6uJsyKImO_0H_ZSIJsddZVFgAmS_VPQE-g'

// Token gerçekten alınıp profile yazıldığında set edilir. Banner'ın gizlenip
// gizlenmeyeceğine bu belirler — izin "granted" olsa bile token yoksa banner kalır.
const PUSH_OK_KEY = 'bk_push_ok'

export type EnableResult =
  | { status: 'granted' }
  | { status: 'denied' }
  | { status: 'unsupported' }
  | { status: 'error'; message: string }

interface SetupResult {
  ok: boolean
  unsub: (() => void) | null
  error?: string
}

/** Bu cihazda daha önce token başarıyla alınmış mı? (banner görünürlüğü için) */
export function isPushRegistered(): boolean {
  try {
    return localStorage.getItem(PUSH_OK_KEY) === '1'
  } catch {
    return false
  }
}

export function useNotifications() {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return
    if (typeof window === 'undefined') return
    if (!('Notification' in window) || !('serviceWorker' in navigator)) return

    // iOS/Safari izni SADECE kullanıcı dokunuşuyla verilebilir. Mount'ta otomatik izin
    // İSTEMİYORUZ; sadece izin zaten verilmişse token'ı kurup tazeliyoruz (bu hesap için).
    if (Notification.permission !== 'granted') return

    let unsub: (() => void) | null = null
    setup(user.uid).then((res) => {
      unsub = res.unsub
    })
    return () => {
      if (unsub) unsub()
    }
  }, [user?.uid])
}

/**
 * Bildirim iznini KULLANICI DOKUNUŞUYLA ister ve token'ı kaydeder.
 * iOS'ta izin isteme mutlaka bir tıklama/dokunma içinde yapılmalı.
 * Token gerçekten alınmazsa 'error' döner (böylece kullanıcıya doğru mesaj gösterilir).
 */
export async function enableNotifications(uid: string): Promise<EnableResult> {
  if (typeof window === 'undefined') return { status: 'unsupported' }
  if (!('Notification' in window) || !('serviceWorker' in navigator)) {
    return { status: 'unsupported' }
  }
  // İlk iş: izni iste (senkron gesture bağlamında kalmalı — öncesinde await olmamalı).
  let permission = Notification.permission
  if (permission !== 'granted') {
    permission = await Notification.requestPermission()
  }
  if (permission !== 'granted') return { status: 'denied' }

  const res = await setup(uid)
  if (res.ok) return { status: 'granted' }
  return { status: 'error', message: res.error ?? 'Token alınamadı.' }
}

async function setup(uid: string): Promise<SetupResult> {
  try {
    const messaging = await messagingPromise
    if (!messaging) {
      return { ok: false, unsub: null, error: 'Bu ortamda mesajlaşma desteklenmiyor.' }
    }
    if (Notification.permission !== 'granted') {
      return { ok: false, unsub: null, error: 'İzin verilmedi.' }
    }

    let swReg: ServiceWorkerRegistration
    try {
      swReg = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
        scope: '/firebase-cloud-messaging-push-scope',
      })
      await navigator.serviceWorker.ready
    } catch (e) {
      console.error('[bk-notif] Service worker kaydı başarısız:', e)
      return { ok: false, unsub: null, error: 'Service worker kaydedilemedi.' }
    }

    let token: string
    try {
      token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: swReg,
      })
    } catch (e) {
      console.error('[bk-notif] getToken hatası:', e)
      return {
        ok: false,
        unsub: null,
        error: (e as Error)?.message ?? 'Token alınamadı.',
      }
    }
    if (!token) {
      return { ok: false, unsub: null, error: 'Token boş döndü.' }
    }

    // Çoklu-cihaz: token'ı array'e ekle (arrayUnion duplicate eklemez).
    await setDoc(
      doc(db, 'profiles', uid),
      {
        fcmToken: token,
        fcmTokens: arrayUnion(token),
        fcmTokenUpdatedAt: Date.now(),
      },
      { merge: true },
    )

    try {
      localStorage.setItem('bk_fcm_token', token)
      localStorage.setItem(PUSH_OK_KEY, '1')
    } catch {}

    // Uygulama açıkken gelen bildirimler için handler
    const unsub = onMessage(messaging, (payload) => {
      const title = payload.notification?.title ?? 'Bakçay'
      const body = payload.notification?.body ?? ''
      try {
        const notif = new Notification(title, {
          body,
          icon: '/icon-192.png',
          badge: '/icon-192.png',
          tag: 'bk-notif',
        })
        notif.onclick = () => {
          window.focus()
          const link = payload.fcmOptions?.link
          if (link) window.location.href = link
          notif.close()
        }
      } catch (e) {
        console.error('[bk-notif] Foreground notification gösterilemedi:', e)
      }
    })

    return { ok: true, unsub }
  } catch (e) {
    console.error('[bk-notif] Setup hatası:', e)
    return { ok: false, unsub: null, error: (e as Error)?.message ?? 'Kurulum hatası.' }
  }
}
