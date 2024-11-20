// src/config/firebase.ts
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export { auth, firestore };

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD4ts_oaMoGT0FQqw_wtDRDb3-0tiB8LPk",
//   authDomain: "biblestudy-63b91.firebaseapp.com",
//   projectId: "biblestudy-63b91",
//   storageBucket: "biblestudy-63b91.firebasestorage.app",
//   messagingSenderId: "835644722765",
//   appId: "1:835644722765:web:cd253030a67f39046c9604",
//   measurementId: "G-736LJQB8F4"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// import { initializeApp } from "firebase/app";
// import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// import { FIREBASE_APP_ID, FIREBASE_API_KEY } from "../constants/keys";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: FIREBASE_API_KEY,
//   authDomain: "vitalog-92cdb.firebaseapp.com",
//   projectId: "vitalog-92cdb",
//   storageBucket: "vitalog-92cdb.appspot.com",
//   messagingSenderId: "619321727625",
//   appId: FIREBASE_APP_ID,
//   measurementId: "G-PMJ3GWMQPC",
//   // databaseURL: 'https://test-database.firebaseio.com',
// };

// export const FIREBASE_APP = initializeApp(firebaseConfig);

// export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

// export const FIRESTORE = getFirestore(FIREBASE_APP);
