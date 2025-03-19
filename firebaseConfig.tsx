// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPTImtdl5vckflYqo5lRKSDIMMTqEzgVs",
  authDomain: "ai-interviewer-b2d60.firebaseapp.com",
  projectId: "ai-interviewer-b2d60",
  storageBucket: "ai-interviewer-b2d60.firebasestorage.app",
  messagingSenderId: "1090257451916",
  appId: "1:1090257451916:web:24f1b66bd296c1b490b4a9",
  measurementId: "G-CSJ8Q2B6F7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let auth = getAuth(app);
let analytics;
if (app.name && typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export {auth, analytics};
