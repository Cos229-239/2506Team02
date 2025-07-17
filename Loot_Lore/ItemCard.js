/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext
import { getGlobalStyles } from './styles'; // Import getGlobalStyles function

function DisplayItemInfo({ name, description, damage, properties, effect, origin }) {
  const { theme } = useContext(ThemeContext); // Access the current theme from ThemeContext
  const globalStyles = getGlobalStyles(theme); // Get styles based on the current theme

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Item Information</Text>
      <Text style={globalStyles.text}>Name: {name}</Text>
      <Text style={globalStyles.text}>Description: {description}</Text>
      <Text style={globalStyles.text}>Damage: {damage.amount} {damage.type}</Text>

      <Text style={globalStyles.subHeader}>Properties:</Text>
      {properties && properties.length > 0 ? (
        properties.map((prop, index) => <Text key={index} style={globalStyles.text}>- {prop}</Text>)
      ) : (
        <Text style={globalStyles.text}>- No properties available</Text>
      )}

      <Text style={globalStyles.subHeader}>Effects:</Text>
      {effect && effect.length > 0 ? (
        effect.map((eff, index) => <Text key={index} style={globalStyles.text}>- {eff}</Text>)
      ) : (
        <Text style={globalStyles.text}>- No effects available</Text>
      )}

      <Text style={globalStyles.subHeader}>Origin:</Text>
      <Text style={globalStyles.text}>{origin || 'No origin available'}</Text>
    </View>
  );
}

export default DisplayItemInfo;
