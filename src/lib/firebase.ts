// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA_K8_9K6WjQy-QcyzI6eJTIkQuDl3J53w",
  authDomain: "my-guitar-app-2c44f.firebaseapp.com",
  projectId: "my-guitar-app-2c44f",
  storageBucket: "my-guitar-app-2c44f.appspot.com",
  messagingSenderId: "798120864834",
  appId: "1:798120864834:web:a3dcb7dd522550962a51db",
  measurementId: "G-XKTMF6GETE",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
setPersistence(auth, browserLocalPersistence).catch(console.error);