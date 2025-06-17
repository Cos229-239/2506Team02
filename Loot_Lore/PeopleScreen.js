import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function DisplayPeopleInfo({ race, classType, ability, background, alignment }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selected Information</Text>
      <Text>Race: {race}</Text>
      <Text>Class: {classType}</Text>
      <Text>Ability: {ability}</Text>
      <Text>Background: {background}</Text>
      <Text>Alignment: {alignment}</Text>
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

export default DisplayPeopleInfo;