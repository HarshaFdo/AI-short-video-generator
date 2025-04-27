// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-video-generator-3141a.firebaseapp.com",
  projectId: "ai-video-generator-3141a",
  storageBucket: "ai-video-generator-3141a.firebasestorage.app",
  messagingSenderId: "62880876897",
  appId: "1:62880876897:web:37926aa6a018cb8fe89d20",
  measurementId: "G-5KXF6LX4XV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);
