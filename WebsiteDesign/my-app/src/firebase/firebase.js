import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // For Firestore Database
import { getAuth } from "firebase/auth";  // For Authentication
import { getAnalytics } from "firebase/analytics";  // For Analytics (optional)

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUBAXjsd_DS6Jg4VVUckbg33wE93GAlqI",
  authDomain: "medicalsearch-594cd.firebaseapp.com",
  databaseURL: "https://medicalsearch-594cd-default-rtdb.firebaseio.com",
  projectId: "medicalsearch-594cd",
  storageBucket: "medicalsearch-594cd.appspot.com",
  messagingSenderId: "729460224991",
  appId: "1:729460224991:web:7013988b0451cf30fdca6a",
  measurementId: "G-WZNB2F4BL5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (if you are using it)
const db = getFirestore(app);

// Initialize Firebase Auth (if you are using it)
const auth = getAuth(app);

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(app);

// Export the Firebase services that you need in other files
export { db, auth, analytics };