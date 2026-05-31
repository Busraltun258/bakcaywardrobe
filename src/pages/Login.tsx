import { LockOutlined, MailOutlined, SkinOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, App, Button, Form, Input } from 'antd'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { defaultDisplayName, resolveLoginEmail } from '../auth/loginMap'
import { useAuth } from '../context/AuthContext'
import { auth, db } from '../firebase'
import { COLORS } from '../theme'

const ADMIN_EMAILS = ['altunbusra32@gmail.com', 'busra@dolap.com']

const Login: React.FC = () => {
  const { user, loading, isAdmin } = useAuth()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [form] = Form.useForm()

  if (loading) {
    return <SplashLoading />
  }
  if (user) {
    return <Navigate to={isAdmin ? '/home' : '/wardrobe'} replace />
  }

  const handleSubmit = async (values: { username: string; password: string }) => {
    setError('')
    const email = resolveLoginEmail(values.username)
    if (!email) {
      setError('Bilinmeyen kullanıcı adı. test, busra veya tam e-posta deneyin.')
      return
    }
    setBusy(true)
    try {
      const cred = await signInWithEmailAndPassword(auth, email, values.password)
      const u = cred.user
      const key = values.username.trim().toLowerCase()
      const isAdminUser = ADMIN_EMAILS.includes(u.email ?? '')
      await setDoc(
        doc(db, 'profiles', u.uid),
        {
          username: key.includes('@') ? u.email?.split('@')[0] : key,
          displayName: defaultDisplayName(key.includes('@') ? u.email?.split('@')[0] ?? '' : key),
          email: u.email,
          isAdmin: isAdminUser,
          updatedAt: Date.now(),
        },
        { merge: true },
      )
      message.success('Hoş geldin! 👋')
      navigate(isAdminUser ? '/home' : '/wardrobe', { replace: true })
    } catch (err: unknown) {
      const code = err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : ''
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
        setError('Şifre yanlış veya kullanıcı bulunamadı.')
      } else if (code === 'auth/user-not-found') {
        setError('Bu hesap kayıtlı değil.')
      } else if (code === 'auth/too-many-requests') {
        setError('Çok fazla deneme oldu. Birazdan tekrar dene.')
      } else {
        setError('Giriş başarısız. Bilgileri kontrol edin.')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.glow1} />
      <div style={styles.glow2} />
      <div style={styles.shell} className="fade-in">
        {/* Brand */}
        <div style={styles.brand}>
          <div style={styles.brandIcon}>
            <SkinOutlined />
          </div>
          <h1 style={styles.brandTitle}>Bakçay</h1>
          <p style={styles.brandSub}>Senin kişisel dijital dolabın</p>
        </div>

        {/* Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Tekrar hoş geldin</h2>
          <p style={styles.cardSub}>Dolabına erişmek için giriş yap</p>

          {error && (
            <Alert
              type="error"
              message={error}
              showIcon
              style={{ marginBottom: 16, borderRadius: 10 }}
            />
          )}

          <Form form={form} layout="vertical" onFinish={handleSubmit} size="large" requiredMark={false}>
            <Form.Item
              name="username"
              label={<span style={styles.label}>Kullanıcı Adı</span>}
              rules={[{ required: true, message: 'Kullanıcı adı gerekli' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: COLORS.textMuted }} />}
                placeholder="kullanıcı adı veya e-posta"
                autoComplete="username"
                allowClear
                suffix={
                  <MailOutlined style={{ color: COLORS.textMuted, fontSize: 14, opacity: 0.5 }} />
                }
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span style={styles.label}>Şifre</span>}
              rules={[{ required: true, message: 'Şifre gerekli' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: COLORS.textMuted }} />}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
              <Button type="primary" htmlType="submit" block size="large" loading={busy}>
                {busy ? 'Giriş yapılıyor…' : 'Giriş Yap'}
              </Button>
            </Form.Item>
          </Form>
        </div>

        <p style={styles.footer}>© Bakçay Dolap</p>
      </div>
    </div>
  )
}

const SplashLoading: React.FC = () => (
  <div style={styles.splash}>
    <div style={styles.brandIcon}>
      <SkinOutlined />
    </div>
    <p style={{ color: COLORS.textSecondary, marginTop: 16 }}>Yükleniyor…</p>
  </div>
)

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  glow1: {
    position: 'absolute',
    top: '-15%',
    left: '-10%',
    width: 460,
    height: 460,
    background: 'radial-gradient(circle, rgba(124,140,255,0.30) 0%, transparent 60%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  glow2: {
    position: 'absolute',
    bottom: '-15%',
    right: '-10%',
    width: 520,
    height: 520,
    background: 'radial-gradient(circle, rgba(192,132,252,0.24) 0%, transparent 60%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  shell: {
    width: '100%',
    maxWidth: 420,
    position: 'relative',
    zIndex: 1,
  },
  brand: {
    textAlign: 'center' as const,
    marginBottom: 28,
  },
  brandIcon: {
    width: 64,
    height: 64,
    borderRadius: 18,
    background: COLORS.gradient,
    color: '#fff',
    fontSize: 30,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    boxShadow: '0 16px 40px rgba(124,140,255,0.4)',
  },
  brandTitle: {
    margin: 0,
    fontSize: 32,
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: '-0.8px',
  },
  brandSub: {
    margin: '6px 0 0',
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  card: {
    background: 'rgba(26, 26, 38, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: `1px solid ${COLORS.border}`,
    borderRadius: 20,
    padding: 28,
    boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
  },
  cardTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 600,
    color: COLORS.text,
  },
  cardSub: {
    margin: '4px 0 24px',
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: 500,
  },
  footer: {
    textAlign: 'center' as const,
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 24,
  },
  splash: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    background: COLORS.bg,
  },
}

export default Login
