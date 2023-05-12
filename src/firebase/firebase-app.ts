// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaoBAO5HnUBoOaq0um-AqRREHs5d2xGMM",
  authDomain: "english-95309.firebaseapp.com",
  projectId: "english-95309",
  storageBucket: "english-95309.appspot.com",
  messagingSenderId: "406362807607",
  appId: "1:406362807607:web:3ef96411854323d9340eb2",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const firestoreDatabase = getFirestore(firebaseApp);
// console.log("firestoreDatabase", firestoreDatabase);
