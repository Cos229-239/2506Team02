import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { getGlobalStyles, THEMES } from '../styles'; // 👈 import THEMES
import BackButton from '../BackButton';
import DeleteAccountButton from '../DeleteAccountButton';

const themes = ['default', 'light', 'dark'];

export default function SettingsScreen() {
  const { theme, changeTheme, boldText, toggleBoldText } = useContext(ThemeContext);
  const styles = getGlobalStyles(theme);
  const colors = THEMES[theme] || THEMES.default; // 👈 extract theme colors

  return (
    <View style={localStyles.container}>
      <ScrollView contentContainerStyle={styles.screen}>
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

        <View style={{ marginTop: 30, width: '100%', paddingHorizontal: 0 }}>
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
        
        <View style={{ marginTop: 80 }}>
          <DeleteAccountButton />
        </View>

      </ScrollView>

      {/* 🔧 Footer now uses themed background and border color */}
      <View style={[localStyles.footer, {
        backgroundColor: colors.background,
        borderTopColor: colors.text,
      }]}>
        <BackButton />
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    padding: 10,
  },
});
