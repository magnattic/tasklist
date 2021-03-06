import firebase from "firebase/app";
import "firebase/firebase-firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "funktasktic.firebaseapp.com",
  databaseURL: "https://funktasktic.firebaseio.com",
  projectId: "funktasktic",
  storageBucket: "funktasktic.appspot.com",
  messagingSenderId: "277039778468",
  appId: "1:277039778468:web:afdb12262203a59d",
});

const db = firebaseApp.firestore();

export { db };
