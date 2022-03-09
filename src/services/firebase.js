import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyAu_JiUwoIfJJeB79LAsqeN2FrJGtFXIPc",
    authDomain: "lifeiswonderful.firebaseapp.com",
    projectId: "lifeiswonderful",
    storageBucket: "lifeiswonderful.appspot.com",
    messagingSenderId: "47086215599",
    appId: "1:47086215599:web:40ca3858f998bd6e8b8f5a",
    measurementId: "G-Z1WV2D422E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firebaseDb = getFirestore(app);