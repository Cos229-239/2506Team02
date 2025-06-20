/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GLOBAL_STYLES, COLORS } from './styles';

const DisplayPeopleInfo = ({ character }) => {
  if (!character) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Generated Character</Text>
      <Text>Race: {character.race}</Text>
      <Text>Class: {character.classes}</Text>
      <Text>Level: {character.levels}</Text>
      <Text>Background: {character.background}</Text>
      <Text>Alignment: {character.alignment}</Text>
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

export default DisplayPeopleInfo;