import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyB7zEeb_STposzcmGFO42-UDbZdCx7h2kI",
  authDomain: "gratibum-5f5f6.firebaseapp.com",
  projectId: "gratibum-5f5f6",
  storageBucket: "gratibum-5f5f6.appspot.com",
  messagingSenderId: "1014004562128",
  appId: "1:1014004562128:web:1ad537b7559aad3f4186d5",
  measurementId: "G-5BJZWX0XRR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth( app );
export const firebaseDb = getFirestore( app );