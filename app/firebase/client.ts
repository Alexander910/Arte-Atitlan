"use client";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration (replace with your own if needed)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "",
};

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getApps, getApp } from "firebase/app";

export const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize a secondary app for registering new users without signing out the current admin
export const secondaryApp = getApps().find(app => app.name === "Secondary") 
  ? getApp("Secondary") 
  : initializeApp(firebaseConfig, "Secondary");

export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

// Initialize Analytics (only on client side)
export const analytics = typeof window !== "undefined" && !getApps().length ? getAnalytics(firebaseApp) : null;
