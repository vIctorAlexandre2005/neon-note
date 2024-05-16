import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAZ_nem_m4kx4Q8Xwq4Ag83w27g8LjisMc",
  authDomain: "neon-note.firebaseapp.com",
  projectId: "neon-note",
  storageBucket: "neon-note.appspot.com",
  messagingSenderId: "257823504349",
  appId: "1:257823504349:web:44774fc1a7a1330f2b2834"
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };