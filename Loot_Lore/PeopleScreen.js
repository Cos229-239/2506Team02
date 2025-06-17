import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { GLOBAL_STYLES, COLORS } from './styles';
import {People} from './PeopleDropbox';

export function DisplayPeopleInfo({race, classType, 
    ability, background, 
    alignment}) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>People</Text>
      <Text>Race:</Text>
      <Text>Class: {classType}</Text>
      <Text>Ability: {ability}</Text>
      <Text>Background: {background}</Text>
      <Text>Alignment: {alignment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     ...GLOBAL_STYLES.screen,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
   input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12,
    marginVertical: 8,
    fontSize: 16,
    color: '#000',
  }, 
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DisplayPeopleInfo;