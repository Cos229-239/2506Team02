import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
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

      <View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[styles.header, { marginRight: 10 }]}>Bold Text</Text>
        <Switch value={boldText} onValueChange={toggleBoldText} />
      </View>
    </View>
  );
}
