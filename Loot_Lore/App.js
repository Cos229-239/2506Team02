import React, { useEffect, useState } from 'react';
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import AppNavigator from './Navigation';
import { ThemeProvider } from './ThemeContext';

export default function App() {
<<<<<<< HEAD
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
=======
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

        // Clean up Firestore listener if signed out
        if (unsubscribeFirestore) {
          unsubscribeFirestore();
          unsubscribeFirestore = null;
        }
      }
    });

    // Cleanup function on unmount
    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, []);

  return <AppNavigator user={user} />;
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
}
