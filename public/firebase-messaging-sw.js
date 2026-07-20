/* global firebase, clients */
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: 'AIzaSyCuJ-3NzsNEz7L9lNAt8OjidaMs-_NiYKE',
  authDomain: 'whattowear-45431.firebaseapp.com',
  projectId: 'whattowear-45431',
  storageBucket: 'whattowear-45431.firebasestorage.app',
  messagingSenderId: '785094348865',
  appId: '1:785094348865:web:1ccdd51d6b147c2de276c0',
})

const messaging = firebase.messaging()

// Background notifications — SADECE data payload'ından okur ve TEK bildirim gösterir.
// (Fonksiyon 'notification' paketi göndermiyor; böylece tarayıcı otomatik gösterip
//  çift yapmıyor.) Sabit tag → aynı anda çift düşse bile üst üste biner, tek görünür.
messaging.onBackgroundMessage((payload) => {
  const d = payload.data || {}
  const title = d.title || 'Bakçay'
  const body = d.body || ''
  const link = d.link || (payload.fcmOptions && payload.fcmOptions.link) || '/'

  self.registration.showNotification(title, {
    body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'bk-notif',
    renotify: true,
    requireInteraction: false,
    data: { url: link },
  })
})

// Open or focus the app when notification clicked
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = (event.notification.data && event.notification.data.url) || '/'
  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientsArr) => {
        for (const client of clientsArr) {
          if ('focus' in client) {
            client.focus()
            if ('navigate' in client) {
              try {
                client.navigate(url)
              } catch {
                /* ignore */
              }
            }
            return
          }
        }
        if (clients.openWindow) return clients.openWindow(url)
      }),
  )
})

// Allow client to claim the SW immediately
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))
