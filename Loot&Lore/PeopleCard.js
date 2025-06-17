import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PeopleCard = ({ route }) => {
  const { character } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generated Character</Text>
      <Text>Race: {character.race}</Text>
      <Text>Class: {character.class}</Text>
      <Text>Level: {character.level}</Text>
      <Text>Background: {character.background}</Text>
      <Text>Alignment: {character.alignment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default PeopleCard;