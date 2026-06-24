"use client";

import { createContext, useContext, useEffect, useState, ReactNode, createElement } from "react";
import { getAuth, onAuthStateChanged, User, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "./client";

export const signInWithEmail = async (email: string, password: string) => {
  const auth = getAuth(firebaseApp);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // auth state listener will update context
  } catch (error) {
    console.error("Email sign-in error:", error);
    throw error;
  }
};

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  role?: string;
}

const AuthContext = createContext<AuthContextProps>({ user: null, loading: true, role: undefined });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, async (usr) => {
      setUser(usr);
      if (usr && usr.email) {
        try {
          const { doc, getDoc } = await import("firebase/firestore");
          const { db } = await import("./client");
          const docRef = doc(db, "users", usr.email);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setRole(docSnap.data().role);
          } else {
            // Fallback for initial admins
            const adminEmails = ["admin@example.com", "aldopoblo@gmail.com", "humbertopablo12@gmail.com"];
            if (adminEmails.includes(usr.email)) {
              setRole("admin");
            } else {
              setRole(undefined);
            }
          }
        } catch (error) {
          console.error("Error fetching role from Firestore:", error);
          setRole(undefined);
        }
      } else {
        setRole(undefined);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Return Provider without JSX (compatible with .ts file)
  return createElement(AuthContext.Provider, { value: { user, loading, role } }, children);
};

export const useAuth = () => useContext(AuthContext);
