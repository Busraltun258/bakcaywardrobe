import * as admin from 'firebase-admin'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'

admin.initializeApp()

// Yeni kombin önerisi oluştuğunda isteği gönderen kullanıcıya bildirim at
export const onYeniOneri = onDocumentCreated('outfitSuggestions/{sid}', async (event) => {
  const oneri = event.data?.data()
  if (!oneri?.requesterUid) return

  const profileSnap = await admin.firestore().doc(`profiles/${oneri.requesterUid}`).get()
  const fcmToken = profileSnap.data()?.fcmToken
  if (!fcmToken) return

  try {
    await admin.messaging().send({
      token: fcmToken,
      notification: {
        title: '👗 Yeni Kombin Önerisi!',
        body: 'Stilistin sana bir kombin hazırladı. Hemen bak!',
      },
      webpush: {
        fcmOptions: { link: '/kombin' },
        notification: {
          icon: '/icon-192.png',
          badge: '/icon-192.png',
        },
      },
    })
  } catch (e) {
    console.error('FCM gönderme hatası:', e)
  }
})
