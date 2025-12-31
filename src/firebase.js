// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Debug: Check if config is loaded (Do not log full keys for security in public)
console.log("Firebase Config Status:", {
    apiKey: firebaseConfig.apiKey ? `Loaded (${firebaseConfig.apiKey.length} chars)` : "Missing",
    authDomain: firebaseConfig.authDomain ? "Loaded" : "Missing",
    projectId: firebaseConfig.projectId ? `Loaded: ${firebaseConfig.projectId}` : "Missing",
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Use initializeFirestore with experimentalForceLongPolling to avoid "client offline" issues
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

export { db };
