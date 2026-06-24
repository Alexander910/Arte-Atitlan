"use client";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "./client";

export const signInWithGoogle = async () => {
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    // No need to return; auth state listener will update context
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};
