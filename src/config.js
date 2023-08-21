// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX8p9yoGEVi21iqDN0Zp2pih_79R4mutg",
  authDomain: "react-login-signup-f7b13.firebaseapp.com",
  projectId: "react-login-signup-f7b13",
  storageBucket: "react-login-signup-f7b13.appspot.com",
  messagingSenderId: "121057313913",
  appId: "1:121057313913:web:9dc4fa6ecde599d626c0a8",
  measurementId: "G-ND9GZPZ2V2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();
export { auth, db }

