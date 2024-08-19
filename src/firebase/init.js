// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBoJdt5T610N1PrhBed26AOsB9it5fvnbo",
  authDomain: "timestat-f791f.firebaseapp.com",
  projectId: "timestat-f791f",
  storageBucket: "timestat-f791f.appspot.com",
  messagingSenderId: "135349937977",
  appId: "1:135349937977:web:302529691080fc7ccdaae8",
  measurementId: "G-QCN8CYDJ3Q",
};

//const firebaseApp = initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { firebaseApp, db, ref, onValue };
//export default firebaseApp;
