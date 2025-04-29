// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
import { database } from "firebase-admin";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "romie-startups.firebaseapp.com",
  projectId: "romie-startups",
  storageBucket: "romie-startups.firebasestorage.app",
  messagingSenderId: "221485420025",
  appId: "1:221485420025:web:d708601d00b334c89a0128",
  measurementId: "G-K4WJTK376W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);
