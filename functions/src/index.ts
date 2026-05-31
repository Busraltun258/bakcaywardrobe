import * as admin from 'firebase-admin'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'

admin.initializeApp()

/**
 * Bir kullanıcının kayıtlı tüm FCM token'larını alır.
 * Eski tek-token kayıtları (`fcmToken`) ile yeni çoklu-cihaz array'i (`fcmTokens`)
 * birleşik döner. Geri uyumluluk için ikisi de destekleniyor.
 */
async function getUserTokens(uid: string): Promise<string[]> {
  const snap = await admin.firestore().doc(`profiles/${uid}`).get()
  const data = snap.data() ?? {}
  const tokens = new Set<string>()
  if (Array.isArray(data.fcmTokens)) {
    data.fcmTokens.forEach((t: string) => {
      if (typeof t === 'string' && t.length > 0) tokens.add(t)
    })
  }
  if (typeof data.fcmToken === 'string' && data.fcmToken.length > 0) {
    tokens.add(data.fcmToken)
  }
  return Array.from(tokens)
}

/**
 * Her cihaza bildirim gönderir. Geçersiz/silinmiş token'ları otomatik temizler.
 */
async function sendToUser(
  uid: string,
  payload: {
    title: string
    body: string
    link: string
  },
) {
  const tokens = await getUserTokens(uid)
  if (tokens.length === 0) {
    console.info(`[notif] ${uid} için token yok`)
    return
  }

  const response = await admin.messaging().sendEachForMulticast({
    tokens,
    notification: { title: payload.title, body: payload.body },
    webpush: {
      fcmOptions: { link: payload.link },
      notification: {
        icon: '/icon-192.png',
        badge: '/icon-192.png',
      },
    },
  })

  const stale: string[] = []
  response.responses.forEach((res, idx) => {
    if (res.success) return
    const code = res.error?.code ?? ''
    console.warn(`[notif] gönderim hatası (${tokens[idx].slice(0, 12)}…):`, code)
    if (
      code === 'messaging/registration-token-not-registered' ||
      code === 'messaging/invalid-registration-token' ||
      code === 'messaging/invalid-argument'
    ) {
      stale.push(tokens[idx])
    }
  })

  if (stale.length > 0) {
    console.info(`[notif] ${stale.length} eski token temizleniyor`)
    const ref = admin.firestore().doc(`profiles/${uid}`)
    const update: Record<string, unknown> = {
      fcmTokens: admin.firestore.FieldValue.arrayRemove(...stale),
    }
    // Tek-alan fcmToken de eskimişse sıfırla
    const snap = await ref.get()
    const current = snap.data()?.fcmToken
    if (typeof current === 'string' && stale.includes(current)) {
      update.fcmToken = admin.firestore.FieldValue.delete()
    }
    await ref.update(update).catch((e) => console.error('[notif] token temizleme hatası:', e))
  }
}

/**
 * Yeni kombin önerisi oluştuğunda isteği gönderen kullanıcının TÜM cihazlarına bildirim at.
 */
export const onYeniOneri = onDocumentCreated('outfitSuggestions/{sid}', async (event) => {
  const oneri = event.data?.data()
  if (!oneri?.requesterUid) return

  const isWeekly = typeof oneri.dayIndex === 'number'
  const dayLabels = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma']

  await sendToUser(oneri.requesterUid, {
    title: isWeekly
      ? `👗 ${dayLabels[oneri.dayIndex] ?? 'Bugün'} için kombin hazır!`
      : '👗 Yeni Kombin Önerisi!',
    body: 'Stilistin sana bir kombin hazırladı. Hemen bak!',
    link: '/kombin',
  })
})

/**
 * Yeni talep oluştuğunda stilistin TÜM cihazlarına bildirim at.
 */
export const onYeniTalep = onDocumentCreated('outfitRequests/{rid}', async (event) => {
  const talep = event.data?.data()
  if (!talep?.toUid) return

  const isWeekly = talep.requestType === 'weekly'

  await sendToUser(talep.toUid, {
    title: isWeekly ? '📅 Haftalık Kombin Talebi' : '📬 Yeni Kombin Talebi',
    body: talep.note
      ? `Not: ${String(talep.note).slice(0, 80)}`
      : 'Yeni bir kullanıcı talebi geldi.',
    link: '/home',
  })
})
