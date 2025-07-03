import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { getGlobalStyles } from '../styles';

const themes = ['default', 'light', 'dark'];

export default function SettingsScreen() {
  const { theme, changeTheme } = useContext(ThemeContext);
  const styles = getGlobalStyles(theme);

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Select Theme</Text>
      {themes.map((t) => (
        <TouchableOpacity
          key={t}
          style={[styles.button, { marginTop: 10, opacity: theme === t ? 1 : 0.7 }]}
          onPress={() => changeTheme(t)}
        >
          <Text style={styles.buttonText}>{t.toUpperCase()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
