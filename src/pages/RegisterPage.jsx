import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const usernameLower = username.toLowerCase();

      // 1) Kullanıcı adı daha önce alınmış mı?
      const usernameDoc = await getDoc(doc(db, "usernames", usernameLower));
      if (usernameDoc.exists()) {
        throw new Error("Bu kullanıcı adı zaten alınmış!");
      }

      // 2) Firebase Auth ile kayıt
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      // 3) Firestore'a kullanıcı adı eşlemesini kaydet
      await setDoc(doc(db, "usernames", usernameLower), {
        email: email,
        uid: uid,
      });

      // 4) Kullanıcı profilini kaydet
      await setDoc(doc(db, "users", uid), {
        username: usernameLower,
        email: email,
        createdAt: serverTimestamp(),
      });

      navigate("/");
    } catch (err) {
      setError(err.message || "Kayıt başarısız!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📝 Kayıt Ol</h1>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Kullanıcı adı (örn: kamuran)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            minLength={6}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
          </button>
        </form>

        <p style={styles.linkText}>
          Zaten hesabın var mı?{" "}
          <Link to="/login" style={styles.link}>
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f3f0ff",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    textAlign: "center",
    marginBottom: "24px",
    color: "#5b21b6",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    marginBottom: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#7c3aed",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "12px",
  },
  linkText: {
    textAlign: "center",
    marginTop: "16px",
  },
  link: {
    color: "#7c3aed",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
