// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhaduefE2OHV5eyYW2yqZaL2J1wiN6DnI",
  authDomain: "property-rental-platform-50223.firebaseapp.com",
  projectId: "property-rental-platform-50223",
  storageBucket: "property-rental-platform-50223.appspot.com",
  messagingSenderId: "939606838626",
  appId: "1:939606838626:web:b0a5b5855a86e5bcbf303b",
  measurementId: "G-Z5V815KFBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication

export { auth }; // Export the auth object for use in other files
