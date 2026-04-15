import { DocumentData, QueryDocumentSnapshot, Timestamp, serverTimestamp } from "firebase/firestore";

export interface SuggestionComment {
  id: string;
  suggestionId: string;
  authorUid: string;
  advisorUid: string;
  authorName: string;
  text: string;
  createdAt: Date;
}

export function suggestionCommentFromFirestore(
  doc: QueryDocumentSnapshot<DocumentData>
): SuggestionComment {
  const data = doc.data();
  return {
    id: doc.id,
    suggestionId: data.suggestionId ?? "",
    authorUid: data.authorUid ?? "",
    advisorUid: data.advisorUid ?? "",
    authorName: data.authorName ?? "Anonim",
    text: data.text ?? "",
    createdAt: (data.createdAt as Timestamp)?.toDate() ?? new Date(),
  };
}

export function suggestionCommentToMap(
  comment: Omit<SuggestionComment, "id" | "createdAt">
): Record<string, unknown> {
  return {
    suggestionId: comment.suggestionId,
    authorUid: comment.authorUid,
    advisorUid: comment.advisorUid,
    authorName: comment.authorName,
    text: comment.text,
    createdAt: serverTimestamp(),
  };
}
