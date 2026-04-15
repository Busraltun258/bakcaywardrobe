import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const COLLECTION = "clothes";

export function subscribeClothes(ownerUid, category, callback) {
  let q;
  if (category && category !== "all") {
    q = query(
      collection(db, COLLECTION),
      where("ownerUid", "==", ownerUid),
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
  } else {
    q = query(
      collection(db, COLLECTION),
      where("ownerUid", "==", ownerUid),
      orderBy("createdAt", "desc")
    );
  }
  return onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(items);
  });
}

export async function addClothing(ownerUid, name, category, imageFile) {
  // Fotoğrafı Storage'a yükle
  const storageRef = ref(storage, `clothes/${ownerUid}/${Date.now()}_${imageFile.name}`);
  await uploadBytes(storageRef, imageFile);
  const imageUrl = await getDownloadURL(storageRef);

  // Firestore'a kaydet
  await addDoc(collection(db, COLLECTION), {
    ownerUid,
    name,
    category,
    imageUrl,
    createdAt: serverTimestamp(),
  });
}

export async function deleteClothing(id) {
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function getClothingByIds(ids) {
  const items = [];
  for (const id of ids) {
    const d = await getDoc(doc(db, COLLECTION, id));
    if (d.exists()) {
      items.push({ id: d.id, ...d.data() });
    }
  }
  return items;
}
