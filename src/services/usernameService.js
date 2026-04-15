import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export async function registerWithUsername(username, email, password) {
  const lower = username.toLowerCase();

  // Kullanıcı adı alınmış mı?
  const usernameDoc = await getDoc(doc(db, "usernames", lower));
  if (usernameDoc.exists()) {
    throw new Error("Bu kullanıcı adı zaten alınmış!");
  }

  // Firebase Auth kaydı
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  // Firestore'a kullanıcı adı eşlemesi
  await setDoc(doc(db, "usernames", lower), {
    email,
    uid: cred.user.uid,
  });

  // Kullanıcı profili
  await setDoc(doc(db, "users", cred.user.uid), {
    username: lower,
    email,
    createdAt: serverTimestamp(),
  });

  return cred.user;
}

export async function loginWithUsername(username, password) {
  const lower = username.toLowerCase();

  const usernameDoc = await getDoc(doc(db, "usernames", lower));
  if (!usernameDoc.exists()) {
    throw new Error("Kullanıcı adı bulunamadı!");
  }

  const email = usernameDoc.data().email;
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}
