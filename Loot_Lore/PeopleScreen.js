/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from './ThemeContext';
import { getGlobalStyles, THEMES } from './styles'; // Make sure your file is named styles.js (not style.js)

function DisplayPeopleInfo({ race, classType, level, background, alignment }) {
  const { theme } = useContext(ThemeContext);
  const globalStyles = getGlobalStyles(theme);
  const localStyles = getLocalStyles(THEMES[theme]);

  return (
    <View style={[globalStyles.screen, localStyles.container]}>
      <Text style={[globalStyles.header, localStyles.header]}>Selected Information</Text>
      <Text style={{ color: THEMES[theme].text }}>Race: {race}</Text>
      <Text style={{ color: THEMES[theme].text }}>Class: {classType}</Text>
      <Text style={{ color: THEMES[theme].text }}>Level: {level}</Text>
      <Text style={{ color: THEMES[theme].text }}>Background: {background}</Text>
      <Text style={{ color: THEMES[theme].text }}>Alignment: {alignment}</Text>
    </View>
  );
}

const getLocalStyles = (themeColors) =>
  StyleSheet.create({
    container: {
      padding: 20,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: themeColors.text,
    },
  });

export default DisplayPeopleInfo;
