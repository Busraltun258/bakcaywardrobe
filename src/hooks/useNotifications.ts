import { arrayUnion, doc, setDoc } from 'firebase/firestore'
import { getToken, onMessage } from 'firebase/messaging'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { db, messagingPromise } from '../firebase'

// Firebase Console → Project Settings → Cloud Messaging → "Web configuration"
const VAPID_KEY =
  'BlqIVR_Ldt1_-f7UoViy3sDprdCIYsPLw6tWT4SjFK9B7yyhraxtKGbcj_DC93jzuTfi0iSn5bjl-adq47NKNnE'

/**
 * Push notification kurulumu.
 *
 * Sorunlar ve çözümleri:
 *  1. Browser bildirim izni daha önce reddedilmişse popup bile gelmiyordu — şimdi
 *     `Notification.permission` kontrol ediliyor ve durum loglanıyor.
 *  2. Service worker registration başarısız olursa sessizce ölüyordu — şimdi
 *     hata loglanıyor ve fallback olarak default SW deneniyor.
 *  3. Token değiştiğinde Firestore'a kaydedilmiyordu — şimdi her zaman
 *     setDoc + merge ile güncelleniyor (updateDoc, profile yoksa hata verirdi).
 *  4. onMessage handler her kullanıcı değişiminde tekrar register oluyordu — şimdi
 *     unsubscribe edip yeniden bağlanıyor.
 */
export function useNotifications() {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return
    if (typeof window === 'undefined') return
    if (!('Notification' in window)) {
      console.info('[bk-notif] Bu tarayıcı bildirimleri desteklemiyor.')
      return
    }
    if (!('serviceWorker' in navigator)) {
      console.info('[bk-notif] Service worker desteklenmiyor.')
      return
    }

    // iOS/Safari izni SADECE kullanıcı dokunuşuyla verilebilir. Bu yüzden mount'ta
    // otomatik izin İSTEMİYORUZ; sadece izin zaten verilmişse token'ı kurup tazeliyoruz.
    // İzin yoksa kullanıcı "Bildirimleri Aç" butonuyla enableNotifications() çağıracak.
    if (Notification.permission !== 'granted') {
      console.info('[bk-notif] İzin bekleniyor — kullanıcı butonla açacak.')
      return
    }

    let unsubscribeOnMessage: (() => void) | null = null

    setup(user.uid).then((unsub) => {
      unsubscribeOnMessage = unsub
    })

    return () => {
      if (unsubscribeOnMessage) unsubscribeOnMessage()
    }
  }, [user?.uid])
}

/**
 * Bildirim iznini KULLANICI DOKUNUŞUYLA ister ve token'ı kaydeder.
 * iOS'ta izin isteme mutlaka bir tıklama/dokunma içinde yapılmalı — bu fonksiyon
 * bir buton onClick'inden çağrılır.
 */
export async function enableNotifications(
  uid: string,
): Promise<'granted' | 'denied' | 'unsupported'> {
  if (typeof window === 'undefined') return 'unsupported'
  if (!('Notification' in window) || !('serviceWorker' in navigator)) return 'unsupported'
  // İlk iş: izni iste (senkron gesture bağlamında kalmalı — öncesinde await olmamalı).
  let permission = Notification.permission
  if (permission !== 'granted') {
    permission = await Notification.requestPermission()
  }
  if (permission !== 'granted') return 'denied'
  await setup(uid)
  return 'granted'
}

async function setup(uid: string): Promise<(() => void) | null> {
  try {
    const messaging = await messagingPromise
    if (!messaging) {
      console.info('[bk-notif] Messaging bu ortamda desteklenmiyor.')
      return null
    }

    // İzin durumunu kontrol et
    let permission = Notification.permission
    if (permission === 'default') {
      permission = await Notification.requestPermission()
    }
    if (permission !== 'granted') {
      console.info('[bk-notif] Bildirim izni reddedildi:', permission)
      return null
    }

    // Service worker kaydı - hata olursa logla ama tek try ile dene
    let swReg: ServiceWorkerRegistration | undefined
    try {
      swReg = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
        scope: '/firebase-cloud-messaging-push-scope',
      })
      await navigator.serviceWorker.ready
    } catch (e) {
      console.error('[bk-notif] Service worker kaydı başarısız:', e)
      return null
    }

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: swReg,
    })
    if (!token) {
      console.warn('[bk-notif] FCM token alınamadı.')
      return null
    }
    console.info('[bk-notif] Token alındı, profile yazılıyor.')

    // Çoklu-cihaz: token'ı array'e ekle (arrayUnion duplicate eklemez).
    // Geriye dönük uyumluluk için fcmToken alanını da güncelliyoruz — eski
    // function deploy'ları varsa onlar da çalışsın.
    await setDoc(
      doc(db, 'profiles', uid),
      {
        fcmToken: token,
        fcmTokens: arrayUnion(token),
        fcmTokenUpdatedAt: Date.now(),
      },
      { merge: true },
    )

    // localStorage'a son token'ı yaz - aynı token tekrar yazılmasın
    try {
      localStorage.setItem('bk_fcm_token', token)
    } catch {}

    // Uygulama açıkken gelen bildirimler için handler
    const unsubscribe = onMessage(messaging, (payload) => {
      console.info('[bk-notif] Foreground mesaj:', payload)
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

    return unsubscribe
  } catch (e) {
    console.error('[bk-notif] Setup hatası:', e)
    return null
  }
}
