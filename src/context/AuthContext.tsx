import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);


  const logout = async () => {
    await auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("=== AUTH STATE CHANGED ===");
      console.log("User:", firebaseUser?.uid ?? "null");
      console.log("Email:", firebaseUser?.email ?? "null");
      
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const profileDoc = await getDoc(doc(db, "profiles", firebaseUser.uid));
          const profileData = profileDoc.data();
          const adminStatus = profileData?.isAdmin === true;
          setIsAdmin(adminStatus);
          console.log("Profile exists:", profileDoc.exists());
          console.log("Is Admin:", adminStatus);
        } catch (error) {
          console.error("Profile fetch error:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
      console.log("=== AUTH CHECK COMPLETE ===");
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
