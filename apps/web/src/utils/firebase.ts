// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDepyNVmAFK3hvB7rPRZTglqhbSaiYv2mc",
  authDomain: "oreflow-cf276.firebaseapp.com",
  projectId: "oreflow-cf276",
  messagingSenderId: "683648006983",
  appId: "1:683648006983:web:b19c7ea7f0b22787ee6a62"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider()