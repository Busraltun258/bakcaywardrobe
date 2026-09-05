"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.onOneriGuncelleme = exports.onYeniTalep = exports.onYeniOneri = void 0;
const admin = __importStar(require("firebase-admin"));
const firestore_1 = require("firebase-admin/firestore");
const firestore_2 = require("firebase-functions/v2/firestore");
admin.initializeApp();
const db = (0, firestore_1.getFirestore)(admin.app());
/** Bir kullanıcının görünen adını döndürür (bildirim metni için). */
async function getName(uid) {
    var _a;
    try {
        const snap = await db.doc(`profiles/${uid}`).get();
        const d = (_a = snap.data()) !== null && _a !== void 0 ? _a : {};
        return d.displayName || d.username || 'Biri';
    }
    catch (_b) {
        return 'Biri';
    }
}
/**
 * Bir kullanıcının kayıtlı tüm FCM token'larını alır.
 * Eski tek-token kayıtları (`fcmToken`) ile yeni çoklu-cihaz array'i (`fcmTokens`)
 * birleşik döner. Geri uyumluluk için ikisi de destekleniyor.
 */
async function getUserTokens(uid) {
    var _a;
    const snap = await db.doc(`profiles/${uid}`).get();
    const data = (_a = snap.data()) !== null && _a !== void 0 ? _a : {};
    const tokens = new Set();
    if (Array.isArray(data.fcmTokens)) {
        data.fcmTokens.forEach((t) => {
            if (typeof t === 'string' && t.length > 0)
                tokens.add(t);
        });
    }
    if (typeof data.fcmToken === 'string' && data.fcmToken.length > 0) {
        tokens.add(data.fcmToken);
    }
    return Array.from(tokens);
}
/**
 * Her cihaza bildirim gönderir. Geçersiz/silinmiş token'ları otomatik temizler.
 */
async function sendToUser(uid, payload) {
    var _a;
    const tokens = await getUserTokens(uid);
    if (tokens.length === 0) {
        console.info(`[notif] ${uid} için token yok`);
        return;
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
    });
    const stale = [];
    response.responses.forEach((res, idx) => {
        var _a, _b;
        if (res.success)
            return;
        const code = (_b = (_a = res.error) === null || _a === void 0 ? void 0 : _a.code) !== null && _b !== void 0 ? _b : '';
        console.warn(`[notif] gönderim hatası (${tokens[idx].slice(0, 12)}…):`, code);
        if (code === 'messaging/registration-token-not-registered' ||
            code === 'messaging/invalid-registration-token' ||
            code === 'messaging/invalid-argument') {
            stale.push(tokens[idx]);
        }
    });
    if (stale.length > 0) {
        console.info(`[notif] ${stale.length} eski token temizleniyor`);
        const ref = db.doc(`profiles/${uid}`);
        const update = {
            fcmTokens: admin.firestore.FieldValue.arrayRemove(...stale),
        };
        // Tek-alan fcmToken de eskimişse sıfırla
        const snap = await ref.get();
        const current = (_a = snap.data()) === null || _a === void 0 ? void 0 : _a.fcmToken;
        if (typeof current === 'string' && stale.includes(current)) {
            update.fcmToken = admin.firestore.FieldValue.delete();
        }
        await ref.update(update).catch((e) => console.error('[notif] token temizleme hatası:', e));
    }
}
/**
 * Yeni kombin önerisi oluştuğunda isteği gönderen kullanıcının TÜM cihazlarına bildirim at.
 */
exports.onYeniOneri = (0, firestore_2.onDocumentCreated)('outfitSuggestions/{sid}', async (event) => {
    var _a, _b, _c;
    const oneri = (_a = event.data) === null || _a === void 0 ? void 0 : _a.data();
    if (!(oneri === null || oneri === void 0 ? void 0 : oneri.requesterUid))
        return;
    const isWeekly = typeof oneri.dayIndex === 'number';
    const dayLabels = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
    const stilist = await getName((_b = oneri.advisorUid) !== null && _b !== void 0 ? _b : '');
    await sendToUser(oneri.requesterUid, {
        title: isWeekly
            ? `👔 ${(_c = dayLabels[oneri.dayIndex]) !== null && _c !== void 0 ? _c : 'Bugün'} için kombinin hazır 💛`
            : '👔 Sana özel bir kombin hazır 💛',
        body: `${stilist} senin için hazırladı, bak bakalım`,
        link: `/kombin?tab=history&focus=${event.params.sid}`,
    });
});
/**
 * Yeni talep oluştuğunda stilistin TÜM cihazlarına bildirim at.
 */
