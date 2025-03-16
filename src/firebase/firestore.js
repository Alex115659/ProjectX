import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBIOJew_6xVFxpizcxHO_-EVUjbeGkS67Y",
  authDomain: "projectx-a6fa5.firebaseapp.com",
  projectId: "projectx-a6fa5",
  storageBucket: "projectx-a6fa5.firebasestorage.app",
  messagingSenderId: "987536990775",
  appId: "1:987536990775:web:1b777a1189323b081855b2",
  measurementId: "G-LCN48XHXLV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db }