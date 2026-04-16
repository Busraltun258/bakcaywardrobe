import * as admin from 'firebase-admin'
import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore'

admin.initializeApp()
const db = admin.firestore()

/** Yeni kombin isteği → Admin'e bildirim */
export const notifyAdminOnNewRequest = onDocumentCreated(
  'outfitRequests/{requestId}',
  async (event) => {
    const data = event.data?.data()
    if (!data) return

    const fromUid = data.fromUid as string
    const note = data.note as string

    // İstek atan kişinin adını bul
    const fromProfile = await db.doc(`profiles/${fromUid}`).get()
    const fromName = fromProfile.data()?.displayName ?? fromProfile.data()?.username ?? 'Birisi'

    // Tüm admin'leri bul
    const adminsSnap = await db.collection('profiles').where('isAdmin', '==', true).get()

    const tokens: string[] = []
    adminsSnap.forEach((doc) => {
      const t = doc.data().fcmToken
      if (t) tokens.push(t)
    })

    if (tokens.length === 0) return

    const message: admin.messaging.MulticastMessage = {
      tokens,
      notification: {
        title: '👗 Yeni Kombin Talebi!',
        body: `${fromName} kombin önerisi istiyor${note ? `: "${note}"` : '.'}`,
      },
      webpush: {
        fcmOptions: { link: '/home' },
      },
    }

    await admin.messaging().sendEachForMulticast(message)
  }
)

/** Yeni kombin önerisi → Kullanıcıya bildirim */
export const notifyUserOnNewSuggestion = onDocumentCreated(
  'outfitSuggestions/{suggestionId}',
  async (event) => {
    const data = event.data?.data()
    if (!data) return

    const requesterUid = data.requesterUid as string
    if (!requesterUid) return

    // Öneri yapan kişinin adını bul
    const advisorProfile = await db.doc(`profiles/${data.advisorUid}`).get()
    const advisorName = advisorProfile.data()?.displayName ?? 'Stilistin'

    // Kullanıcının token'ını bul
    const userProfile = await db.doc(`profiles/${requesterUid}`).get()
    const token = userProfile.data()?.fcmToken
    if (!token) return

    await admin.messaging().send({
      token,
      notification: {
        title: '✨ Kombin Önerin Hazır!',
        body: `${advisorName} senin için bir kombin hazırladı. Hemen bak!`,
      },
      webpush: {
        fcmOptions: { link: '/kombin' },
      },
    })
  }
)

/** Kullanıcı "beğenmedim" dediğinde → Admin'e bildirim */
export const notifyAdminOnDislike = onDocumentUpdated(
  'outfitSuggestions/{suggestionId}',
  async (event) => {
    const before = event.data?.before.data()
    const after = event.data?.after.data()
    if (!before || !after) return

    // Sadece liked null→no olduğunda tetikle
    if (before.liked !== null || after.liked !== 'no') return

    const requesterUid = after.requesterUid as string
    const advisorUid = after.advisorUid as string

    const requesterProfile = await db.doc(`profiles/${requesterUid}`).get()
    const requesterName = requesterProfile.data()?.displayName ?? requesterProfile.data()?.username ?? 'Kullanıcı'

    const advisorProfile = await db.doc(`profiles/${advisorUid}`).get()
    const token = advisorProfile.data()?.fcmToken
    if (!token) return

    const comment = after.comment ? ` Yorum: "${after.comment}"` : ''

    await admin.messaging().send({
      token,
      notification: {
        title: '👎 Kombin Beğenilmedi',
        body: `${requesterName} kombini beğenmedi.${comment} Düzenleyebilirsin!`,
      },
      webpush: {
        fcmOptions: { link: '/home' },
      },
    })
  }
)
