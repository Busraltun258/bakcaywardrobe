import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Wardrobe from './pages/Wardrobe'
import CategoryDetail from './pages/CategoryDetail'
import OutfitHub from './pages/OutfitHub'
import RespondOutfit from './pages/RespondOutfit'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <RequireAuth>
            <Home />
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
      <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
