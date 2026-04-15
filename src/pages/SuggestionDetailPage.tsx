import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { SuggestionComment } from "../models/SuggestionComment";
import {
  addComment,
  subscribeCommentsForSuggestion,
} from "../services/suggestionCommentService";

interface SuggestionData {
  advisorUid: string;
  note: string;
  clothingIds: string[];
  [key: string]: unknown;
}

const SuggestionDetailPage: React.FC = () => {
  const { suggestionId } = useParams<{ suggestionId: string }>();
  const [suggestion, setSuggestion] = useState<SuggestionData | null>(null);
  const [comments, setComments] = useState<SuggestionComment[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const listEndRef = useRef<HTMLDivElement>(null);

  const user = auth.currentUser;

  // Load suggestion data
  useEffect(() => {
    if (!suggestionId) return;
    getDoc(doc(db, "outfitSuggestions", suggestionId)).then((snap) => {
      if (snap.exists()) {
        const data = snap.data() as SuggestionData;
        setSuggestion(data);
      }
      setLoading(false);
    });
  }, [suggestionId]);

  // Subscribe to comments
  useEffect(() => {
    if (!suggestionId) return;
    const unsub = subscribeCommentsForSuggestion(suggestionId, (c) => {
      setComments(c);
      setTimeout(() => listEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });
    return unsub;
  }, [suggestionId]);

  const handleSend = async () => {
    if (!text.trim() || !user || !suggestion || !suggestionId) return;
    await addComment({
      suggestionId,
      authorUid: user.uid,
      advisorUid: suggestion.advisorUid ?? "",
      authorName: user.displayName ?? "Kullanıcı",
      text: text.trim(),
    });
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (loading) {
    return <div style={styles.center}>Yükleniyor...</div>;
  }

  if (!suggestion) {
    return <div style={styles.center}>Öneri bulunamadı.</div>;
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={{ margin: 0, color: "#6B21A8" }}>Kombin Detay</h2>
      </div>

      {/* Suggestion info */}
      <div style={styles.noteBox}>
        <strong style={{ color: "#6B21A8" }}>Kombin Notu:</strong>
        <p style={{ margin: "4px 0 0" }}>{suggestion.note || "Not yok"}</p>
        <span style={{ color: "#888", fontSize: 13 }}>
          {suggestion.clothingIds?.length ?? 0} parça seçildi
        </span>
      </div>

      {/* Comments */}
      <div style={styles.commentsList}>
        {comments.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999" }}>
            Henüz yorum yok. İlk yorumu siz yazın!
          </p>
        ) : (
          comments.map((c) => {
            const isMe = c.authorUid === user?.uid;
            return (
              <div
                key={c.id}
                style={{
                  ...styles.bubble,
                  alignSelf: isMe ? "flex-end" : "flex-start",
                  backgroundColor: isMe ? "#E9D5FF" : "#F3F4F6",
                }}
              >
                <span style={styles.authorName}>{c.authorName}</span>
                <p style={{ margin: "4px 0" }}>{c.text}</p>
                <span style={styles.timestamp}>
                  {c.createdAt.toLocaleDateString("tr-TR")}{" "}
                  {c.createdAt.toLocaleTimeString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            );
          })
        )}
        <div ref={listEndRef} />
      </div>

      {/* Input */}
      <div style={styles.inputRow}>
        <input
          type="text"
          placeholder="Yorum yazın..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.sendButton}>
          Gönder
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    maxWidth: 600,
    margin: "0 auto",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  header: {
    padding: 16,
    borderBottom: "1px solid #E5E7EB",
  },
  noteBox: {
    padding: 16,
    backgroundColor: "#F5F3FF",
    borderBottom: "1px solid #E5E7EB",
  },
  commentsList: {
    flex: 1,
    overflowY: "auto",
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  bubble: {
    maxWidth: "75%",
    padding: "10px 14px",
    borderRadius: 16,
  },
  authorName: {
    fontWeight: "bold",
    fontSize: 12,
  },
  timestamp: {
    fontSize: 10,
    color: "#888",
  },
  inputRow: {
    display: "flex",
    gap: 8,
    padding: "8px 12px",
    borderTop: "1px solid #E5E7EB",
  },
  input: {
    flex: 1,
    padding: "10px 16px",
    borderRadius: 24,
    border: "1px solid #D1D5DB",
    outline: "none",
    fontSize: 14,
  },
  sendButton: {
    padding: "10px 20px",
    borderRadius: 24,
    border: "none",
    backgroundColor: "#7C3AED",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default SuggestionDetailPage;
