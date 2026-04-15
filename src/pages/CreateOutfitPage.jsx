import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

const CATEGORIES = [
  { key: "all", label: "Tümü", icon: "👕" },
  { key: "ust", label: "Üst", icon: "👔" },
  { key: "alt", label: "Alt", icon: "👖" },
  { key: "ayakkabi", label: "Ayakkabı", icon: "👟" },
  { key: "aksesuar", label: "Aksesuar", icon: "⌚" },
  { key: "dis_giyim", label: "Dış Giyim", icon: "🧥" },
];

export default function CreateOutfitPage() {
  const { requestId } = useParams();
  const [request, setRequest] = useState(null);
  const [clothes, setClothes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterCat, setFilterCat] = useState("all");
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  // Talebi yükle
  useEffect(() => {
    const loadRequest = async () => {
      const snap = await getDoc(doc(db, "outfitRequests", requestId));
      if (snap.exists()) {
        setRequest({ id: snap.id, ...snap.data() });
      }
    };
    loadRequest();
  }, [requestId]);

  // Kamuran'ın dolabını yükle
  useEffect(() => {
    if (!request) return;
    const q = query(
      collection(db, "clothes"),
      where("ownerId", "==", request.fromUid)
    );
    const unsub = onSnapshot(q, (snap) => {
      setClothes(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [request]);

  const toggleItem = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSend = async () => {
    if (selectedIds.length === 0) {
      alert("En az 1 parça seçmelisin!");
      return;
    }
    setSending(true);
    try {
      await updateDoc(doc(db, "outfitRequests", requestId), {
        suggestedClothingIds: selectedIds,
        status: "suggested",
      });
      alert("Kombin önerisi gönderildi! 🎉");
      navigate("/incoming-requests");
    } catch (err) {
      alert("Hata: " + err.message);
    } finally {
      setSending(false);
    }
  };

  const filtered =
    filterCat === "all"
      ? clothes
      : clothes.filter((c) => c.category === filterCat);

  if (!request) {
    return (
      <div style={styles.container}>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <button onClick={() => navigate("/incoming-requests")} style={styles.backBtn}>
          ← Geri
        </button>
        <h1 style={styles.title}>
          {request.fromUsername} için Kombin Yap
        </h1>

        {request.message && (
          <div style={styles.noteBox}>
            <strong>Not:</strong> {request.message}
          </div>
        )}

        {/* Kategori filtreleme */}
        <div style={styles.filterRow}>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilterCat(c.key)}
              style={filterCat === c.key ? styles.filterActive : styles.filterBtn}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {/* Kıyafet grid */}
        <div style={styles.grid}>
          {filtered.length === 0 && (
            <p style={{ color: "#999", textAlign: "center", width: "100%" }}>
              Bu kategoride kıyafet yok.
            </p>
          )}
          {filtered.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                style={{
                  ...styles.clothCard,
                  border: isSelected
                    ? "3px solid #7c3aed"
                    : "1px solid #e5e7eb",
                }}
              >
                <img src={item.imageUrl} alt={item.name} style={styles.clothImg} />
                <p style={styles.clothName}>{item.name}</p>
                {isSelected && <span style={styles.check}>✓</span>}
              </div>
            );
          })}
        </div>

        {/* Gönder */}
        <p style={{ color: "#888", marginTop: "16px" }}>
          {selectedIds.length} parça seçildi
        </p>
        <button onClick={handleSend} style={styles.sendBtn} disabled={sending}>
          {sending ? "Gönderiliyor..." : "🚀 Öneriyi Gönder"}
        </button>
      </div>
    </div>
  );
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
    maxWidth: "700px",
  },
  backBtn: {
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    color: "#7c3aed",
    marginBottom: "8px",
  },
  title: { textAlign: "center", color: "#5b21b6", marginBottom: "16px" },
  noteBox: {
    backgroundColor: "#f3f0ff",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "16px",
  },
  filterRow: { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" },
  filterBtn: {
    padding: "8px 14px",
    border: "1px solid #ddd",
    borderRadius: "20px",
    backgroundColor: "#f3f0ff",
    cursor: "pointer",
    fontSize: "13px",
  },
  filterActive: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "20px",
    backgroundColor: "#7c3aed",
    color: "#fff",
    cursor: "pointer",
    fontSize: "13px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
    gap: "12px",
  },
  clothCard: {
    borderRadius: "12px",
    overflow: "hidden",
    textAlign: "center",
    cursor: "pointer",
    position: "relative",
    transition: "border 0.2s",
  },
  clothImg: { width: "100%", height: "120px", objectFit: "cover" },
  clothName: { margin: "6px 0", fontSize: "13px", fontWeight: "bold" },
  check: {
    position: "absolute",
    top: "6px",
    right: "6px",
    backgroundColor: "#7c3aed",
    color: "#fff",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
  sendBtn: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#7c3aed",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "8px",
  },
};
