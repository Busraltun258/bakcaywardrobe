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
const firestore_1 = require("firebase-functions/v2/firestore");
admin.initializeApp();
/** Bir kullanıcının görünen adını döndürür (bildirim metni için). */
async function getName(uid) {
    var _a;
    try {
        const snap = await admin.firestore().doc(`profiles/${uid}`).get();
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
    const snap = await admin.firestore().doc(`profiles/${uid}`).get();
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
        const ref = admin.firestore().doc(`profiles/${uid}`);
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
exports.onYeniOneri = (0, firestore_1.onDocumentCreated)('outfitSuggestions/{sid}', async (event) => {
    var _a, _b;
    const oneri = (_a = event.data) === null || _a === void 0 ? void 0 : _a.data();
    if (!(oneri === null || oneri === void 0 ? void 0 : oneri.requesterUid))
        return;
    const isWeekly = typeof oneri.dayIndex === 'number';
    const dayLabels = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
    await sendToUser(oneri.requesterUid, {
        title: isWeekly
            ? `👗 ${(_b = dayLabels[oneri.dayIndex]) !== null && _b !== void 0 ? _b : 'Bugün'} için kombin hazır!`
            : '👗 Yeni Kombin Önerisi!',
        body: 'Stilistin sana bir kombin hazırladı. Hemen bak!',
        link: '/kombin?tab=history',
    });
});
/**
 * Yeni talep oluştuğunda stilistin TÜM cihazlarına bildirim at.
 */
exports.onYeniTalep = (0, firestore_1.onDocumentCreated)('outfitRequests/{rid}', async (event) => {
    var _a;
    const talep = (_a = event.data) === null || _a === void 0 ? void 0 : _a.data();
    if (!(talep === null || talep === void 0 ? void 0 : talep.toUid))
        return;
    const isWeekly = talep.requestType === 'weekly';
    await sendToUser(talep.toUid, {
        title: isWeekly ? '📅 Haftalık Kombin Talebi' : '📬 Yeni Kombin Talebi',
        body: talep.note
            ? `Not: ${String(talep.note).slice(0, 80)}`
            : 'Yeni bir kullanıcı talebi geldi.',
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
exports.onOneriGuncelleme = (0, firestore_1.onDocumentUpdated)('outfitSuggestions/{sid}', async (event) => {
    var _a, _b, _c, _d, _e, _f;
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
            await sendToUser(after.requesterUid, {
                title: '🔄 Kombinin güncellendi',
                body: 'Stilistin kombinini düzenledi — yeni haline bir bak!',
                link: '/kombin?tab=history',
            });
        }
        return;
    }
    const beforeMsgs = Array.isArray(before.messages) ? before.messages.length : 0;
    const afterMsgs = Array.isArray(after.messages) ? after.messages.length : 0;
    // 1) Yeni mesaj eklendi mi?
    if (afterMsgs > beforeMsgs) {
        const last = (_e = after.messages[afterMsgs - 1]) !== null && _e !== void 0 ? _e : {};
        const text = String((_f = last.text) !== null && _f !== void 0 ? _f : '').slice(0, 90);
        if (last.role === 'user' && after.advisorUid) {
            const name = await getName(last.uid || after.requesterUid || '');
            const isChange = after.liked === 'no';
            await sendToUser(after.advisorUid, {
                title: isChange ? '🔄 Değişiklik istendi' : '💬 Yeni mesaj',
                body: text || (isChange ? `${name} bir değişiklik istedi.` : `${name} sana mesaj yazdı.`),
                link: '/home',
            });
        }
        else if (last.role === 'advisor' && after.requesterUid) {
            await sendToUser(after.requesterUid, {
                title: '💬 Stilistinden yanıt',
                body: text || 'Stilistin sana yanıt yazdı.',
                link: '/kombin?tab=history',
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
            title: '⭐ Kombin puanlandı',
            body: `${name} kombine ${afterRating} yıldız verdi ${'⭐'.repeat(afterRating)}`,
            link: '/home',
        });
    }
});
//# sourceMappingURL=index.js.map