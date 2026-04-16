import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import { useAuth } from './context/AuthContext'
import AdminHome from './pages/AdminHome'
import CategoryDetail from './pages/CategoryDetail'
import EditSuggestion from './pages/EditSuggestion'
import Login from './pages/Login'
import OutfitHub from './pages/OutfitHub'
import RespondOutfit from './pages/RespondOutfit'
import Wardrobe from './pages/Wardrobe'
import { onForegroundMessage, requestNotificationPermission } from './utils/notifications'

function AppRoutes() {
  const { isAdmin } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <RequireAuth>
            {isAdmin ? <AdminHome /> : <Navigate to="/wardrobe" replace />}
          </RequireAuth>
        }
      />
      <Route
        path="/wardrobe/:categoryKey"
        element={
          <RequireAuth>
            <CategoryDetail />
          </RequireAuth>
        }
      />
      <Route
        path="/wardrobe"
        element={
          <RequireAuth>
            <Wardrobe />
          </RequireAuth>
        }
      />
      <Route
        path="/kombin"
        element={
          <RequireAuth>
            <OutfitHub />
          </RequireAuth>
        }
      />
      <Route
        path="/kombin/yanit/:requestId"
        element={
          <RequireAuth>
            <RespondOutfit />
          </RequireAuth>
        }
      />
      <Route
        path="/kombin/duzenle/:suggestionId"
        element={
          <RequireAuth>
            <EditSuggestion />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

function App() {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return
    // Bildirim izni iste ve token'ı Firestore'a kaydet
    requestNotificationPermission(user.uid).catch(console.error)
    const unsub = onForegroundMessage((payload) => {
      if (Notification.permission === 'granted' && payload.notification) {
        new Notification(payload.notification.title ?? 'WhatToWear', {
          body: payload.notification.body ?? '',
          icon: '/icon-192.png',
        })
      }
    })
    return () => unsub()
  }, [user])

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
