import { SkinOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { COLORS } from '../theme'

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()
  const loc = useLocation()

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          background: COLORS.bg,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: COLORS.gradient,
            color: '#fff',
            fontSize: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 16px 40px rgba(124,140,255,0.4)',
          }}
        >
          <SkinOutlined />
        </div>
        <Spin />
        <span style={{ color: COLORS.textSecondary, fontSize: 13 }}>Yükleniyor…</span>
      </div>
    )
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: loc.pathname }} />
  }
  return <>{children}</>
}

export default RequireAuth
