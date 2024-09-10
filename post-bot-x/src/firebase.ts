import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCK6Pi5dxTG4lxWvRSulZksx5jyHLV2SlM",
  authDomain: "post-bot-x-2e5ec.firebaseapp.com",
  projectId: "post-bot-x-2e5ec",
  storageBucket: "post-bot-x-2e5ec.appspot.com",
  messagingSenderId: "137470613298",
  appId: "1:137470613298:web:2353dff5375bf8a330692b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//Initialize firestore
export const firestore = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);