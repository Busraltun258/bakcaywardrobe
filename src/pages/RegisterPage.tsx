import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, { displayName: name });

      // Create profile document
      await setDoc(doc(db, "profiles", user.uid), {
        uid: user.uid,
        displayName: name,
        email: email,
        isAdmin: false,
        createdAt: new Date(),
      });

      console.log("Registration successful");
      // AuthContext otomatik olarak yönlendirme yapacak
    } catch (err: unknown) {
      console.error("Register error:", err);
      if (err instanceof Error) {
        if (err.message.includes("email-already-in-use")) {
          setError("Bu e-posta zaten kullanılıyor");
        } else if (err.message.includes("weak-password")) {
          setError("Şifre en az 6 karakter olmalı");
        } else {
          setError(err.message);
        }
      } else {
        setError("Kayıt başarısız");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>👗 Dolabım</h1>
        <p style={styles.subtitle}>Yeni hesap oluşturun</p>

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="text"
            placeholder="Ad Soyad"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Şifre (en az 6 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
          </button>
        </form>

        <p style={styles.linkText}>
          Zaten hesabınız var mı?{" "}
          <Link to="/login" style={styles.link}>
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F3FF",
  },
  card: {
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: 16,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: 400,
  },
  title: {
    textAlign: "center",
    color: "#6B21A8",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  input: {
    padding: "14px 16px",
    borderRadius: 12,
    border: "1px solid #D1D5DB",
    fontSize: 16,
    outline: "none",
  },
  button: {
    padding: "14px",
    borderRadius: 12,
    border: "none",
    backgroundColor: "#7C3AED",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "#EF4444",
    textAlign: "center",
    margin: 0,
  },
  linkText: {
    textAlign: "center",
    marginTop: 16,
    color: "#666",
  },
  link: {
    color: "#7C3AED",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default RegisterPage;
