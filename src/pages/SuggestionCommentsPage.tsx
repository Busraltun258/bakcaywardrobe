import React, { useEffect, useState, useRef } from "react";
import { auth } from "../firebase";
import { SuggestionComment } from "../models/SuggestionComment";
import {
  addComment,
  subscribeCommentsForSuggestion,
} from "../services/suggestionCommentService";

interface Props {
  suggestionId: string;
  suggestionNote: string;
  advisorUid?: string;
}

const SuggestionCommentsPage: React.FC<Props> = ({
  suggestionId,
  suggestionNote,
  advisorUid = "",
}) => {
  const [comments, setComments] = useState<SuggestionComment[]>([]);
  const [text, setText] = useState("");
  const listEndRef = useRef<HTMLDivElement>(null);
  const user = auth.currentUser;

  useEffect(() => {
    const unsub = subscribeCommentsForSuggestion(suggestionId, (c) => {
      setComments(c);
      setTimeout(() => listEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });
    return unsub;
  }, [suggestionId]);

  const handleSend = async () => {
    if (!text.trim() || !user) return;
    await addComment({
      suggestionId,
      authorUid: user.uid,
      advisorUid,
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

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Yorumlar</h2>

      {suggestionNote && (
        <div style={styles.noteBox}>
          <strong style={{ color: "#6B21A8" }}>Kombin Notu:</strong>
          <p style={{ margin: "4px 0 0" }}>{suggestionNote}</p>
        </div>
      )}

      <div style={styles.commentsList}>
        {comments.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999" }}>Henüz yorum yok.</p>
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
                <span style={{ fontWeight: "bold", fontSize: 12 }}>
                  {c.authorName}
                </span>
                <p style={{ margin: "4px 0" }}>{c.text}</p>
                <span style={{ fontSize: 10, color: "#888" }}>
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

      <div style={styles.inputRow}>
        <input
          type="text"
          placeholder="Yorumunuzu yazın..."
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
    height: "100%",
    maxWidth: 600,
    margin: "0 auto",
  },
  title: {
    padding: 16,
    margin: 0,
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

export default SuggestionCommentsPage;
