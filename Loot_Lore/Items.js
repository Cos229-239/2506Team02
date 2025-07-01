/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GLOBAL_STYLES, COLORS } from './styles';

const DisplayItemsInfo = ({ item }) => {
  if (!item) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Generated Item</Text>
      <Text>Item: {item.itemType}</Text>
      <Text>MagicItem: {item.MagicItem}</Text>
      <Text>DamageType: {item.damageType}</Text>
      <Text>Damage: {item.damage}</Text>
      <Text>Properties: {item.properties}</Text>
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

export default DisplayItemsInfo;