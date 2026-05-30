import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzDLVvOatC8BIZklbUqSfkkfcSjlWGXOI",
  authDomain: "todoapp-1a664.firebaseapp.com",
  projectId: "todoapp-1a664",
  storageBucket: "todoapp-1a664.firebasestorage.app",
  messagingSenderId: "568009904272",
  appId: "1:568009904272:web:875f67225cf71cc9b6c815",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);