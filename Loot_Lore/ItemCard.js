/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from './styles';

function DisplayItemInfo({ name, description, damage, properties, effect, origin }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Item Information</Text>
      <Text>Name: {name}</Text>
      <Text>Description: {description}</Text>
      <Text>Damage: {damage.amount} {damage.type}</Text>

      <Text style={styles.subHeader}>Properties:</Text>
      {properties && properties.length > 0 ? (
        properties.map((prop, index) => <Text key={index}>- {prop}</Text>)
      ) : (
        <Text>- No properties available</Text>
      )}

      <Text style={styles.subHeader}>Effects:</Text>
      {effect && effect.length > 0 ? (
        effect.map((eff, index) => <Text key={index}>- {eff}</Text>)
      ) : (
        <Text>- No effects available</Text>
      )}

      <Text style={styles.subHeader}>Origin:</Text>
      <Text>{origin || 'No origin available'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.text,
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.text,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: COLORS.text,
  },
});

export default DisplayItemInfo;