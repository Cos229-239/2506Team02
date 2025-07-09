/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { GLOBAL_STYLES, COLORS } from '../styles';

export default function HomeScreen({ navigation }) {
  const handleNavigate = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loot & Lore</Text>

      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => handleNavigate('Characters')}
        >
          <Text style={styles.buttonText}>Characters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => handleNavigate('Monsters')}
        >
          <Text style={styles.buttonText}>Monsters</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => handleNavigate('Items')}
        >
          <Text style={styles.buttonText}>Items</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => handleNavigate('Spells')}
        >
          <Text style={styles.buttonText}>Spells</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.centeredButton]}
        onPress={() => handleNavigate('Other')}
      >
        <Text style={styles.buttonText}>Other</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.screen,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    color: COLORS.text,
    fontSize: 32,
    fontFamily: 'Aclonica',
    marginTop: 20,
    marginBottom: 4,
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: COLORS.button,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  centeredButton: {
    backgroundColor: COLORS.button,
    paddingVertical: 16,
    paddingHorizontal: 65,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 18,
    fontFamily: 'Aclonica',
  },
});