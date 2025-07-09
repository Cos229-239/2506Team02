/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

// Define your themes here
const themes = {
  default: {
    text: '#000', // black text
    background: '#fff', // white background
    // add more theme properties as needed
  },
  dark: {
    text: '#fff',
    background: '#000',
    // add more theme properties as needed
  },
};

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(undefined);
  const [theme, setTheme] = useState(themes.default);
  const [boldText, setBoldText] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('appTheme');
        const storedBold = await AsyncStorage.getItem('appBoldText');
        const name = storedTheme || 'default';
        setThemeName(name);
        setTheme(themes[name] || themes.default);
        setBoldText(storedBold === 'true');
      } catch (err) {
        console.warn('Failed to load theme settings:', err);
        setThemeName('default');
        setTheme(themes.default);
        setBoldText(false);
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  const changeTheme = async (newThemeName) => {
    setThemeName(newThemeName);
    setTheme(themes[newThemeName] || themes.default);
    await AsyncStorage.setItem('appTheme', newThemeName);
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
    <ThemeContext.Provider value={{ theme, changeTheme, boldText, toggleBoldText, themeName }}>
      {children}
    </ThemeContext.Provider>
  );
};
