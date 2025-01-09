import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

// initialize firebaseApp with firebase-config values
const firebaseConfig = {
  apiKey: "AIzaSyBqEKq4BKNdmoaLdksRqZDlKwXy6Q1K7ts",
  authDomain: "facebook-clone-v3.firebaseapp.com",
  projectId: "facebook-clone-v3",
  storageBucket: "facebook-clone-v3.appspot.com",
  messagingSenderId: "719236747100",
  appId: "1:719236747100:web:dc79c3c8b3095a50713b99",
  measurementId: "G-E5S6V4JER5",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

// firebase - Data-Base
const db = app.firestore();

// firebase - Storage
const storage = firebase.storage();

// firebase - Auth
const auth = firebase.auth();

// firebase -Auth Provider (Google)
const provider = new firebase.auth.GoogleAuthProvider();

export { storage, auth, provider };

export default db;
