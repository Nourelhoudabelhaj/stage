
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2n4_Ykz-L2BwVdCDmwVbsCQjzgPaH7QI",
    authDomain: "cour-d-appel.firebaseapp.com",
    projectId: "cour-d-appel",
    storageBucket: "cour-d-appel.appspot.com",
    messagingSenderId: "760781019396",
    appId: "1:760781019396:web:75185852f8b0d9a59e9851",
    measurementId: "G-9Q088DS88K"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
