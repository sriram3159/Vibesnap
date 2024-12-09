// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4l1Ij05GsJ9TRMrdTtt0Dr2rRONQWXU8",
  authDomain: "vibesnap-539bc.firebaseapp.com",
  projectId: "vibesnap-539bc",
  storageBucket: "vibesnap-539bc.firebasestorage.app",
  messagingSenderId: "657745941574",
  appId: "1:657745941574:web:07f31a92501b319646a647"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
