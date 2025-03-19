import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCPTImtdl5vckflYqo5lRKSDIMMTqEzgVs",
    authDomain: "ai-interviewer-b2d60.firebaseapp.com",
    projectId: "ai-interviewer-b2d60",
    storageBucket: "ai-interviewer-b2d60.firebasestorage.app",
    messagingSenderId: "1090257451916",
    appId: "1:1090257451916:web:c808e8b0feb47e2e90b4a9",
    measurementId: "G-CS1WZQ283W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let auth = getAuth(app);
let analytics;
if (app.name && typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export {auth, analytics};
