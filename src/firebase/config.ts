import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqlA4LMw1eBAsE70T6iw5htr7ZRcW0Nro",
  authDomain: "sallen-15c0f.firebaseapp.com",
  projectId: "sallen-15c0f",
  storageBucket: "sallen-15c0f.appspot.com",
  messagingSenderId: "924713563436",
  appId: "1:924713563436:web:40188cd1a3a022592ba889",
  measurementId: "G-VVV2FCVYBB"
};

const app = initializeApp(firebaseConfig);
let analytics = null;
if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.protocol === 'https:') {
  analytics = getAnalytics(app);
}
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth }; 