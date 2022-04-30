import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqTlue8sY1UupU3ruknxGiKYz7WXsaR1I",
  authDomain: "pascal-coders.firebaseapp.com",
  projectId: "pascal-coders",
  storageBucket: "pascal-coders.appspot.com",
  messagingSenderId: "556646908987",
  appId: "1:556646908987:web:78cf3b59f091b6c35d881e",
  measurementId: "G-6KNM27FQ7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore();