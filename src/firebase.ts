import { initializeApp } from 'firebase/app'
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth'
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore'
import { getMessaging, isSupported } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyCuJ-3NzsNEz7L9lNAt8OjidaMs-_NiYKE',
  authDomain: 'whattowear-45431.firebaseapp.com',
  projectId: 'whattowear-45431',
  storageBucket: 'whattowear-45431.firebasestorage.app',
  messagingSenderId: '785094348865',
  appId: '1:785094348865:web:1ccdd51d6b147c2de276c0',
  measurementId: 'G-MCR5K1QR98',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence).catch(console.error)

/**
 * Firestore OFFLINE PERSISTENCE — performans için kritik.
 * Daha önce ziyaret edilen tüm dokümanlar (resimler dahil) IndexedDB'de tutulur.
 * Sonraki yüklemelerde sayfa açılınca dolap ANINDA görünür, Firestore'a istek
 * arka planda gider ve değişiklik varsa onSnapshot ile sessizce güncellenir.
 *
 * `persistentMultipleTabManager` birden fazla sekme açıkken sync sağlar.
 */
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
})

// Messaging sadece desteklenen tarayıcılarda başlat
export const messagingPromise = isSupported().then((ok) => (ok ? getMessaging(app) : null))

export default app
