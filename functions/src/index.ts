import * as admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import { onDocumentCreated, onDocumentUpdated, onDocumentWritten } from 'firebase-functions/v2/firestore'

admin.initializeApp()

const db = getFirestore(admin.app())

/** Bir kullanıcının görünen adını döndürür (bildirim metni için). */
async function getName(uid: string): Promise<string> {
  try {
    const snap = await db.doc(`profiles/${uid}`).get()
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
  const snap = await db.doc(`profiles/${uid}`).get()
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
    const ref = db.doc(`profiles/${uid}`)
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
    return
  }

  // 3) "Full look" fotoğrafı yeni eklendi mi? (kombini giydikten sonra kendi fotoğrafı)
  const hadPhoto = !!before.wornPhotoBase64
  const hasPhoto = !!after.wornPhotoBase64
  if (!hadPhoto && hasPhoto && after.advisorUid) {
    const name = await getName(after.requesterUid || '')
    await sendToUser(after.advisorUid, {
      title: `📸 ${name} kombinini giydi!`,
      body: 'Tam görünümünü paylaştı, bak bakalım 👀',
      link: `/home?focus=${event.params.sid}`,
    })
  }
})

/** Çiftin admin (Büşra) ve kullanıcı (Kamuran) uid'lerini bulur. */
async function getCoupleUids(): Promise<{ adminUid?: string; userUid?: string }> {
  const snap = await db.collection('profiles').get()
  let adminUid: string | undefined
  let userUid: string | undefined
  snap.docs.forEach((d) => {
    if (d.data().isAdmin === true) adminUid = d.id
    else userUid = d.id
  })
  return { adminUid, userUid }
}

/**
 * 💢 Trip Modu bildirimleri (loveStreak/tripMode dokümanı):
 *  - Büşra trip attı → Kamuran'a "gönlünü al"
 *  - Kamuran jest/mesaj yaptı → Büşra'ya "gönlünü almaya çalışıyor"
 *  - Büşra barıştı → Kamuran'a "barıştık"
 * onDocumentWritten: ilk oluşturmayı da yakalar.
 */
export const onTripMode = onDocumentWritten('loveStreak/tripMode', async (event) => {
  const before = (event.data?.before?.data() ?? {}) as Record<string, unknown>
  const after = (event.data?.after?.data() ?? {}) as Record<string, unknown>
  const { adminUid, userUid } = await getCoupleUids()

  const becameActive = before.active !== true && after.active === true
  const becameResolved = before.active === true && after.active !== true
  const beforeG = Array.isArray(before.gestures) ? before.gestures.length : 0
  const afterG = Array.isArray(after.gestures) ? (after.gestures as unknown[]).length : 0

  if (becameActive && userUid) {
    const note = typeof after.note === 'string' && after.note ? after.note : ''
    await sendToUser(userUid, {
      title: '💔 Büşra sana trip attı 😤',
      body: note ? `"${note.slice(0, 80)}" — gönlünü al 🥺` : 'Hadi gönlünü al 🥺',
      link: '/wardrobe',
    })
    return
  }
  if (becameResolved && userUid) {
    await sendToUser(userUid, {
      title: '💛 Büşra barıştı!',
      body: 'Trip modu bitti, her şey yolunda 🫶',
      link: '/wardrobe',
    })
    return
  }
  if (afterG > beforeG && adminUid) {
    const list = after.gestures as Array<{ emoji?: string; label?: string; text?: string }>
    const last = list[afterG - 1] ?? {}
    const txt = last.text ? `: "${String(last.text).slice(0, 80)}"` : ''
    await sendToUser(adminUid, {
      title: '💌 Kamuran gönlünü almaya çalışıyor',
      body: `${last.emoji ?? ''} ${last.label ?? ''}${txt}`.trim(),
      link: '/home',
    })
  }
})
