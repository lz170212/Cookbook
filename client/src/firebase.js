// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cookbook-af89e.firebaseapp.com",
  projectId: "cookbook-af89e",
  storageBucket: "cookbook-af89e.appspot.com",
  messagingSenderId: "107874602151",
  appId: "1:107874602151:web:2bcbec5714ad40f7fedf82"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);