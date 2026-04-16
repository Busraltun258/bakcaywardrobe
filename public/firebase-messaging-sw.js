/* eslint-disable no-undef */
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

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title ?? 'WhatToWear'
  const options = {
    body: payload.notification?.body ?? '',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
  }
  self.registration.showNotification(title, options)
})
