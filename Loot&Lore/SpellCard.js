/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { GLOBAL_STYLES } from './styles';

export default function SpellCard({ spell }) {
  if (!spell) return null;

  return (
    <ScrollView>
      <View style={GLOBAL_STYLES.buttonText}>
        <Text style={GLOBAL_STYLES.buttonText}>{spell.name}</Text>
        <Text style={GLOBAL_STYLES.buttonText}>Level: {spell.level}</Text>
        <Text style={GLOBAL_STYLES.buttonText}>School: {spell.school}</Text>
        <Text style={GLOBAL_STYLES.buttonText}>Casting Time: {spell.casting_time}</Text>
        <Text style={GLOBAL_STYLES.buttonText}>Range: {spell.range}</Text>
        <Text style={GLOBAL_STYLES.buttonText}>Duration: {spell.duration}</Text>
        <Text style={GLOBAL_STYLES.buttonText}>Ritual: {spell.ritual ? 'Yes' : 'No'}</Text>
        <Text style={GLOBAL_STYLES.buttonText}>Concentration: {spell.concentration ? 'Yes' : 'No'}</Text>
        
        <Text style={GLOBAL_STYLES.buttonText}>Components: {spell.components.join(', ')}</Text>
        {spell.material ? (
          <Text style={GLOBAL_STYLES.buttonText}>Material: {spell.material}</Text>
        ) : null}

        <Text style={GLOBAL_STYLES.buttonText}>Attack Type: {spell.attack_type}</Text>
        {spell.damage && (
          <Text style={GLOBAL_STYLES.buttonText}>
            Damage: {spell.damage.dice} {spell.damage.type}
          </Text>
        )}

        <Text style={GLOBAL_STYLES.buttonText}>Description:</Text>
        <Text style={GLOBAL_STYLES.buttonText}>{spell.desc}</Text>

        <Text style={GLOBAL_STYLES.buttonText}>At Higher Levels:</Text>
        <Text style={GLOBAL_STYLES.buttonText}>{spell.higher_level}</Text>

        <Text style={GLOBAL_STYLES.buttonText}>Classes:</Text>
        {spell.classes.map((cls, i) => (
          <Text key={`class-${i}`} style={GLOBAL_STYLES.buttonText}>• {cls}</Text>
        ))}

        <Text style={GLOBAL_STYLES.buttonText}>Subclasses:</Text>
        {spell.subclasses.map((sub, i) => (
          <Text key={`subclass-${i}`} style={GLOBAL_STYLES.buttonText}>• {sub}</Text>
        ))}
      </View>
    </ScrollView>
  );
}
