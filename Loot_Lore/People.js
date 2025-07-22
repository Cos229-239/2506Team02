/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from './ThemeContext';
import { THEMES } from './styles';

const DisplayPeopleInfo = ({ character }) => {
  const { theme } = useContext(ThemeContext);
  const colors = THEMES[theme];

  if (!character) return null;

  return (
    <View style={[styles.card, { backgroundColor: colors.button }]}>
      <Text style={[styles.title, { color: colors.text }]}>Generated Character</Text>
      <Text style={{ color: colors.text }}>Race: {character.race}</Text>
      <Text style={{ color: colors.text }}>Class: {character.class || character.classes}</Text>
      <Text style={{ color: colors.text }}>Level: {character.level || character.levels}</Text>
      <Text style={{ color: colors.text }}>Background: {character.background}</Text>
      <Text style={{ color: colors.text }}>Alignment: {character.alignment}</Text>
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

export default DisplayPeopleInfo;
