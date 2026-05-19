import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import { useAuth } from './context/AuthContext'
import { useNotifications } from './hooks/useNotifications'
import AdminHome from './pages/AdminHome'
import CategoryDetail from './pages/CategoryDetail'
import EditSuggestion from './pages/EditSuggestion'
import Login from './pages/Login'
import OutfitHub from './pages/OutfitHub'
import RespondOutfit from './pages/RespondOutfit'
import Wardrobe from './pages/Wardrobe'

function AppRoutes() {
  const { isAdmin } = useAuth()
  useNotifications()

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
      <Route path="*" element={<SmartRedirect />} />
    </Routes>
  )
}

function SmartRedirect() {
  const { user, loading, isAdmin } = useAuth()
  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0f14', color: '#888' }}>Yükleniyor…</div>
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
