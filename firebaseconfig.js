// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOLtVK9GTLqxTf4StBrm3bksbQ2mPomWc",
  authDomain: "tourbuddy-3890b.firebaseapp.com",
  projectId: "tourbuddy-3890b",
  storageBucket: "tourbuddy-3890b.appspot.com",
  messagingSenderId: "512103263500",
  appId: "1:512103263500:web:707315c48308a60f216d29",
  measurementId: "G-3ZSP4QY6S2"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Use persistence for React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Firestore instance
const db = getFirestore(app);

export { auth, db };
