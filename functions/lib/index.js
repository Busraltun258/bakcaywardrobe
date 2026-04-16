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
exports.notifyAdminOnDislike = exports.notifyUserOnNewSuggestion = exports.notifyAdminOnNewRequest = void 0;
const admin = __importStar(require("firebase-admin"));
const firestore_1 = require("firebase-functions/v2/firestore");
admin.initializeApp();
const db = admin.firestore();
/** Yeni kombin isteği → Admin'e bildirim */
exports.notifyAdminOnNewRequest = (0, firestore_1.onDocumentCreated)('outfitRequests/{requestId}', async (event) => {
    var _a, _b, _c, _d, _e;
    const data = (_a = event.data) === null || _a === void 0 ? void 0 : _a.data();
    if (!data)
        return;
    const fromUid = data.fromUid;
    const note = data.note;
    // İstek atan kişinin adını bul
    const fromProfile = await db.doc(`profiles/${fromUid}`).get();
    const fromName = (_e = (_c = (_b = fromProfile.data()) === null || _b === void 0 ? void 0 : _b.displayName) !== null && _c !== void 0 ? _c : (_d = fromProfile.data()) === null || _d === void 0 ? void 0 : _d.username) !== null && _e !== void 0 ? _e : 'Birisi';
    // Tüm admin'leri bul
    const adminsSnap = await db.collection('profiles').where('isAdmin', '==', true).get();
    const tokens = [];
    adminsSnap.forEach((doc) => {
        const t = doc.data().fcmToken;
        if (t)
            tokens.push(t);
    });
    if (tokens.length === 0)
        return;
    const message = {
        tokens,
        notification: {
            title: '👗 Yeni Kombin Talebi!',
            body: `${fromName} kombin önerisi istiyor${note ? `: "${note}"` : '.'}`,
        },
        webpush: {
            fcmOptions: { link: '/home' },
        },
    };
    await admin.messaging().sendEachForMulticast(message);
});
/** Yeni kombin önerisi → Kullanıcıya bildirim */
exports.notifyUserOnNewSuggestion = (0, firestore_1.onDocumentCreated)('outfitSuggestions/{suggestionId}', async (event) => {
    var _a, _b, _c, _d;
    const data = (_a = event.data) === null || _a === void 0 ? void 0 : _a.data();
    if (!data)
        return;
    const requesterUid = data.requesterUid;
    if (!requesterUid)
        return;
    // Öneri yapan kişinin adını bul
    const advisorProfile = await db.doc(`profiles/${data.advisorUid}`).get();
    const advisorName = (_c = (_b = advisorProfile.data()) === null || _b === void 0 ? void 0 : _b.displayName) !== null && _c !== void 0 ? _c : 'Stilistin';
    // Kullanıcının token'ını bul
    const userProfile = await db.doc(`profiles/${requesterUid}`).get();
    const token = (_d = userProfile.data()) === null || _d === void 0 ? void 0 : _d.fcmToken;
    if (!token)
        return;
    await admin.messaging().send({
        token,
        notification: {
            title: '✨ Kombin Önerin Hazır!',
            body: `${advisorName} senin için bir kombin hazırladı. Hemen bak!`,
        },
        webpush: {
            fcmOptions: { link: '/kombin' },
        },
    });
});
/** Kullanıcı "beğenmedim" dediğinde → Admin'e bildirim */
exports.notifyAdminOnDislike = (0, firestore_1.onDocumentUpdated)('outfitSuggestions/{suggestionId}', async (event) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const before = (_a = event.data) === null || _a === void 0 ? void 0 : _a.before.data();
    const after = (_b = event.data) === null || _b === void 0 ? void 0 : _b.after.data();
    if (!before || !after)
        return;
    // Sadece liked null→no olduğunda tetikle
    if (before.liked !== null || after.liked !== 'no')
        return;
    const requesterUid = after.requesterUid;
    const advisorUid = after.advisorUid;
    const requesterProfile = await db.doc(`profiles/${requesterUid}`).get();
    const requesterName = (_f = (_d = (_c = requesterProfile.data()) === null || _c === void 0 ? void 0 : _c.displayName) !== null && _d !== void 0 ? _d : (_e = requesterProfile.data()) === null || _e === void 0 ? void 0 : _e.username) !== null && _f !== void 0 ? _f : 'Kullanıcı';
    const advisorProfile = await db.doc(`profiles/${advisorUid}`).get();
    const token = (_g = advisorProfile.data()) === null || _g === void 0 ? void 0 : _g.fcmToken;
    if (!token)
        return;
    const comment = after.comment ? ` Yorum: "${after.comment}"` : '';
    await admin.messaging().send({
        token,
        notification: {
            title: '👎 Kombin Beğenilmedi',
            body: `${requesterName} kombini beğenmedi.${comment} Düzenleyebilirsin!`,
        },
        webpush: {
            fcmOptions: { link: '/home' },
        },
    });
});
//# sourceMappingURL=index.js.map