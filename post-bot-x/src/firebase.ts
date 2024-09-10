import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDO8NUZVVOcC3jy44VwsWKZGkk92yo1Mjk",
  authDomain: "postbotx.firebaseapp.com",
  projectId: "postbotx",
  storageBucket: "postbotx.appspot.com",
  messagingSenderId: "734070725033",
  appId: "1:734070725033:web:aed4ea1891a34767880cb8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//Initialize firestore
export const firestore = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);