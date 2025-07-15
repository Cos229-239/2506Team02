/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from './ThemeContext';
import { THEMES } from './styles';

function DisplayPeopleInfo({ race, classType, levels, background, alignment }) {
  const { theme } = useContext(ThemeContext);
  const colors = THEMES[theme];

  return (
    <View style={[styles.container]}>
      <Text style={[styles.header, { color: colors.text }]}>Selected Information</Text>
      <Text style={{ color: colors.text }}>Race: {race}</Text>
      <Text style={{ color: colors.text }}>Class: {classType}</Text>
      <Text style={{ color: colors.text }}>Level: {levels}</Text>
      <Text style={{ color: colors.text }}>Background: {background}</Text>
      <Text style={{ color: colors.text }}>Alignment: {alignment}</Text>
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
