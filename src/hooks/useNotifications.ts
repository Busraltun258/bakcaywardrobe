import { getToken, onMessage } from 'firebase/messaging'
import { doc, updateDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { db, messagingPromise } from '../firebase'
import { useAuth } from '../context/AuthContext'

// Firebase Console → Project Settings → Cloud Messaging →
// "Web configuration" → "Anahtar çifti oluştur" → kopyala ve buraya yapıştır
const VAPID_KEY = 'BlqIVR_Ldt1_-f7UoViy3sDprdCIYsPLw6tWT4SjFK9B7yyhraxtKGbcj_DC93jzuTfi0iSn5bjl-adq47NKNnE'

export function useNotifications() {
  const { user } = useAuth()

  useEffect(() => {
    if (!user || !('Notification' in window) || !('serviceWorker' in navigator)) return

    setup(user.uid).catch(console.error)
  }, [user?.uid])
}

async function setup(uid: string) {
  const messaging = await messagingPromise
  if (!messaging) return

  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return

  // FCM için ayrı bir service worker kaydı (mevcut SW ile çakışmaz)
  const swReg = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
    scope: '/fcm-sw/',
  })

  const token = await getToken(messaging, {
    vapidKey: VAPID_KEY,
    serviceWorkerRegistration: swReg,
  })
  if (!token) return

  // Token'ı Firestore'a kaydet (Cloud Function buradan okuyacak)
  await updateDoc(doc(db, 'profiles', uid), { fcmToken: token })

  // Uygulama açıkken gelen bildirimler
  onMessage(messaging, (payload) => {
    const { title, body } = payload.notification ?? {}
    if (!title) return
    new Notification(title, {
      body: body ?? '',
      icon: '/icon-192.png',
    })
  })
}
