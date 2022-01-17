import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqBJvb4J18ZOf4hWS5q26VqhweJKH9OFE",
  authDomain: "odineum-f631a.firebaseapp.com",
  databaseURL: "https://odineum-f631a-default-rtdb.firebaseio.com",
  projectId: "odineum-f631a",
  storageBucket: "odineum-f631a.appspot.com",
  messagingSenderId: "270691852661",
  appId: "1:270691852661:web:e2cb0004feeefeeb09733c",
  measurementId: "G-8CZS9R8H90"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
