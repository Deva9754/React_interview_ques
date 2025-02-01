// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';  // Firebase Authentication imports
// import { getAnalytics } from 'firebase/analytics';  
// import { getFirestore } from 'firebase/firestore';  // Import Firestore


// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBmT88OlyV6_GGHOIozTfe_ZxozdH53f8M",
//   authDomain: "react-demo-2ddc0.firebaseapp.com",
//   projectId: "react-demo-2ddc0",
//   storageBucket: "react-demo-2ddc0.firebasestorage.app",
//   messagingSenderId: "25569876043",
//   appId: "1:25569876043:web:2f7f8b58e1ed45f37095ce",
//   measurementId: "G-CVL7H16499"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Authentication
// const auth = getAuth(app);
// const db = getFirestore(app);  // Initialize Firestore

// // Optional: Initialize Firebase Analytics (only if you need it)
// const analytics = getAnalytics(app);

// // Export Firebase Authentication functions
// export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db };

// // Export the app instance (optional, you can import it later if needed)
// export default app;

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmT88OlyV6_GGHOIozTfe_ZxozdH53f8M",  // Hardcoded temporarily
  authDomain: "react-demo-2ddc0.firebaseapp.com",
  projectId: "react-demo-2ddc0",
  storageBucket: "react-demo-2ddc0.firebasestorage.app",
  messagingSenderId: "25569876043",
  appId: "1:25569876043:web:2f7f8b58e1ed45f37095ce",
  measurementId: "G-CVL7H16499"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Export all Firebase utilities
export { auth, googleProvider, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, db };
