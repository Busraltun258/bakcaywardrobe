import { initializeApp } from 'firebase/app'
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth'
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore'
import { getMessaging, isSupported } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyCOBaieoWgDEuQsSUvs4uVRwzbyrnYp0g4',
  authDomain: 'bakcaywardrobe.firebaseapp.com',
  projectId: 'bakcaywardrobe',
  storageBucket: 'bakcaywardrobe.firebasestorage.app',
  messagingSenderId: '430618775058',
  appId: '1:430618775058:web:22dc2dbf0c9d82068592cb',
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
