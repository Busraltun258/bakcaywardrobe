import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

interface ClothingItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  color?: string;
}

const AdminUserWardrobe: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        // Kullanıcı bilgisini al
        const profileDoc = await getDoc(doc(db, "profiles", userId));
        if (profileDoc.exists()) {
          const data = profileDoc.data();
          setUserName(data.displayName || data.email || "Kullanıcı");
        }

        // Kullanıcının kıyafetlerini al
        const clothesSnap = await getDocs(
          collection(db, "users", userId, "clothes")
        );
        const items = clothesSnap.docs.map((d) => ({
          id: d.id,
          name: d.data().name ?? "İsimsiz",
          category: d.data().category ?? "",
          imageUrl: d.data().imageUrl ?? "",
          color: d.data().color ?? "",
        }));
        setClothes(items);
      } catch (error) {
        console.error("Fetch error:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSendSuggestion = async () => {
    if (!user || !userId || selectedItems.length === 0) return;

    setSending(true);
    try {
      await addDoc(collection(db, "outfitSuggestions"), {
        advisorUid: user.uid,
        advisorName: user.displayName || user.email,
        targetUid: userId,
        targetName: userName,
        clothingIds: selectedItems,
        note: note.trim(),
        createdAt: serverTimestamp(),
        status: "pending",
        comments: [],
      });
      setSuccess(true);
      setSelectedItems([]);
      setNote("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Send suggestion error:", error);
      alert("Öneri gönderilirken hata oluştu!");
    }
    setSending(false);
  };

  // Kategorilere göre grupla
  const grouped: Record<string, ClothingItem[]> = {};
  clothes.forEach((item) => {
    const cat = item.category || "Diğer";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  });

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo} onClick={() => navigate("/admin")}>
          👗 Stil Danışmanı
        </div>
        <div style={styles.headerButtons}>
          <button onClick={() => navigate("/admin/users")} style={styles.backBtn}>
            ← Kullanıcılar
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>👕 {userName} - Dolap</h1>
        <p style={styles.subtitle}>
          Kıyafetleri seçip kombin önerisi yapın
        </p>

        {success && (
          <div style={styles.successMsg}>
            ✅ Kombin önerisi başarıyla gönderildi!
          </div>
        )}

        {loading ? (
          <div style={styles.center}>Yükleniyor...</div>
        ) : clothes.length === 0 ? (
          <div style={styles.emptyState}>
            <span style={{ fontSize: 48 }}>👕</span>
            <p>Bu kullanıcının dolabında henüz kıyafet yok.</p>
          </div>
        ) : (
          <>
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category} style={{ marginBottom: 24 }}>
                <h2 style={styles.categoryTitle}>{category}</h2>
                <div style={styles.clothesGrid}>
                  {items.map((item) => {
                    const isSelected = selectedItems.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        style={{
                          ...styles.clothCard,
                          border: isSelected
                            ? "3px solid #7C3AED"
                            : "3px solid transparent",
                          opacity: isSelected ? 1 : 0.8,
                        }}
                        onClick={() => toggleItem(item.id)}
                      >
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
                        {isSelected && <div style={styles.checkMark}>✓</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Öneri gönderme bölümü */}
            <div style={styles.suggestionBox}>
              <h3 style={{ marginBottom: 12, color: "#6B21A8" }}>
                💡 Kombin Önerisi ({selectedItems.length} parça seçili)
              </h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Kombin hakkında notunuzu yazın... (örn: Bu kombinle şık bir akşam yemeği görünümü yaratabilirsiniz)"
                style={styles.textarea}
                rows={3}
              />
              <button
                onClick={handleSendSuggestion}
                disabled={selectedItems.length === 0 || sending}
                style={{
                  ...styles.sendBtn,
                  opacity: selectedItems.length === 0 || sending ? 0.5 : 1,
                }}
              >
                {sending ? "Gönderiliyor..." : "Kombin Önerisi Gönder 🚀"}
              </button>
            </div>
          </>
        )}
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
  headerButtons: { display: "flex", gap: 12 },
  backBtn: {
    padding: "8px 16px",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#7C3AED",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  main: { maxWidth: 900, margin: "0 auto", padding: 24 },
  title: { fontSize: 28, color: "#6B21A8", marginBottom: 8 },
  subtitle: { color: "#666", marginBottom: 24 },
  center: { textAlign: "center", padding: 40, color: "#666" },
  emptyState: {
    textAlign: "center",
    padding: 60,
    backgroundColor: "#fff",
    borderRadius: 16,
    color: "#666",
  },
  successMsg: {
    backgroundColor: "#D1FAE5",
    color: "#065F46",
    padding: "12px 20px",
    borderRadius: 12,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  categoryTitle: {
    fontSize: 18,
    color: "#6B21A8",
    marginBottom: 12,
    borderBottom: "2px solid #E9D5FF",
    paddingBottom: 8,
  },
  clothesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: 12,
  },
  clothCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    textAlign: "center",
    cursor: "pointer",
    position: "relative",
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
    transition: "all 0.2s",
  },
  clothImage: {
    width: "100%",
    height: 120,
    objectFit: "cover",
    borderRadius: 8,
  },
  noImage: {
    width: "100%",
    height: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 40,
    backgroundColor: "#F3E8FF",
    borderRadius: 8,
  },
  clothName: { fontSize: 13, marginTop: 6, color: "#333" },
  checkMark: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#7C3AED",
    color: "#fff",
    width: 24,
    height: 24,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  suggestionBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginTop: 24,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  textarea: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: 14,
    resize: "vertical",
    boxSizing: "border-box",
    marginBottom: 12,
  },
  sendBtn: {
    width: "100%",
    padding: "12px 24px",
    borderRadius: 12,
    border: "none",
    backgroundColor: "#7C3AED",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 16,
  },
};

export default AdminUserWardrobe;
