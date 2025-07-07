import React, { createContext, useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(undefined);
  const [boldText, setBoldText] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('appTheme');
        const storedBold = await AsyncStorage.getItem('appBoldText');
        setTheme(storedTheme || 'default');
        setBoldText(storedBold === 'true'); // note: storedBold is a string
      } catch (err) {
        console.warn('Failed to load theme settings:', err);
        setTheme('default');
        setBoldText(false);
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  const changeTheme = async (newTheme) => {
    setTheme(newTheme);
    await AsyncStorage.setItem('appTheme', newTheme);
  };

  const toggleBoldText = async () => {
    const newValue = !boldText;
    setBoldText(newValue);
    await AsyncStorage.setItem('appBoldText', String(newValue));
  };

  if (!isReady || !theme) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text>Loading theme...</Text>
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, boldText, toggleBoldText }}>
      {children}
    </ThemeContext.Provider>
  );
};
