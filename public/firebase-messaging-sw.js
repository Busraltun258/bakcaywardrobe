/* global firebase, clients */
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: 'AIzaSyCOBaieoWgDEuQsSUvs4uVRwzbyrnYp0g4',
  authDomain: 'bakcaywardrobe.firebaseapp.com',
  projectId: 'bakcaywardrobe',
  storageBucket: 'bakcaywardrobe.firebasestorage.app',
  messagingSenderId: '430618775058',
  appId: '1:430618775058:web:22dc2dbf0c9d82068592cb',
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
