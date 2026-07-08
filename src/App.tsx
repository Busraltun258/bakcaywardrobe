import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import BirthdaySurprise from './components/BirthdaySurprise'
import RequireAdmin from './components/RequireAdmin'
import RequireAuth from './components/RequireAuth'
import { useAuth } from './context/AuthContext'
import { useNotifications } from './hooks/useNotifications'
import AdminDrafts from './pages/admin/AdminDrafts'
import AdminUsers from './pages/admin/AdminUsers'
import AdminUserWardrobe from './pages/admin/AdminUserWardrobe'
import EditDraft from './pages/admin/EditDraft'
import AdminHome from './pages/AdminHome'
import CategoryDetail from './pages/CategoryDetail'
import EditSuggestion from './pages/EditSuggestion'
import Login from './pages/Login'
import OutfitHub from './pages/OutfitHub'
import RespondOutfit from './pages/RespondOutfit'
import Wardrobe from './pages/Wardrobe'
import Favorites from './pages/Favorites'
import OutfitDiary from './pages/OutfitDiary'
import Stats from './pages/Stats'

function AppRoutes() {
  const { isAdmin } = useAuth()
  useNotifications()

  return (
    <>
    <BirthdaySurprise />
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
        path="/favorites"
        element={
          <RequireAuth>
            <Favorites />
          </RequireAuth>
        }
      />
       <Route
        path="/outfit-diary"
        element={
          <RequireAuth>
            <OutfitDiary />
          </RequireAuth>
        }
      />
      <Route
        path="/stats"
        element={
          <RequireAuth>
            <Stats />
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

      {/* Admin sayfaları */}
      <Route
        path="/admin/kullanicilar"
        element={
          <RequireAdmin>
            <AdminUsers />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/kullanici/:userId"
        element={
          <RequireAdmin>
            <AdminUserWardrobe />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/taslaklar"
        element={
          <RequireAdmin>
            <AdminDrafts />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/taslak/yeni/:userId"
        element={
          <RequireAdmin>
            <EditDraft />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/taslak/duzenle/:draftId"
        element={
          <RequireAdmin>
            <EditDraft />
          </RequireAdmin>
        }
      />

      <Route path="*" element={<SmartRedirect />} />
    </Routes>
    </>
  )
}

function SmartRedirect() {
  const { user, loading, isAdmin } = useAuth()
  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a10',
          color: '#a8a8b3',
        }}
      >
        Yükleniyor…
      </div>
    )
  }
  if (user) {
    return <Navigate to={isAdmin ? '/home' : '/wardrobe'} replace />
  }
  return <Navigate to="/login" replace />
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
