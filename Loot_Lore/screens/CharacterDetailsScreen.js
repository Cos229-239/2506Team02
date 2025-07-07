/* eslint-disable react/prop-types */
import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Share,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';

import { ThemeContext } from '../ThemeContext';
import { getGlobalStyles, THEMES } from '../styles';

export default function CharacterDetailsScreen({ route, navigation }) {
  const { theme } = useContext(ThemeContext);
  const globalStyles = getGlobalStyles(theme);
  const themeColors = THEMES[theme];

  const initialCharacter = route.params?.character || null;
  const [character, setCharacter] = useState(initialCharacter);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setCharacter(initialCharacter);
  }, [initialCharacter]);

  if (!character || typeof character !== 'object') {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.title, { color: themeColors.text }]}>No character data found.</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.button }]} onPress={() => navigation.goBack()}>
          <Text style={[styles.buttonText, { color: themeColors.text }]}>Go Back</Text>
        </TouchableOpacity>
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

  const updateField = (field, value) => {
    setCharacter((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>{character.name}</Text>

      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Basic Info</Text>
      <Text style={[styles.text, { color: themeColors.text }]}>Race: {character.race}</Text>
      <Text style={[styles.text, { color: themeColors.text }]}>Class: {character.class}</Text>
      <Text style={[styles.text, { color: themeColors.text }]}>Level: {character.level}</Text>
      <Text style={[styles.text, { color: themeColors.text }]}>Background: {character.background}</Text>
      <Text style={[styles.text, { color: themeColors.text }]}>Alignment: {character.alignment}</Text>

      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Stats</Text>
      {Object.entries(character.stats || {}).map(([stat, value]) => (
        <Text key={stat} style={[styles.text, { color: themeColors.text }]}>
          {stat}: {value}
        </Text>
      ))}

      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Backstory</Text>
      <Text style={[styles.text, { color: themeColors.text }]}>{character.backstory}</Text>

      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Personality</Text>
      <Text style={[styles.text, { color: themeColors.text }]}>{character.personality}</Text>

      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Traits & Abilities</Text>
      {(character.traits || []).map((trait, idx) => (
        <Text key={idx} style={[styles.text, { color: themeColors.text }]}>
          - {trait}
        </Text>
      ))}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.button }]} onPress={handleSave}>
          <Text style={[styles.buttonText, { color: themeColors.text }]}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.button }]} onPress={handleShare}>
          <Text style={[styles.buttonText, { color: themeColors.text }]}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.button }]} onPress={handleCopy}>
          <Text style={[styles.buttonText, { color: themeColors.text }]}>Copy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.backButton}>
        <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.button }]} onPress={() => navigation.goBack()}>
          <Text style={[styles.buttonText, { color: themeColors.text }]}>Create New Character</Text>
        </TouchableOpacity>
      </View>

      {/* Optional editing input (if used) */}
      {isEditing && (
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: themeColors.text,
            borderRadius: 6,
            padding: 8,
            marginBottom: 8,
            color: themeColors.text,
            fontFamily: 'Aclonica',
          }}
          placeholder="Edit something..."
          placeholderTextColor={themeColors.placeholder}
          onChangeText={(text) => updateField('backstory', text)}
          value={character.backstory}
          multiline
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: 'Aclonica',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 6,
    fontFamily: 'Aclonica',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Aclonica',
  },
  buttonRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Aclonica',
  },
});