exports.onYeniTalep = (0, firestore_2.onDocumentCreated)('outfitRequests/{rid}', async (event) => {
    var _a, _b;
    const talep = (_a = event.data) === null || _a === void 0 ? void 0 : _a.data();
    if (!(talep === null || talep === void 0 ? void 0 : talep.toUid))
        return;
    const isWeekly = talep.requestType === 'weekly';
    const kisi = await getName((_b = talep.fromUid) !== null && _b !== void 0 ? _b : '');
    await sendToUser(talep.toUid, {
        title: isWeekly
            ? `📅 ${kisi} haftalık kombin istedi`
            : `💌 ${kisi} senden kombin istedi`,
        body: talep.note
            ? `"${String(talep.note).slice(0, 80)}"`
            : 'Senin önerini bekliyor 🥰',
        link: '/home',
    });
});
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
exports.onOneriGuncelleme = (0, firestore_2.onDocumentUpdated)('outfitSuggestions/{sid}', async (event) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const before = (_a = event.data) === null || _a === void 0 ? void 0 : _a.before.data();
    const after = (_b = event.data) === null || _b === void 0 ? void 0 : _b.after.data();
    if (!before || !after)
        return;
    // 0) Kombin düzenlendi mi? (stilist parçaları/​notu değiştirdi → editedAt güncellenir)
    //    Kamuran'a "kombinin güncellendi" bildir. Düzenleme diğer alanları da
    //    değiştirdiği için bunu önce ele alıp çıkıyoruz (çift bildirim olmasın).
    const editedChanged = !!after.editedAt && ((_c = before.editedAt) !== null && _c !== void 0 ? _c : null) !== ((_d = after.editedAt) !== null && _d !== void 0 ? _d : null);
    if (editedChanged) {
        if (after.requesterUid) {
            const stilist = await getName((_e = after.advisorUid) !== null && _e !== void 0 ? _e : '');
            await sendToUser(after.requesterUid, {
                title: '🔄 Kombinin güncellendi 💛',
                body: `${stilist} kombinini değiştirdi, göz at`,
                link: `/kombin?tab=history&focus=${event.params.sid}`,
            });
        }
        return;
    }
    const beforeMsgs = Array.isArray(before.messages) ? before.messages.length : 0;
    const afterMsgs = Array.isArray(after.messages) ? after.messages.length : 0;
    // 1) Yeni mesaj eklendi mi?
    if (afterMsgs > beforeMsgs) {
        const last = (_f = after.messages[afterMsgs - 1]) !== null && _f !== void 0 ? _f : {};
        const text = String((_g = last.text) !== null && _g !== void 0 ? _g : '').slice(0, 90);
        if (last.role === 'user' && after.advisorUid) {
            const name = await getName(last.uid || after.requesterUid || '');
            const isChange = after.liked === 'no';
            await sendToUser(after.advisorUid, {
                title: isChange ? `🔄 ${name} değişiklik istedi` : '💬 Aşkından mesajın var 💌',
                body: text || (isChange ? 'Bir değişiklik istedi.' : `${name} sana yazdı`),
                link: `/home?focus=${event.params.sid}`,
            });
        }
        else if (last.role === 'advisor' && after.requesterUid) {
            const stilist = await getName(last.uid || after.advisorUid || '');
            await sendToUser(after.requesterUid, {
                title: '💬 Aşkından mesajın var 💛',
                body: text || `${stilist} sana yazdı`,
                link: `/kombin?tab=history&focus=${event.params.sid}`,
            });
        }
        return;
    }
    // 2) Yıldız (rating) değişti mi? (mesajsız puanlama)
    const beforeRating = typeof before.rating === 'number' ? before.rating : 0;
    const afterRating = typeof after.rating === 'number' ? after.rating : 0;
    if (afterRating !== beforeRating && afterRating > 0 && after.advisorUid) {
        const name = await getName(after.requesterUid || '');
        await sendToUser(after.advisorUid, {
            title: `⭐ ${name} kombini puanladı`,
            body: `${afterRating} yıldız verdi ${'⭐'.repeat(afterRating)}`,
            link: `/home?focus=${event.params.sid}`,
        });
    }
});
//# sourceMappingURL=index.js.map