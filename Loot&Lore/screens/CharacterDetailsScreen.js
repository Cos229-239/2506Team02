/* eslint-disable react/prop-types */ 
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
  Share,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { COLORS } from '../styles';

export default function CharacterDetailsScreen({ route, navigation }) {
  const { character } = route.params || {};

  useEffect(() => {
    console.log('CharacterDetailsScreen → character:', character);
  }, [character]);

  if (!character || typeof character !== 'object') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No character data found.</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} color={COLORS.button} />
      </View>
    );
  }

  const generateCharacterText = () => {
    const basicInfo =
      `Race: ${character.race}\n` +
      `Class: ${character.class}\n` +
      `Level: ${character.level}\n` +
      `Background: ${character.background}\n` +
      `Alignment: ${character.alignment}\n\n`;

    return (
      basicInfo +
      `Name: ${character.name}\n\n` +
      `Personality:\n${character.personality}\n\n` +
      `Backstory:\n${character.backstory}\n\n` +
      `Traits & Abilities:\n${(character.traits || []).join('\n')}\n\n` +
      `Stats:\n${Object.entries(character.stats || {})
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')}`
    );
  };

  const handleShare = async () => {
    try {
      const message = generateCharacterText();
      await Share.share({ message });
    } catch (error) {
      Alert.alert('Error sharing', error.message);
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(generateCharacterText());
    Alert.alert('Copied', 'Character copied to clipboard!');
  };

  const handleSave = async () => {
    try {
      const existing = await AsyncStorage.getItem('@saved_characters');
      const characters = existing ? JSON.parse(existing) : [];
      characters.push(character);
      await AsyncStorage.setItem('@saved_characters', JSON.stringify(characters));
      Alert.alert('Success', 'Character saved successfully!');
    } catch (error) {
      Alert.alert('Error saving', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{character.name}</Text>

      <Text style={styles.sectionTitle}>Basic Info</Text>
      <Text style={styles.text}>Race: {character.race}</Text>
      <Text style={styles.text}>Class: {character.class}</Text>
      <Text style={styles.text}>Level: {character.level}</Text>
      <Text style={styles.text}>Background: {character.background}</Text>
      <Text style={styles.text}>Alignment: {character.alignment}</Text>

      <Text style={styles.sectionTitle}>Personality</Text>
      <Text style={styles.text}>{character.personality}</Text>

      <Text style={styles.sectionTitle}>Backstory</Text>
      <Text style={styles.text}>{character.backstory}</Text>

      <Text style={styles.sectionTitle}>Traits & Abilities</Text>
      {(character.traits || []).map((trait, idx) => (
        <Text key={idx} style={styles.text}>
          - {trait}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Stats</Text>
      {Object.entries(character.stats || {}).map(([stat, value]) => (
        <Text key={stat} style={styles.text}>
          {stat}: {value}
        </Text>
      ))}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
  <Text style={styles.text}>Save</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.button} onPress={handleShare}>
  <Text style={styles.text}>Share</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.button} onPress={handleCopy}>
  <Text style={styles.text}>Copy</Text>
</TouchableOpacity>
      </View>

      <View style={styles.backButton}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
  <Text style={styles.text}>Create New Character</Text>
</TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
  backgroundColor: COLORS.button, // Or your preferred color
  paddingVertical: 16,
  paddingHorizontal: 40,
  borderRadius: 8,
  marginHorizontal: 5,
  marginBottom: 10,
  alignItems: 'center',
},
buttonText: {
  color: COLORS.textOnAccent || '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  fontFamily: 'Aclonica',
},
});