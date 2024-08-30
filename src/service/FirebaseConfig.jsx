// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO6g7R_jcTWwOAO4jJYzqXKWUDDfhO4Lo",
  authDomain: "ai-trip-planner-d2a71.firebaseapp.com",
  projectId: "ai-trip-planner-d2a71",
  storageBucket: "ai-trip-planner-d2a71.appspot.com",
  messagingSenderId: "460754702494",
  appId: "1:460754702494:web:b01dec9a658ed427c26b8f",
  measurementId: "G-58TT275C25"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app);