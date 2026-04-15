import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import { defaultDisplayName, resolveLoginEmail } from '../auth/loginMap'
import { auth, db } from '../firebase'

const Login: React.FC = () => {
  const { user, loading } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  if (!loading && user) {
    return <Navigate to="/home" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const email = resolveLoginEmail(username)
    if (!email) {
      setError('Bilinmeyen kullanıcı adı. kamuran, busra veya altnbusra32 dene; ya tam e-posta yaz.')
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
      await setDoc(
        doc(db, 'profiles', u.uid),
        {
          username: key.includes('@') ? u.email?.split('@')[0] : key,
          displayName: defaultDisplayName(key.includes('@') ? (u.email?.split('@')[0] ?? '') : key),
          email: u.email,
          updatedAt: Date.now(),
        },
        { merge: true }
      )
      navigate('/home', { replace: true })
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
        <p style={styles.hint}>
          Örnek: <strong>kamuran</strong> / şifre <strong>1234</strong> —{' '}
          <strong>altnbusra32</strong> veya <strong>busra</strong> / kendi şifren (Firebase’de tanımlı olmalı).
        </p>
        <p style={styles.hintSmall}>
          Firebase Console → Authentication → E-posta ile:{' '}
          <code>kamuran@dolabim.app</code>, <code>busra@dolabim.app</code>
        </p>
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
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '32px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: 400,
  },
  title: {
    textAlign: 'center',
    marginBottom: 0,
  },
  hint: {
    fontSize: 13,
    color: '#555',
    lineHeight: 1.45,
    margin: 0,
  },
  hintSmall: {
    fontSize: 11,
    color: '#888',
    lineHeight: 1.4,
    margin: 0,
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
  },
  button: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#4f46e5',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
  err: { color: '#b91c1c', fontSize: 13, margin: 0 },
}

export default Login
