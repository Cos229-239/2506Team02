import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import AppNavigator from './Navigation';
import { ThemeProvider } from './ThemeContext'; // ✅ Import your ThemeProvider

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribeFirestore = null;

    const unsubscribeAuth = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);

      if (currentUser) {
        console.log("✅ User signed in:", currentUser.email);

        const userDocRef = doc(db, 'users', currentUser.uid);

        unsubscribeFirestore = onSnapshot(
          userDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              console.log("📄 Firestore user data:", docSnap.data());
            } else {
              console.warn("⚠️ No user document found.");
            }
          },
          (error) => {
            console.error("🔥 Firestore listener error:", error.message);
          }
        );
      } else {
        console.log("👋 User signed out");

        if (unsubscribeFirestore) {
          unsubscribeFirestore();
          unsubscribeFirestore = null;
        }
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, []);

  return (
   <ThemeProvider>
  <AppNavigator user={user} />
</ThemeProvider>

  );
}
