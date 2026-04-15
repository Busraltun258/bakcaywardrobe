import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log("Login successful, UID:", user.uid);

      // Check if user is admin
      const profileDoc = await getDoc(doc(db, "profiles", user.uid));
      const isAdmin = profileDoc.data()?.isAdmin === true;
      
      console.log("Is Admin:", isAdmin);

      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err: unknown) {
      console.error("Login error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Giriş başarısız");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>👗 Dolabım</h1>
        <p style={styles.subtitle}>Hesabınıza giriş yapın</p>

        <form onSubmit={handleLogin} style={styles.form}>
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
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          
          {error && <p style={styles.error}>{error}</p>}
          
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <p style={styles.linkText}>
          Hesabınız yok mu?{" "}
          <Link to="/register" style={styles.link}>
            Kayıt Ol
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

export default LoginPage;
