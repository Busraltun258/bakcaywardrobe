import { useState } from "react";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function RequestOutfitPage() {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const handleSend = async () => {
    setSending(true);
    try {
      const uid = auth.currentUser.uid;
      const userDoc = await getDoc(doc(db, "users", uid));
      const myUsername = userDoc.data()?.username || "";

      // Büşra'nın uid'sini bul
      const busraDoc = await getDoc(doc(db, "usernames", "busra"));
      if (!busraDoc.exists()) {
        throw new Error("Büşra hesabı bulunamadı!");
      }
      const busraUid = busraDoc.data().uid;

      await addDoc(collection(db, "outfitRequests"), {
        fromUid: uid,
        toUid: busraUid,
        fromUsername: myUsername,
        toUsername: "busra",
        wardrobeOwnerUid: uid,
        message: message.trim() || null,
        status: "pending",
        suggestedClothingIds: [],
        createdAt: serverTimestamp(),
      });

      alert("Kombin talebi gönderildi! 🎉");
      navigate("/");
    } catch (err) {
      alert("Hata: " + err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <button onClick={() => navigate("/")} style={styles.backBtn}>
          ← Geri
        </button>
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "64px" }}>💌</span>
          <h1 style={styles.title}>Kombin İste</h1>
          <p style={styles.subtitle}>
            Büşra'dan kombin önerisi iste!
            <br />
            İstersen bir not ekle (örn: "yarın düğüne gidiyorum")
          </p>
        </div>

        <textarea
          placeholder="Not (isteğe bağlı)… Hangi ortam için kombin istiyorsun?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          style={styles.textarea}
        />

        <button onClick={handleSend} style={styles.button} disabled={sending}>
          {sending ? "Gönderiliyor..." : "🚀 Talep Gönder"}
        </button>
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
    maxWidth: "450px",
  },
  backBtn: {
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    color: "#7c3aed",
    marginBottom: "8px",
  },
  title: { color: "#5b21b6", marginBottom: "8px" },
  subtitle: { color: "#6b7280", marginBottom: "24px" },
  textarea: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    resize: "vertical",
    marginBottom: "16px",
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
};
