import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { defaultDisplayName, resolveLoginEmail } from '../auth/loginMap'
import { useAuth } from '../context/AuthContext'
import { auth, db } from '../firebase'

const Login: React.FC = () => {
  const { user, loading, isAdmin } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0f14', color: '#888' }}>Yükleniyor…</div>
    )
  }
  if (user) {
    return <Navigate to={isAdmin ? '/home' : '/wardrobe'} replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const email = resolveLoginEmail(username)
    if (!email) {
      setError('Bilinmeyen kullanıcı adı. test, busra veya altnbusra32 dene; ya tam e-posta yaz.')
      return
    }
    if (!password) {
      setError('Şifre gerekli.')
      return
    }
    setBusy(true)
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      const u = cred.user
      const key = username.trim().toLowerCase()
      const ADMIN_EMAILS = ['altunbusra32@gmail.com', 'busra@dolap.com']
      const isAdminUser = ADMIN_EMAILS.includes(u.email ?? '')
      await setDoc(
        doc(db, 'profiles', u.uid),
        {
          username: key.includes('@') ? u.email?.split('@')[0] : key,
          displayName: defaultDisplayName(key.includes('@') ? (u.email?.split('@')[0] ?? '') : key),
          email: u.email,
          isAdmin: isAdminUser,
          updatedAt: Date.now(),
        },
        { merge: true }
      )
      navigate(isAdminUser ? '/home' : '/wardrobe', { replace: true })
    } catch (err: unknown) {
      const code = err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : ''
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
        setError('Şifre yanlış veya kullanıcı yok.')
      } else if (code === 'auth/user-not-found') {
        setError('Bu e-posta Firebase’de kayıtlı değil. Console → Authentication → kullanıcı ekle.')
      } else {
        setError('Giriş başarısız. Firebase Auth ve e-posta adreslerini kontrol et.')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Giriş Yap</h2>

        <input
          type="text"
          placeholder="Kullanıcı adı veya e-posta"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          autoComplete="username"
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          autoComplete="current-password"
          required
        />
        {error ? <p style={styles.err}>{error}</p> : null}
        <button type="submit" style={styles.button} disabled={busy}>
          {busy ? 'Giriş…' : 'Giriş'}
        </button>
      </form>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: 16,
    background: '#0f0f14',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '32px',
    backgroundColor: '#1a1a24',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.06)',
    width: '100%',
    maxWidth: 400,
  },
  title: {
    textAlign: 'center',
    marginBottom: 0,
    color: '#fff',
  },
  hint: {
    fontSize: 13,
    color: '#999',
    lineHeight: 1.45,
    margin: 0,
  },
  hintSmall: {
    fontSize: 11,
    color: '#666',
    lineHeight: 1.4,
    margin: 0,
  },
  input: {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.1)',
    fontSize: '14px',
    outline: 'none',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
  },
  button: {
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 600,
  },
  err: { color: '#f87171', fontSize: 13, margin: 0 },
}

export default Login
