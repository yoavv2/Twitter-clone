import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAL0oPPm8X5_bLN9dbn1whfXT4X5QEZeeg",
  authDomain: "twitter-clone-d0f4c.firebaseapp.com",
  projectId: "twitter-clone-d0f4c",
  storageBucket: "twitter-clone-d0f4c.appspot.com",
  messagingSenderId: "920476365677",
  appId: "1:920476365677:web:9c9cd9c07a09fcfe5c6064"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };




