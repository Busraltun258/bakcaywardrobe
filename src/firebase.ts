import { initializeApp } from 'firebase/app'
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getMessaging, isSupported } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: "AIzaSyCuJ-3NzsNEz7L9lNAt8OjidaMs-_NiYKE",
  authDomain: "whattowear-45431.firebaseapp.com",
  projectId: "whattowear-45431",
  storageBucket: "whattowear-45431.firebasestorage.app",
  messagingSenderId: "785094348865",
  appId: "1:785094348865:web:1ccdd51d6b147c2de276c0",
  measurementId: "G-MCR5K1QR98"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence).catch(console.error)
export const db = getFirestore(app)

// Messaging sadece desteklenen tarayıcılarda başlat
export const messagingPromise = isSupported().then((ok) => ok ? getMessaging(app) : null)

export default app
