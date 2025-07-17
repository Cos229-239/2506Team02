// components/LoadingOverlay.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../styles';

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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={COLORS.accent || '#f4a300'} />
      <Text style={styles.text}>{messages[index]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#3B291C',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  text: {
    marginTop: 20,
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
  },

