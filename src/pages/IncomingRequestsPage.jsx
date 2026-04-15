import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function IncomingRequestsPage() {
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
      where("toUid", "==", uid)
    );
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setRequests(items);
    });
    return () => unsub();
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <button onClick={() => navigate("/")} style={styles.backBtn}>
          ← Geri
        </button>
        <h1 style={styles.title}>🔔 Gelen Talepler</h1>

        {requests.length === 0 && (
          <p style={{ textAlign: "center", color: "#999" }}>
            Henüz kombin talebi yok.
          </p>
        )}

        {requests.map((req) => (
          <div key={req.id} style={styles.reqCard}>
            <div style={styles.row}>
              <div>
                <h3 style={{ margin: 0 }}>
                  {req.fromUsername} kombin istiyor
                </h3>
                {req.message && (
                  <p style={{ color: "#555", margin: "4px 0" }}>
                    📝 {req.message}
                  </p>
                )}
                <span style={{ ...styles.chip, ...chipColor(req.status) }}>
                  {statusLabel(req.status)}
                </span>
              </div>

              {req.status === "pending" && (
                <button
                  onClick={() => navigate(`/create-outfit/${req.id}`)}
                  style={styles.actionBtn}
                >
                  Kombin Yap
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function statusLabel(s) {
  switch (s) {
    case "pending": return "⏳ Bekliyor";
    case "suggested": return "✅ Gönderildi";
    case "liked": return "👍 Beğenildi";
    case "disliked": return "👎 Beğenilmedi";
    default: return s;
  }
}

function chipColor(s) {
  switch (s) {
    case "pending": return { backgroundColor: "#fff7ed", color: "#f59e0b" };
    case "suggested": return { backgroundColor: "#eff6ff", color: "#3b82f6" };
    case "liked": return { backgroundColor: "#f0fdf4", color: "#22c55e" };
    case "disliked": return { backgroundColor: "#fef2f2", color: "#ef4444" };
    default: return {};
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
    marginBottom: "12px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
  },
  chip: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold",
    marginTop: "4px",
  },
  actionBtn: {
    padding: "10px 16px",
    backgroundColor: "#f59e0b",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },
};
