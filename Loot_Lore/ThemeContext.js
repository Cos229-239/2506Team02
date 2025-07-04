// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(undefined); // start undefined
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('appTheme');
        setTheme(storedTheme || 'default'); // always set a fallback
      } catch (err) {
        console.warn('Failed to load theme from storage:', err);
        setTheme('default');
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  const changeTheme = async (newTheme) => {
    setTheme(newTheme);
    await AsyncStorage.setItem('appTheme', newTheme);
  };

  if (!isReady || !theme) return null; // or return a loading screen

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
