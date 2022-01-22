import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB64SxT0gq4RwXNH50Y_v5kzW_t6mDWB5I",
  authDomain: "odineum-82686.firebaseapp.com",
  projectId: "odineum-82686",
  storageBucket: "odineum-82686.appspot.com",
  messagingSenderId: "1076040923920",
  appId: "1:1076040923920:web:c3a18b5fb9088df6aac395",
  measurementId: "G-1R7EH10PXB"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
