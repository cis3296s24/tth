// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAnPs18NOhGcVCtgyrxlSRSj9ePqVMxJY4",
  authDomain: "temple-trading-hub-tth.firebaseapp.com",
  databaseURL: "https://temple-trading-hub-tth-default-rtdb.firebaseio.com",
  projectId: "temple-trading-hub-tth",
  storageBucket: "temple-trading-hub-tth.appspot.com",
  messagingSenderId: "64770184657",
  appId: "1:64770184657:web:fa85fbd041ff27fb487cf0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

//databsae 
export const db = getFirestore(app);
export const Realtimedb = getDatabase(app);

//get storage 
export const storage: FirebaseStorage = getStorage(app);