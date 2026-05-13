import { initializeApp } from "firebase/app"

import {
  getFirestore
} from "firebase/firestore"

import {
  getAuth
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB0sM6drw-B-BlA-ApaVPeUVy140l3mR6U",
  authDomain: "olayinka-signature.firebaseapp.com",
  projectId: "olayinka-signature",
  storageBucket: "olayinka-signature.firebasestorage.app",
  messagingSenderId: "6538400787",
  appId: "1:6538400787:web:ce3d9779fd86cfc879dbe6",
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const auth = getAuth(app)