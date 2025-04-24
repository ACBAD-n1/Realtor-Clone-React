// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArNy6TSF5rguXhp9toIDfwtw4sujaEmqc",
  authDomain: "realtor-clone-react-42a63.firebaseapp.com",
  projectId: "realtor-clone-react-42a63",
  storageBucket: "realtor-clone-react-42a63.firebasestorage.app",
  messagingSenderId: "207073824860",
  appId: "1:207073824860:web:e0361c176ba1fbb34a5699"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();