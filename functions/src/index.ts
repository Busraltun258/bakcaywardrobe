import * as admin from 'firebase-admin'
import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore'

admin.initializeApp()

/** Bir kullanıcının görünen adını döndürür (bildirim metni için). */
async function getName(uid: string): Promise<string> {
  try {
    const snap = await admin.firestore().doc(`profiles/${uid}`).get()
    const d = snap.data() ?? {}
    return (d.displayName as string) || (d.username as string) || 'Biri'
  } catch {
    return 'Biri'
  }
}

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

  // SADECE data — 'notification' paketi göndermiyoruz. Aksi halde tarayıcı bildirimi
  // otomatik gösteriyor VE service worker elle gösteriyor → çift bildirim oluyor.
  // Data-only ile gösterimi tek yerden (SW) yapıp tekilliği garanti ediyoruz.
  const response = await admin.messaging().sendEachForMulticast({
    tokens,
    data: {
      title: payload.title,
      body: payload.body,
      link: payload.link,
    },
    webpush: {
      headers: { Urgency: 'high', TTL: '86400' },
      fcmOptions: { link: payload.link },
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
  const stilist = await getName(oneri.advisorUid ?? '')

  await sendToUser(oneri.requesterUid, {
    title: isWeekly
      ? `👔 ${dayLabels[oneri.dayIndex] ?? 'Bugün'} için kombinin hazır 💛`
      : '👔 Sana özel bir kombin hazır 💛',
    body: `${stilist} senin için hazırladı, bak bakalım`,
    link: `/kombin?tab=history&focus=${event.params.sid}`,
  })
})

/**
 * Yeni talep oluştuğunda stilistin TÜM cihazlarına bildirim at.
 */
export const onYeniTalep = onDocumentCreated('outfitRequests/{rid}', async (event) => {
  const talep = event.data?.data()
  if (!talep?.toUid) return

  const isWeekly = talep.requestType === 'weekly'
  const kisi = await getName(talep.fromUid ?? '')

  await sendToUser(talep.toUid, {
    title: isWeekly
      ? `📅 ${kisi} haftalık kombin istedi`
      : `💌 ${kisi} senden kombin istedi`,
    body: talep.note
      ? `"${String(talep.note).slice(0, 80)}"`
      : 'Senin önerini bekliyor 🥰',
    link: '/home',
  })
})

/**
 * Bir öneri GÜNCELLENDİĞİNDE bildirim at:
 *  - Yeni mesaj eklendiyse → karşı tarafa (yazan kim ise diğerine)
 *      • kullanıcı yazdıysa + liked='no' → "değişiklik istendi"
 *      • kullanıcı yazdıysa → "yeni mesaj"
 *      • stilist yazdıysa → "stilistinden yanıt"
 *  - Mesaj yoksa ama yıldız (rating) değiştiyse → stiliste "kombin puanlandı"
 *
 * Not: Yalnızca 'liked' değişen güncellemeler (ör. otomatik onarım, "tümünü gördüm")
 * bilinçli olarak bildirim üretmez.
 */
export const onOneriGuncelleme = onDocumentUpdated('outfitSuggestions/{sid}', async (event) => {
  const before = event.data?.before.data()
  const after = event.data?.after.data()
  if (!before || !after) return

  // 0) Kombin düzenlendi mi? (stilist parçaları/​notu değiştirdi → editedAt güncellenir)
  //    Kamuran'a "kombinin güncellendi" bildir. Düzenleme diğer alanları da
  //    değiştirdiği için bunu önce ele alıp çıkıyoruz (çift bildirim olmasın).
  const editedChanged =
    !!after.editedAt && (before.editedAt ?? null) !== (after.editedAt ?? null)
  if (editedChanged) {
    if (after.requesterUid) {
      const stilist = await getName(after.advisorUid ?? '')
      await sendToUser(after.requesterUid, {
        title: '🔄 Kombinin güncellendi 💛',
        body: `${stilist} kombinini değiştirdi, göz at`,
        link: `/kombin?tab=history&focus=${event.params.sid}`,
      })
    }
    return
  }

  const beforeMsgs = Array.isArray(before.messages) ? before.messages.length : 0
  const afterMsgs = Array.isArray(after.messages) ? after.messages.length : 0

  // 1) Yeni mesaj eklendi mi?
  if (afterMsgs > beforeMsgs) {
    const last = after.messages[afterMsgs - 1] ?? {}
    const text = String(last.text ?? '').slice(0, 90)

    if (last.role === 'user' && after.advisorUid) {
      const name = await getName(last.uid || after.requesterUid || '')
      const isChange = after.liked === 'no'
      await sendToUser(after.advisorUid, {
        title: isChange ? `🔄 ${name} değişiklik istedi` : '💬 Aşkından mesajın var 💌',
        body: text || (isChange ? 'Bir değişiklik istedi.' : `${name} sana yazdı`),
        link: `/home?focus=${event.params.sid}`,
      })
    } else if (last.role === 'advisor' && after.requesterUid) {
      const stilist = await getName(last.uid || after.advisorUid || '')
      await sendToUser(after.requesterUid, {
        title: '💬 Aşkından mesajın var 💛',
        body: text || `${stilist} sana yazdı`,
        link: `/kombin?tab=history&focus=${event.params.sid}`,
      })
    }
    return
  }

  // 2) Yıldız (rating) değişti mi? (mesajsız puanlama)
  const beforeRating = typeof before.rating === 'number' ? before.rating : 0
  const afterRating = typeof after.rating === 'number' ? after.rating : 0
  if (afterRating !== beforeRating && afterRating > 0 && after.advisorUid) {
    const name = await getName(after.requesterUid || '')
    await sendToUser(after.advisorUid, {
      title: `⭐ ${name} kombini puanladı`,
      body: `${afterRating} yıldız verdi ${'⭐'.repeat(afterRating)}`,
      link: `/home?focus=${event.params.sid}`,
    })
  }
})
