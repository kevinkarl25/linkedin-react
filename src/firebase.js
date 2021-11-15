import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCE1N8hUWFWXgcA4usodDPrH1kUuBzoD3s",
  authDomain: "linkedin-react-aca3b.firebaseapp.com",
  projectId: "linkedin-react-aca3b",
  storageBucket: "linkedin-react-aca3b.appspot.com",
  messagingSenderId: "464962019686",
  appId: "1:464962019686:web:09ec211ae14bb0618628a7",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export { app, db, auth };
