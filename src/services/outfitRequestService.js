import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const COLLECTION = "outfitRequests";

export async function createRequest(toUid, fromUsername, toUsername, message) {
  await addDoc(collection(db, COLLECTION), {
    fromUid: auth.currentUser.uid,
    toUid,
    fromUsername,
    toUsername,
    message: message || null,
    status: "pending",
    suggestedClothingIds: [],
    feedbackMessage: null,
    createdAt: serverTimestamp(),
  });
}

export function subscribeMyRequests(callback) {
  const q = query(
    collection(db, COLLECTION),
    where("fromUid", "==", auth.currentUser.uid),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export function subscribeIncomingRequests(callback) {
  const q = query(
    collection(db, COLLECTION),
    where("toUid", "==", auth.currentUser.uid),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function suggestOutfit(requestId, clothingIds) {
  await updateDoc(doc(db, COLLECTION, requestId), {
    suggestedClothingIds: clothingIds,
    status: "suggested",
    respondedAt: serverTimestamp(),
  });
}

export async function giveFeedback(requestId, liked) {
  await updateDoc(doc(db, COLLECTION, requestId), {
    status: liked ? "liked" : "disliked",
  });
}
