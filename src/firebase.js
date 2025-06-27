
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCIS2guArzbU-3saehhqjUh268jNK3USBk",
  authDomain: "kanban-8c7f0.firebaseapp.com",
  projectId: "kanban-8c7f0",
  storageBucket: "kanban-8c7f0.firebasestorage.app",
  messagingSenderId: "294677935901",
  appId: "1:294677935901:web:ec39f39577e01d5273d3f4",
  measurementId: "G-2RKN60XPG8"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const fbFunctions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(fbFunctions, "localhost", 5001);
}