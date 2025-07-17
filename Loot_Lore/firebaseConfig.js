// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';
import {
  initializeFirestore,
  memoryLocalCache
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrCgdysOFJauQ1me7oCO5L3p1hdCUZ6eo",
  authDomain: "loot-and-lore.firebaseapp.com",
  projectId: "loot-and-lore",
  storageBucket: "loot-and-lore.appspot.com",
  messagingSenderId: "539946306863",
  appId: "1:539946306863:web:6e12f7a71bcfd676b0a5da",
  measurementId: "G-1SHMFT76XS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth with persistence for React Native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Export Firestore with offline caching
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
  localCache: memoryLocalCache(),
});

// Export Firebase Storage
export const storage = getStorage(app);
