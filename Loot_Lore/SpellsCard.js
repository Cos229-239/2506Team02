/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from './ThemeContext';
import { THEMES } from './styles';

function DisplaySpellInfo({ spellType, spellLevel, castingTime, duration, rangeArea }) {
  const { theme } = useContext(ThemeContext);
  const colors = THEMES[theme];

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: colors.text }]}>Selected Information</Text>
      <Text style={{ color: colors.text }}>Spell Type: {spellType}</Text>
      <Text style={{ color: colors.text }}>Spell Level: {spellLevel}</Text>
      <Text style={{ color: colors.text }}>Casting Time: {castingTime}</Text>
      <Text style={{ color: colors.text }}>Duration: {duration}</Text>
      <Text style={{ color: colors.text }}>Range/Area: {rangeArea}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DisplaySpellInfo;
