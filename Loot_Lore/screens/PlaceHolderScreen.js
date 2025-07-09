/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { GLOBAL_STYLES } from '../styles';

export default function PlaceholderScreen({ route }) {
  return (
    <SafeAreaView style={GLOBAL_STYLES.screen}>
      <Text style={styles.text}>Coming Soon: {route.name}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 50,
  },
});