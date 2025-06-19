/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GLOBAL_STYLES, COLORS } from './styles';

const DisplaySpellInfo = ({ spell }) => {
  if (!spell) return null;

  return (
    <View style={styles.card}>
          <Text style={styles.title}>Generated Character</Text>
          <Text>Spell Type: {spell.spellType}</Text>
          <Text>Spell Level: {spell.spellLevel}</Text>
          <Text>CastingTime: {spell.castingTime}</Text>
          <Text>Duration: {spell.duration}</Text>
          <Text>Range/Area: {spell.rangeArea}</Text>
        </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.button,
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