importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: "AIzaSyCuJ-3NzsNEz7L9lNAt8OjidaMs-_NiYKE",
  authDomain: "whattowear-45431.firebaseapp.com",
  projectId: "whattowear-45431",
  storageBucket: "whattowear-45431.firebasestorage.app",
  messagingSenderId: "785094348865",
  appId: "1:785094348865:web:1ccdd51d6b147c2de276c0",
})

const messaging = firebase.messaging()

// Uygulama kapalıyken gelen bildirimler
messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification ?? {}
  self.registration.showNotification(title ?? 'Bakcay Kombin', {
    body: body ?? '',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: { url: payload.fcmOptions?.link ?? '/' },
  })
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url ?? '/'
  event.waitUntil(clients.openWindow(url))
})
