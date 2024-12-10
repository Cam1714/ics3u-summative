import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyCFsidbxqNGl-XHqexlhlMkpjBz9HgO81o",
    authDomain: "summative-29c6d.firebaseapp.com",
    projectId: "summative-29c6d",
    storageBucket: "summative-29c6d.firebasestorage.app",
    messagingSenderId: "148224368419",
    appId: "1:148224368419:web:5d0d75eba9ced6b4053696"
  };

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };