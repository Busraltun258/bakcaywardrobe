import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  SuggestionComment,
  suggestionCommentFromFirestore,
  suggestionCommentToMap,
} from "../models/SuggestionComment";

const COLLECTION = "suggestionComments";

export function addComment(
  comment: Omit<SuggestionComment, "id" | "createdAt">
): Promise<void> {
  const ref = collection(db, COLLECTION);
  return addDoc(ref, suggestionCommentToMap(comment)).then(() => undefined);
}

export function subscribeCommentsForSuggestion(
  suggestionId: string,
  callback: (comments: SuggestionComment[]) => void
): Unsubscribe {
  const q = query(
    collection(db, COLLECTION),
    where("suggestionId", "==", suggestionId),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(q, (snap) => {
    const comments = snap.docs.map(suggestionCommentFromFirestore);
    callback(comments);
  });
}

export function subscribeCommentsForAdvisor(
  advisorUid: string,
  callback: (comments: SuggestionComment[]) => void
): Unsubscribe {
  const q = query(
    collection(db, COLLECTION),
    where("advisorUid", "==", advisorUid),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    const comments = snap.docs.map(suggestionCommentFromFirestore);
    callback(comments);
  });
}

export function subscribeCommentCountForSuggestion(
  suggestionId: string,
  callback: (count: number) => void
): Unsubscribe {
  const q = query(
    collection(db, COLLECTION),
    where("suggestionId", "==", suggestionId)
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.length);
  });
}
