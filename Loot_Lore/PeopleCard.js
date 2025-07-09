/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { GLOBAL_STYLES, COLORS } from './styles';


function DisplayPeopleInfo({ race, classType, levels, background, alignment }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selected Information</Text>
      <Text>Race: {race}</Text>
      <Text>Class: {classType}</Text>
      <Text>Level: {levels}</Text>
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