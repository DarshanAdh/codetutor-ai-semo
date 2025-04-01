// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnsGg8G1fae2gG7eaVJHqCFotqRpa41L0",
  authDomain: "shake-5741c.firebaseapp.com",
  projectId: "shake-5741c",
  storageBucket: "shake-5741c.firebasestorage.app",
  messagingSenderId: "477502427540",
  appId: "1:477502427540:web:36d94541bdfff1d154ff81",
  measurementId: "G-ZJQKS7FEEJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const FIREBASE_AUTH = getAuth(app);

// export { storage, ref, uploadBytes, getDownloadURL };