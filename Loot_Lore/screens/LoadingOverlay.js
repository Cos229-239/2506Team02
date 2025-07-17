import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { THEMES } from '../styles';

const messages = [
  'Taming beast...',
  'Adding magic...',
  'Rolling dice...',
  'Consulting the Oracle...',
  'Brewing potions...',
  'Summoning familiars...',
  'Crafting narrative...',
  'Sharpening swords...',
];

export default function LoadingOverlay() {
  const { theme } = useContext(ThemeContext);
  const themeColors = THEMES[theme];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.overlay, { backgroundColor: themeColors.background }]}>
      <ActivityIndicator size="large" color={themeColors.button} />
      <Text style={[styles.text, { color: themeColors.text }]}>{messages[index]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },

