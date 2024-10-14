import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 


const firebaseConfig = {
    apiKey: "AIzaSyDnYp9ex2zvEzQmIuidpy9PpUvHmu1Dhdc",
    authDomain: "foro-react-cf8ce.firebaseapp.com",
    projectId: "foro-react-cf8ce",
    storageBucket: "foro-react-cf8ce.appspot.com",
    messagingSenderId: "250701346755",
    appId: "1:250701346755:web:9618389b2aece8a7e3af76",
    measurementId: "G-CYSNNTM7ZK"
  };


  const app = initializeApp(firebaseConfig);


  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const storage = getStorage(app);