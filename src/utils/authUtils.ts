import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export interface UserProfile {
  isAdmin: boolean;
  // Add other profile fields as needed
}

export async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const docRef = doc(db, "profiles", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as UserProfile;
      console.log(`User ${uid} is admin: ${data.isAdmin}`);
      return data;
    } else {
      console.log(`Profile not found for user ${uid}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}
