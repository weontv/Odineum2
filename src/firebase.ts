import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyCqBJvb4J18ZOf4hWS5q26VqhweJKH9OFE",
  authDomain: "odineum-f631a.firebaseapp.com",
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