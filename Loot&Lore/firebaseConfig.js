// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBwRyBaP596m87LQ7BzkmcJwsRD0VTx79M",
    authDomain: "questlog-8017d.firebaseapp.com",
    projectId: "questlog-8017d",
    storageBucket: "questlog-8017d.firebasestorage.app",
    messagingSenderId: "984219860808",
    appId: "1:984219860808:web:9520081f36b58df6d2fd7d",
    measurementId: "G-MWLCJZRMFP"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
