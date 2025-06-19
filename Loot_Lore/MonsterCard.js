/* eslint-disable react/prop-types */
// MonsterCard.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { GLOBAL_STYLES, COLORS } from './styles';

export default function MonsterCard({ monster }) {
  if (!monster) return null;

  return (
    <ScrollView>
    <View style={GLOBAL_STYLES.buttonText}>
      <Text style={GLOBAL_STYLES.buttonText}>{monster.name}</Text>
      <Text style={GLOBAL_STYLES.buttonText}>Type: {monster.type}</Text>
      <Text style={GLOBAL_STYLES.buttonText}>CR: {monster.challengeRating}</Text>

      <Text style={GLOBAL_STYLES.buttonText}>Stats:</Text>
      <Text style={GLOBAL_STYLES.buttonText}>STR: {monster.stats.STR}</Text>
      <Text style={GLOBAL_STYLES.buttonText}>DEX: {monster.stats.DEX}</Text>
      <Text style={GLOBAL_STYLES.buttonText}>CON: {monster.stats.CON}</Text>
      <Text style={GLOBAL_STYLES.buttonText}>INT: {monster.stats.INT}</Text>
      <Text style={GLOBAL_STYLES.buttonText}>WIS: {monster.stats.WIS}</Text>
      <Text style={GLOBAL_STYLES.buttonText}>CHA: {monster.stats.CHA}</Text>

      <Text style={GLOBAL_STYLES.buttonText}>Abilities:</Text>
      {monster.abilities.map((ab, i) => (
        <Text key={`ability-${i}`}>• {ab}</Text>
      ))}

      <Text style={GLOBAL_STYLES.buttonText}>Attacks:</Text>
      {monster.attacks.map((atk, i) => (
        <Text key={`attack-${i}`}>• {atk}</Text>
      ))}

      <Text style={GLOBAL_STYLES.buttonText}>Spells:</Text>
      {monster.spells.map((sp, i) => (
        <Text key={`spell-${i}`}>• {sp}</Text>
      ))}

      <Text style={GLOBAL_STYLES.buttonText}>Lore:</Text>
      <Text style={GLOBAL_STYLES.buttonText}>{monster.lore}</Text>

      <Text style={GLOBAL_STYLES.buttonText}>Short Description:</Text>
      <Text style={GLOBAL_STYLES.buttonText}>{monster.shortDescription}</Text>
    </View>
    </ScrollView>
  );
}
