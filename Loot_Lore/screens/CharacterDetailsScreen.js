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
import ImageGenerator from '../ImageGenerator';
import { ThemeContext } from '../ThemeContext';
import { getGlobalStyles, THEMES } from '../styles';
import { handleSaveCreation } from '../data/SaveCreation';

export default function CharacterDetailsScreen({ route, navigation }) {
  const { character: initialCharacter } = route.params || {};
  const { theme, boldText } = useContext(ThemeContext);
  const themeColors = THEMES[theme] || THEMES.default;

  const [character, setCharacter] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setCharacter(initialCharacter);
  }, [initialCharacter]);

  if (!character || typeof character !== 'object') {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.title, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
          No character data found.
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.button }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonText, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
            Go Back
          </Text>
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

  const handleCreateNewCharacter = () => {
  setCharacter(null);
  navigation.navigate('Characters');
};

  const updateField = (field, value) => {
    setCharacter((prev) => ({ ...prev, [field]: value }));
  };

  return (

    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: themeColors.background }]}>
      <ImageGenerator prompt={character.race + character.backstory } />
      <Text style={[styles.title, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
        {character.name}
      </Text>

      <Text style={[styles.sectionTitle, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
        Basic Info
      </Text>
      <Text style={[styles.text, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
        Race: {character.race}
      </Text>
      <Text style={[styles.text, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
        Class: {character.class}
      </Text>
      <Text style={[styles.text, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
        Level: {character.level}
      </Text>
      <Text style={[styles.text, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
        Background: {character.background}
      </Text>
      <Text style={[styles.text, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
        Alignment: {character.alignment}
      </Text>

      <Text style={[styles.sectionTitle, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
        Stats
      </Text>
      {Object.entries(character.stats || {}).map(([stat, value]) => (
        <Text key={stat} style={[styles.text, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
          {stat}: {value}
        </Text>
      ))}

      <Text style={[styles.sectionTitle, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
        Backstory
      </Text>
      <Text style={[styles.text, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
        {character.backstory}
      </Text>

      <Text style={[styles.sectionTitle, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
        Personality
      </Text>
      <Text style={[styles.text, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
        {character.personality}
      </Text>

      <Text style={[styles.sectionTitle, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
        Traits & Abilities
      </Text>
      {(character.traits || []).map((trait, idx) => (
        <Text key={idx} style={[styles.text, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
          - {trait}
        </Text>
      ))}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.button }]} onPress={handleSaveCreation}>
          <Text style={[styles.buttonText, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>Save</Text>

        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.button }]} onPress={handleShare}>
          <Text style={[styles.buttonText, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.button }]} onPress={handleCopy}>
          <Text style={[styles.buttonText, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>Copy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.backButton}>
        <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.button }]} onPress={handleCreateNewCharacter}>
          <Text style={[styles.buttonText, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
            Create New Character
          </Text>
        </TouchableOpacity>
      </View>

      {isEditing && (
        <TextInput
          style={[
            styles.input,
            {
              borderColor: themeColors.text,
              color: themeColors.text,
              backgroundColor: themeColors.inputBackground,
              fontWeight: boldText ? 'bold' : 'normal',
            },
          ]}
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
    fontFamily: 'Aclonica',
    marginBottom: 15,
  },
  inputTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    fontFamily: 'Aclonica',
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 6,
    fontFamily: 'Aclonica',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Aclonica',
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
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
    fontFamily: 'Aclonica',
  },
});
