/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ThemeContext } from './ThemeContext';

export default function SpellCard({ spell }) {
  const { theme } = useContext(ThemeContext);
  const colors = theme;

  if (!spell) return null;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, { backgroundColor: colors.button || '#ccc' }]}>
        <Text style={[styles.title, { color: colors.text }]}>{spell.name}</Text>
        <Text style={[styles.text, { color: colors.text }]}>Level: {spell.level}</Text>
        <Text style={[styles.text, { color: colors.text }]}>School: {spell.school}</Text>
        <Text style={[styles.text, { color: colors.text }]}>Casting Time: {spell.casting_time}</Text>
        <Text style={[styles.text, { color: colors.text }]}>Range: {spell.range}</Text>
        <Text style={[styles.text, { color: colors.text }]}>Duration: {spell.duration}</Text>
        <Text style={[styles.text, { color: colors.text }]}>Ritual: {spell.ritual ? 'Yes' : 'No'}</Text>
        <Text style={[styles.text, { color: colors.text }]}>Concentration: {spell.concentration ? 'Yes' : 'No'}</Text>

        <Text style={[styles.text, { color: colors.text }]}>
          Components: {spell.components.join(', ')}
        </Text>
        {spell.material ? (
          <Text style={[styles.text, { color: colors.text }]}>Material: {spell.material}</Text>
        ) : null}

        <Text style={[styles.text, { color: colors.text }]}>Attack Type: {spell.attack_type}</Text>
        {spell.damage && (
          <Text style={[styles.text, { color: colors.text }]}>
            Damage: {spell.damage.dice} {spell.damage.type}
          </Text>
        )}

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Description:</Text>
        <Text style={[styles.text, { color: colors.text }]}>{spell.desc}</Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>At Higher Levels:</Text>
        <Text style={[styles.text, { color: colors.text }]}>{spell.higher_level}</Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Classes:</Text>
        {spell.classes.map((cls, i) => (
          <Text key={`class-${i}`} style={[styles.listItem, { color: colors.text }]}>• {cls}</Text>
        ))}

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Subclasses:</Text>
        {spell.subclasses.map((sub, i) => (
          <Text key={`subclass-${i}`} style={[styles.listItem, { color: colors.text }]}>• {sub}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
  },
  container: {
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 12,
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  listItem: {
    fontSize: 16,
    marginLeft: 12,
  },
});
