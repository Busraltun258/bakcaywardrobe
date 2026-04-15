import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function MyRequestsPage() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      navigate("/login");
      return;
    }

    const q = query(
      collection(db, "outfitRequests"),
      where("fromUid", "==", uid)
    );
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setRequests(items);
    });
    return () => unsub();
  }, [navigate]);

  const handleFeedback = async (reqId, liked) => {
    await updateDoc(doc(db, "outfitRequests", reqId), {
      status: liked ? "liked" : "disliked",
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <button onClick={() => navigate("/")} style={styles.backBtn}>
          ← Geri
        </button>
        <h1 style={styles.title}>👕 Kombinlerim</h1>

        {requests.length === 0 && (
          <p style={{ textAlign: "center", color: "#999" }}>Henüz istek yok.</p>
        )}

        {requests.map((req) => (
          <div key={req.id} style={styles.reqCard}>
            <div style={styles.header}>
              <span style={{ fontSize: "20px" }}>{statusIcon(req.status)}</span>
              <span style={styles.statusText}>{statusLabel(req.status)}</span>
            </div>

            {req.message && (
              <p style={styles.note}>📝 {req.message}</p>
            )}

            {/* Önerilen kıyafetler */}
            {(req.status === "suggested" ||
              req.status === "liked" ||
              req.status === "disliked") &&
              req.suggestedClothingIds?.length > 0 && (
                <ClothingPreview ids={req.suggestedClothingIds} />
              )}

            {/* Beğen/Beğenme butonları */}
            {req.status === "suggested" && (
              <div style={styles.feedbackRow}>
                <button
                  onClick={() => handleFeedback(req.id, true)}
                  style={styles.likeBtn}
                >
                  👍 Beğendim
                </button>
                <button
                  onClick={() => handleFeedback(req.id, false)}
                  style={styles.dislikeBtn}
                >
                  👎 Beğenmedim
                </button>
              </div>
            )}

            {req.status === "liked" && (
              <p style={{ color: "green", fontWeight: "bold" }}>
                👍 Bu kombini beğendin!
              </p>
            )}
            {req.status === "disliked" && (
              <p style={{ color: "red", fontWeight: "bold" }}>
                👎 Bu kombini beğenmedin
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ClothingPreview({ ids }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const results = [];
      for (const id of ids) {
        const snap = await getDoc(doc(db, "clothes", id));
        if (snap.exists()) results.push({ id: snap.id, ...snap.data() });
      }
      setItems(results);
    };
    load();
  }, [ids]);

  if (items.length === 0) return <p style={{ color: "#999" }}>Yükleniyor...</p>;

  return (
    <div style={{ display: "flex", gap: "8px", overflowX: "auto", margin: "12px 0" }}>
      {items.map((item) => (
        <div key={item.id} style={{ textAlign: "center", minWidth: "80px" }}>
          <img
            src={item.imageUrl}
            alt={item.name}
            style={{
              width: "80px",
              height: "90px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <p style={{ fontSize: "11px", margin: "4px 0 0" }}>{item.name}</p>
        </div>
      ))}
    </div>
  );
}

function statusIcon(s) {
  switch (s) {
    case "pending": return "⏳";
    case "suggested": return "🎁";
    case "liked": return "👍";
    case "disliked": return "👎";
    default: return "❓";
  }
}

function statusLabel(s) {
  switch (s) {
    case "pending": return "Yanıt bekliyor…";
    case "suggested": return "Kombin önerildi!";
    case "liked": return "Beğendin";
    case "disliked": return "Beğenmedin";
    default: return s;
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f3f0ff",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "32px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  backBtn: {
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    color: "#7c3aed",
    marginBottom: "8px",
  },
  title: { textAlign: "center", color: "#5b21b6", marginBottom: "24px" },
  reqCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "16px",
  },
  header: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" },
  statusText: { fontWeight: "bold", fontSize: "16px" },
  note: { color: "#555", marginBottom: "8px" },
  feedbackRow: { display: "flex", gap: "12px", marginTop: "12px" },
  likeBtn: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
  },
  dislikeBtn: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
  },
};
