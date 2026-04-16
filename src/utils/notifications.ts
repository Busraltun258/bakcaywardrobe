import { doc, updateDoc } from 'firebase/firestore'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import app, { db } from '../firebase'

const VAPID_KEY = 'BIqIVR_Ldt1_-f7UoViy3sDprdCIYsPLw6tWT4SjFK9B7yyhraxtkGbcj_DC93jzuTfi0iSn5bjl-adq47NKNnE' // Firebase Console > Cloud Messaging > Web Push certificates'dan al

let messagingInstance: ReturnType<typeof getMessaging> | null = null

function getMsg() {
  if (!messagingInstance) messagingInstance = getMessaging(app)
  return messagingInstance
}

/** Kullanıcıdan bildirim izni iste, FCM token al ve Firestore profile'a kaydet */
export async function requestNotificationPermission(uid?: string): Promise<string | null> {
  try {
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') {
      console.log('Bildirim izni reddedildi')
      return null
    }

    const token = await getToken(getMsg(), {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: await navigator.serviceWorker.getRegistration(),
    })
    console.log('FCM Token:', token)

    // Token'ı Firestore profile'a kaydet
    if (uid && token) {
      try {
        await updateDoc(doc(db, 'profiles', uid), { fcmToken: token })
      } catch (e) {
        console.error('FCM token kaydedilemedi:', e)
      }
    }

    return token
  } catch (err) {
    console.error('Bildirim izni hatası:', err)
    return null
  }
}

/** Uygulama açıkken gelen bildirimleri dinle */
export function onForegroundMessage(callback: (payload: any) => void) {
  return onMessage(getMsg(), callback)
}
