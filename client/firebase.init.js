// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVgEgAiIOkk6oKiMnoEDy7jeEwZKzqZ3U",
  authDomain: "zentask-task-mangement-app.firebaseapp.com",
  projectId: "zentask-task-mangement-app",
  storageBucket: "zentask-task-mangement-app.firebasestorage.app",
  messagingSenderId: "232376499414",
  appId: "1:232376499414:web:777a3711ac5d3fcb629d77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);