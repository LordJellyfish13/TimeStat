import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBoJdt5T610N1PrhBed26AOsB9it5fvnbo",
    authDomain: "timestat-f791f.firebaseapp.com",
    projectId: "timestat-f791f",
    storageBucket: "timestat-f791f.appspot.com",
    messagingSenderId: "135349937977",
    appId: "1:135349937977:web:302529691080fc7ccdaae8",
    measurementId: "G-QCN8CYDJ3Q"
};

// init firebase
 const firebaseApp = initializeApp(firebaseConfig)

 export {firebaseApp};  

// init firestore service
const db = getFirestore()
export default {db};