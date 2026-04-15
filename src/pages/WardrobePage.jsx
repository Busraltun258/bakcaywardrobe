import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { key: "ust", label: "Üst Giyim", icon: "👔" },
  { key: "alt", label: "Alt Giyim", icon: "👖" },
  { key: "ayakkabi", label: "Ayakkabı", icon: "👟" },
  { key: "aksesuar", label: "Aksesuar", icon: "⌚" },
  { key: "dis_giyim", label: "Dış Giyim", icon: "🧥" },
];

export default function WardrobePage() {
  const [clothes, setClothes] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("ust");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [filterCat, setFilterCat] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      navigate("/login");
      return;
    }

    const q = query(collection(db, "clothes"), where("ownerId", "==", uid));
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setClothes(items);
    });
    return () => unsub();
  }, [navigate]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !name.trim()) return;
    setUploading(true);

    try {
      const uid = auth.currentUser.uid;
      const storageRef = ref(storage, `clothes/${uid}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, "clothes"), {
        ownerId: uid,
        name: name.trim(),
        category,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      setName("");
      setFile(null);
      document.getElementById("fileInput").value = "";
    } catch (err) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu kıyafeti silmek istediğine emin misin?")) {
      await deleteDoc(doc(db, "clothes", id));
    }
  };

  const filtered =
    filterCat === "all"
      ? clothes
      : clothes.filter((c) => c.category === filterCat);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <button onClick={() => navigate("/")} style={styles.backBtn}>
          ← Geri
        </button>
        <h1 style={styles.title}>👗 Dolabım</h1>

        {/* Yeni kıyafet ekleme formu */}
        <form onSubmit={handleUpload} style={styles.form}>
          <input
            type="text"
            placeholder="Kıyafet adı"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
          >
            {CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.icon} {c.label}
              </option>
            ))}
          </select>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button} disabled={uploading}>
            {uploading ? "Yükleniyor..." : "Kıyafet Ekle"}
          </button>
        </form>

        {/* Kategori filtreleme */}
        <div style={styles.filterRow}>
          <button
            onClick={() => setFilterCat("all")}
            style={filterCat === "all" ? styles.filterActive : styles.filterBtn}
          >
            Tümü
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilterCat(c.key)}
              style={
                filterCat === c.key ? styles.filterActive : styles.filterBtn
              }
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {/* Kıyafet listesi */}
        <div style={styles.grid}>
          {filtered.length === 0 && (
            <p style={{ color: "#999", textAlign: "center", width: "100%" }}>
              Henüz kıyafet yok.
            </p>
          )}
          {filtered.map((item) => (
            <div key={item.id} style={styles.clothCard}>
              <img src={item.imageUrl} alt={item.name} style={styles.clothImg} />
              <p style={styles.clothName}>{item.name}</p>
              <p style={styles.clothCat}>
                {CATEGORIES.find((c) => c.key === item.category)?.label || item.category}
              </p>
              <button onClick={() => handleDelete(item.id)} style={styles.deleteBtn}>
                🗑️ Sil
              </button>
            </div>
          ))}
        </div>
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
  title: { textAlign: "center", color: "#5b21b6", marginBottom: "24px" },
  form: { display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" },
  input: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box",
  },
  button: {
    padding: "12px",
    backgroundColor: "#7c3aed",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
  filterRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "20px",
  },
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
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "16px",
  },
  clothCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    overflow: "hidden",
    textAlign: "center",
  },
  clothImg: { width: "100%", height: "140px", objectFit: "cover" },
  clothName: { margin: "8px 0 2px", fontWeight: "bold", fontSize: "14px" },
  clothCat: { margin: "0 0 8px", fontSize: "12px", color: "#888" },
  deleteBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    color: "#ef4444",
    marginBottom: "8px",
  },
};
