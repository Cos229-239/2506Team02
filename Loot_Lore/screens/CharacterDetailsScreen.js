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
import { THEMES } from '../styles';
import { handleSaveCreation } from '../data/SaveCreation';

export default function CharacterDetailsScreen({ route, navigation }) {
  const { character: initialCharacter } = route.params || {};
  const { theme, boldText } = useContext(ThemeContext);
  const themeColors = THEMES[theme] || THEMES.default;
  const textWeight = boldText ? 'bold' : 'normal';

  const [character, setCharacter] = useState(initialCharacter);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialCharacter?.imageUrl || null);

  useEffect(() => {
    setCharacter(initialCharacter);
  }, [initialCharacter]);

  if (!character || typeof character !== 'object') {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.title, { color: themeColors.text, fontWeight: textWeight }]}>
          No character data found.
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.button }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonText, { color: themeColors.text, fontWeight: textWeight }]}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const generateCharacterText = () => {
    return (
      `Name: ${character.name}\n\n` +
      `Race: ${character.race}\nClass: ${character.class}\nLevel: ${character.level}\n` +
      `Background: ${character.background}\nAlignment: ${character.alignment}\n\n` +
      `Stats:\n${Object.entries(character.stats || {}).map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n` +
      `Personality:\n${character.personality}\n\n` +
      `Backstory:\n${character.backstory}\n\n` +
      `Traits & Abilities:\n- ${(character.traits || []).join('\n- ')}`
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: generateCharacterText() });
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

  const updateStat = (statKey, value) => {
    setCharacter((prev) => ({
      ...prev,
      stats: { ...prev.stats, [statKey]: value },
    }));
  };

  const updateListField = (field, value) => {
    setCharacter((prev) => ({ ...prev, [field]: value.split('\n') }));
  };

  const applyTextStyle = {
    color: themeColors.text,
    fontWeight: textWeight,
    fontFamily: 'Aclonica',
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: themeColors.background }]}>
      <ImageGenerator prompt={character.backstory || character.race} onImageGenerated={setImageUrl} />
      {isEditing ? (
        <TextInput
          style={[styles.inputTitle, applyTextStyle, { borderColor: themeColors.text }]}
          value={character.name}
          onChangeText={(text) => updateField('name', text)}
          placeholder="Name"
          placeholderTextColor={themeColors.text}
        />
      ) : (
        <Text style={[styles.title, applyTextStyle]}>{character.name}</Text>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Basic Info</Text>
      {['race', 'class', 'level', 'background', 'alignment'].map((field) =>
        isEditing ? (
          <TextInput
            key={field}
            style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]}
            value={character[field]}
            onChangeText={(text) => updateField(field, text)}
            placeholder={field}
            placeholderTextColor={themeColors.text}
          />
        ) : (
          <Text key={field} style={[styles.text, applyTextStyle]}>
            {`${field[0].toUpperCase() + field.slice(1)}: ${character[field]}`}
          </Text>
        )
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Stats</Text>
      {Object.entries(character.stats || {}).map(([stat, value]) =>
        isEditing ? (
          <TextInput
            key={stat}
            style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]}
            value={String(value)}
            onChangeText={(text) => updateStat(stat, text)}
            placeholder={stat}
            keyboardType="numeric"
            placeholderTextColor={themeColors.text}
          />
        ) : (
          <Text key={stat} style={[styles.text, applyTextStyle]}>
            {`${stat}: ${value}`}
          </Text>
        )
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Personality</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, applyTextStyle, { height: 80, borderColor: themeColors.text }]}
          multiline
          value={character.personality}
          onChangeText={(text) => updateField('personality', text)}
          placeholder='Personality traits, ideals, bonds, and flaws'
          placeholderTextColor={themeColors.text}
        />
      ) : (
        <Text style={[styles.text, applyTextStyle]}>{character.personality}</Text>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Backstory</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, applyTextStyle, { height: 100, borderColor: themeColors.text }]}
          multiline
          value={character.backstory}
          onChangeText={(text) => updateField('backstory', text)}
          placeholder='Once upon a time.... backstory'
          placeholderTextColor={themeColors.text}
        />
      ) : (
        <Text style={[styles.text, applyTextStyle]}>{character.backstory}</Text>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Traits & Abilities</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, applyTextStyle, { height: 80, borderColor: themeColors.text }]}
          multiline
          value={(character.traits || []).join('\n')}
          onChangeText={(text) => updateListField('traits', text)}
          placeholder="One trait per line"
          placeholderTextColor={themeColors.text}
        />
      ) : (
        (character.traits || []).map((trait, i) => (
          <Text key={i} style={[styles.text, applyTextStyle]}>
            - {trait}
          </Text>
        ))
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.buttonHalf, { backgroundColor: themeColors.button }]}
          onPress={() => handleSaveCreation({ ...character, imageUrl }, 'character')}
        >
          <Text style={[styles.buttonText, applyTextStyle]}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonHalf, { backgroundColor: themeColors.button }]} onPress={handleShare}>
          <Text style={[styles.buttonText, applyTextStyle]}>Share</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.buttonHalf, { backgroundColor: themeColors.button }]} onPress={handleCopy}>
          <Text style={[styles.buttonText, applyTextStyle]}>Copy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonHalf, { backgroundColor: themeColors.button }]}
          onPress={() => setIsEditing((e) => !e)}
        >
          <Text style={[styles.buttonText, applyTextStyle]}>{isEditing ? 'Done' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.backButton}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.button }]}
          onPress={handleCreateNewCharacter}
        >
          <Text style={[styles.buttonText, applyTextStyle]}>Create New Character</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 15,
    fontFamily: 'Aclonica',
  },
  inputTitle: {
    fontSize: 26,
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
  buttonHalf: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 10,
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Aclonica',
  },
});