import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAqf5aduLH296i7ODLVmnFengZEW3ma0Ko",
    authDomain: "post-bot-x.firebaseapp.com",
    projectId: "post-bot-x",
    storageBucket: "post-bot-x.appspot.com",
    messagingSenderId: "338170475838",
    appId: "1:338170475838:web:20c5a3b9aea23a41bda86f"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//Initialize firestore
export const firestore = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);