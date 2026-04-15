import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

interface Comment {
  uid: string;
  name: string;
  text: string;
  createdAt: string;
  role: "admin" | "user";
}

interface SuggestionData {
  advisorUid: string;
  advisorName: string;
  targetUid: string;
  targetName: string;
  clothingIds: string[];
  note: string;
  status: string;
  comments: Comment[];
  createdAt: any;
}

interface ClothingItem {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
}

const AdminSuggestionDetail: React.FC = () => {
  const { suggestionId } = useParams<{ suggestionId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [suggestion, setSuggestion] = useState<SuggestionData | null>(null);
  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!suggestionId) return;

    const fetchSuggestion = async () => {
      try {
        const docSnap = await getDoc(doc(db, "outfitSuggestions", suggestionId));
        if (!docSnap.exists()) {
          setLoading(false);
          return;
        }

        const data = docSnap.data() as SuggestionData;
        setSuggestion(data);

        // Kıyafetleri al
        if (data.targetUid && data.clothingIds?.length > 0) {
          const clothesSnap = await getDocs(
            collection(db, "users", data.targetUid, "clothes")
          );
          const allClothes = clothesSnap.docs.map((d) => ({
            id: d.id,
            name: d.data().name ?? "İsimsiz",
            imageUrl: d.data().imageUrl ?? "",
            category: d.data().category ?? "",
          }));
          // Sadece önerideki kıyafetleri filtrele
          const filtered = allClothes.filter((c) =>
            data.clothingIds.includes(c.id)
          );
          setClothes(filtered);
        }
      } catch (error) {
        console.error("Fetch suggestion error:", error);
      }
      setLoading(false);
    };

    fetchSuggestion();
  }, [suggestionId]);

  const handleSendComment = async () => {
    if (!newComment.trim() || !user || !suggestionId) return;

    setSending(true);
    try {
      const comment: Comment = {
        uid: user.uid,
        name: user.displayName || user.email || "Admin",
        text: newComment.trim(),
        createdAt: new Date().toISOString(),
        role: "admin",
      };

      await updateDoc(doc(db, "outfitSuggestions", suggestionId), {
        comments: arrayUnion(comment),
        updatedAt: serverTimestamp(),
      });

      setSuggestion((prev) =>
        prev ? { ...prev, comments: [...(prev.comments || []), comment] } : prev
      );
      setNewComment("");
    } catch (error) {
      console.error("Send comment error:", error);
      alert("Yorum gönderilirken hata oluştu!");
    }
    setSending(false);
  };

  const handleNewSuggestion = () => {
    if (suggestion?.targetUid) {
      navigate(`/admin/users/${suggestion.targetUid}`);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 60, color: "#666" }}>
        Yükleniyor...
      </div>
    );
  }

  if (!suggestion) {
    return (
      <div style={{ textAlign: "center", padding: 60, color: "#666" }}>
        Öneri bulunamadı.
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo} onClick={() => navigate("/admin")}>
          👗 Stil Danışmanı
        </div>
        <button onClick={() => navigate("/admin")} style={styles.backBtn}>
          ← Geri
        </button>
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>👔 Kombin Detayı</h1>
        <p style={styles.subtitle}>
          Kullanıcı: <strong>{suggestion.targetName}</strong>
        </p>

        {/* Öneri notu */}
        {suggestion.note && (
          <div style={styles.noteBox}>
            <strong>📝 Notunuz:</strong> {suggestion.note}
          </div>
        )}

        {/* Seçilen kıyafetler */}
        <h2 style={styles.sectionTitle}>Seçilen Kıyafetler</h2>
        <div style={styles.clothesGrid}>
          {clothes.length > 0 ? (
            clothes.map((item) => (
              <div key={item.id} style={styles.clothCard}>
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={styles.clothImage}
                  />
                ) : (
                  <div style={styles.noImage}>👕</div>
                )}
                <div style={styles.clothName}>{item.name}</div>
              </div>
            ))
          ) : (
            <p style={{ color: "#888" }}>Kıyafet bilgisi yüklenemedi.</p>
          )}
        </div>

        {/* Yorumlar bölümü */}
        <h2 style={styles.sectionTitle}>💬 Yorumlar</h2>
        <div style={styles.commentsBox}>
          {(suggestion.comments || []).length === 0 ? (
            <p style={{ color: "#888", textAlign: "center", padding: 20 }}>
              Henüz yorum yok.
            </p>
          ) : (
            (suggestion.comments || []).map((c, i) => (
              <div
                key={i}
                style={{
                  ...styles.commentBubble,
                  alignSelf: c.role === "admin" ? "flex-end" : "flex-start",
                  backgroundColor: c.role === "admin" ? "#E9D5FF" : "#F3F4F6",
                }}
              >
                <div style={styles.commentHeader}>
                  <strong>{c.name}</strong>
                  <span style={styles.commentRole}>
                    {c.role === "admin" ? "👨‍💼 Danışman" : "👤 Kullanıcı"}
                  </span>
                </div>
                <p style={{ margin: "4px 0 0" }}>{c.text}</p>
                <span style={styles.commentDate}>
                  {new Date(c.createdAt).toLocaleString("tr-TR")}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Yorum gönder */}
        <div style={styles.commentInput}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Feedback veya yorum yazın..."
            style={styles.textarea}
            rows={2}
          />
          <button
            onClick={handleSendComment}
            disabled={!newComment.trim() || sending}
            style={{
              ...styles.sendBtn,
              opacity: !newComment.trim() || sending ? 0.5 : 1,
            }}
          >
            {sending ? "Gönderiliyor..." : "Yorum Gönder"}
          </button>
        </div>

        {/* Tekrar öneri butonu */}
        <button onClick={handleNewSuggestion} style={styles.newSuggestionBtn}>
          🔄 Bu Kullanıcıya Yeni Kombin Öner
        </button>
      </main>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { minHeight: "100vh", backgroundColor: "#F5F3FF" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    backgroundColor: "#1F2937",
    color: "#fff",
  },
  logo: { fontSize: 20, fontWeight: "bold", cursor: "pointer" },
  backBtn: {
    padding: "8px 16px",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#7C3AED",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  main: { maxWidth: 800, margin: "0 auto", padding: 24 },
  title: { fontSize: 28, color: "#6B21A8", marginBottom: 4 },
  subtitle: { color: "#666", marginBottom: 20, fontSize: 16 },
  noteBox: {
    backgroundColor: "#FEF3C7",
    padding: "12px 20px",
    borderRadius: 12,
    marginBottom: 24,
    color: "#92400E",
  },
  sectionTitle: {
    fontSize: 18,
    color: "#6B21A8",
    marginBottom: 12,
    marginTop: 24,
    borderBottom: "2px solid #E9D5FF",
    paddingBottom: 8,
  },
  clothesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
    gap: 12,
  },
  clothCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    textAlign: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
  },
  clothImage: {
    width: "100%",
    height: 110,
    objectFit: "cover",
    borderRadius: 8,
  },
  noImage: {
    width: "100%",
    height: 110,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 36,
    backgroundColor: "#F3E8FF",
    borderRadius: 8,
  },
  clothName: { fontSize: 12, marginTop: 6, color: "#333" },
  commentsBox: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    minHeight: 100,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  commentBubble: {
    padding: "10px 16px",
    borderRadius: 12,
    maxWidth: "80%",
  },
  commentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
  },
  commentRole: { fontSize: 11, color: "#888" },
  commentDate: { fontSize: 11, color: "#aaa", marginTop: 4, display: "block" },
  commentInput: {
    marginTop: 16,
    display: "flex",
    gap: 12,
    alignItems: "flex-end",
  },
  textarea: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    border: "1px solid #ddd",
    fontSize: 14,
    resize: "none",
  },
  sendBtn: {
    padding: "12px 24px",
    borderRadius: 12,
    border: "none",
    backgroundColor: "#7C3AED",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 14,
    whiteSpace: "nowrap",
  },
  newSuggestionBtn: {
    marginTop: 24,
    width: "100%",
    padding: "14px 24px",
    borderRadius: 12,
    border: "2px dashed #7C3AED",
    backgroundColor: "transparent",
    color: "#7C3AED",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 16,
  },
};

export default AdminSuggestionDetail;
