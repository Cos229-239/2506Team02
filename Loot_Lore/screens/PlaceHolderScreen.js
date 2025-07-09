/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { getGlobalStyles, THEMES } from '../styles';

export default function PlaceholderScreen({ route }) {
  const { theme } = useContext(ThemeContext);
  const globalStyles = getGlobalStyles(theme);
  const themeColors = THEMES[theme];

  return (
    <SafeAreaView style={globalStyles.screen}>
      <Text style={[styles.text, { color: themeColors.text }]}>
        Coming Soon: {route.name}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 50,
  },
});
