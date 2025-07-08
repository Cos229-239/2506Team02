import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { getGlobalStyles } from '../styles';

const themes = ['default', 'light', 'dark'];

export default function SettingsScreen() {
  const { theme, changeTheme, boldText, toggleBoldText } = useContext(ThemeContext);
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

      {/* Full-width Bold Toggle Button */}
      <View style={{ marginTop: 30, width: '100%', paddingHorizontal: 20 }}>
        <TouchableOpacity
          onPress={toggleBoldText}
          style={{
            backgroundColor: boldText ? '#E59F34' : '#944C17',
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            {boldText ? 'Bold: ON' : 'Bold: OFF'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
