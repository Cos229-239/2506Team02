/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from './ThemeContext';
import { THEMES } from './styles';

const DisplaySpellInfo = ({ spell }) => {
  const { theme } = useContext(ThemeContext);
  const colors = THEMES[theme];

  if (!spell) return null;

  return (
    <View style={[styles.card, { backgroundColor: colors.button }]}>
      <Text style={[styles.title, { color: colors.text }]}>Generated Spell</Text>
      <Text style={{ color: colors.text }}>Type: {spell.spellType}</Text>
      <Text style={{ color: colors.text }}>Level: {spell.spellLevel}</Text>
      <Text style={{ color: colors.text }}>Casting Time: {spell.castingTime}</Text>
      <Text style={{ color: colors.text }}>Duration: {spell.duration}</Text>
      <Text style={{ color: colors.text }}>Range: {spell.rangeArea}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default DisplaySpellInfo;
