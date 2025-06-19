/* eslint-disable react/prop-types */
// MonsterDetailsScreen.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { COLORS } from '../styles';

export default function MonsterDetailsScreen({ route, navigation }) {
  const { monster } = route.params || {};

  useEffect(() => {
    console.log('MonsterDetailsScreen → monster:', monster);
  }, [monster]);

  if (!monster || typeof monster !== 'object') {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.title}>No monster data found.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const generateMonsterText = () => {
    const abilities = (monster.abilities || []).join('\n- ');
    const attacks = (monster.attacks || []).join('\n- ');
    const spells = (monster.spells || []).join('\n- ');

    return (
      `Name: ${monster.name}\n\n` +
      `Prompt Used:\n` +
      `- Type: ${monster.promptType || 'N/A'}\n` +
      `- Race: ${monster.promptRace || 'N/A'}\n` +
      `- Challenge Rating: ${monster.promptChallengeRating || 'N/A'}\n\n` +
      `Stats:\nSTR: ${monster.stats.STR}\nDEX: ${monster.stats.DEX}\nCON: ${monster.stats.CON}\n` +
      `INT: ${monster.stats.INT}\nWIS: ${monster.stats.WIS}\nCHA: ${monster.stats.CHA}\n\n` +
      `Abilities:\n- ${abilities}\n\n` +
      `Attacks:\n- ${attacks}\n\n` +
      `Spells:\n- ${spells}\n\n` +
      `Lore:\n${monster.lore}\n\n` +
      `Short Description:\n${monster.shortDescription}`
    );
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(generateMonsterText());
    Alert.alert('Copied', 'Monster copied to clipboard!');
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: generateMonsterText() });
    } catch (error) {
      Alert.alert('Error sharing', error.message);
    }
  };

  const handleSave = async () => {
    try {
      const existing = await AsyncStorage.getItem('@saved_monsters');
      const monsters = existing ? JSON.parse(existing) : [];
      monsters.push(monster);
      await AsyncStorage.setItem('@saved_monsters', JSON.stringify(monsters));
      Alert.alert('Success', 'Monster saved successfully!');
    } catch (error) {
      Alert.alert('Error saving', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{monster.name}</Text>

      <Text style={styles.sectionTitle}>Monster Details</Text>
      <Text style={styles.text}>Type: {monster.promptType || 'N/A'}</Text>
      <Text style={styles.text}>Race: {monster.promptRace || 'N/A'}</Text>
      <Text style={styles.text}>Challenge Rating: {monster.promptChallengeRating || 'N/A'}</Text>

      <Text style={styles.sectionTitle}>Stats</Text>
      {Object.entries(monster.stats).map(([key, value]) => (
        <Text key={key} style={styles.text}>{`${key}: ${value}`}</Text>
      ))}

      <Text style={styles.sectionTitle}>Attacks</Text>
      {monster.attacks.map((atk, i) => (
        <Text key={`attack-${i}`} style={styles.text}>- {atk}</Text>
      ))}

      <Text style={styles.sectionTitle}>Spells</Text>
      {monster.spells.map((sp, i) => (
        <Text key={`spell-${i}`} style={styles.text}>- {sp}</Text>
      ))}

      <Text style={styles.sectionTitle}>Abilities</Text>
      {monster.abilities.map((ab, i) => (
        <Text key={`ability-${i}`} style={styles.text}>- {ab}</Text>
      ))}

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.text}>{monster.shortDescription}</Text>

      <Text style={styles.sectionTitle}>Lore</Text>
      <Text style={styles.text}>{monster.lore}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleShare}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCopy}>
          <Text style={styles.buttonText}>Copy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.backButton}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Create New Monster</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: COLORS.text,
    fontFamily: 'Aclonica',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 6,
    color: COLORS.text,
    fontFamily: 'Aclonica',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: COLORS.text,
    fontFamily: 'Aclonica',
  },
  buttonRow: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  backButton: {
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.button,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Aclonica',
  },
});