import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { getGlobalStyles, THEMES } from '../styles';
import OtherBackButton from '../OtherBackButton';

export default function PrivateMonstersScreen() {
  const { theme, boldText } = useContext(ThemeContext);
  const styles = getGlobalStyles(theme);
  const colors = THEMES[theme] || THEMES.default;

  return (
    <View style={localStyles.container}>
      <ScrollView contentContainerStyle={[styles.screen, localStyles.center]}>
        <Text
          style={[
            styles.header,
            boldText && { fontWeight: 'bold' },
            { color: colors.text },
          ]}
        >
          No Data Currently Saved
        </Text>
      </ScrollView>

      <View
        style={[
          localStyles.footer,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.text,
          },
        ]}
      >
        <OtherBackButton />
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  footer: {
    borderTopWidth: 1,
    padding: 10,
  },
});
