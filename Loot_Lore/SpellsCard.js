/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { GLOBAL_STYLES, COLORS } from './styles';


function DisplaySpellInfo({ spellType, spellLevel, castingTime, 
  duration, rangeArea }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selected Information</Text>
      <Text>Spell Type: {spellType}</Text>
      <Text>Spell Level: {spellLevel}</Text>
      <Text>Casting Time: {castingTime}</Text>
      <Text>Duration: {duration}</Text>
      <Text>Range/Area: {rangeArea}</Text>
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