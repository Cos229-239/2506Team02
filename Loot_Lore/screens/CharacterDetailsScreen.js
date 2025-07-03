/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
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
import { COLORS } from '../styles';
import ImageGenerator from '../ImageGenerator';

export default function CharacterDetailsScreen({ route, navigation }) {
  const initialCharacter = route.params?.character || null;
  const [character, setCharacter] = useState(initialCharacter);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setCharacter(initialCharacter);
  }, [initialCharacter]);

  if (!character || typeof character !== 'object') {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.title}>No character data found.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
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
    <ScrollView contentContainerStyle={styles.container}>
    <ImageGenerator prompt={character.race + character.backstory } />
      
      <Text style={styles.title}>{character.name}</Text>

      <Text style={styles.sectionTitle}>Basic Info</Text>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={character.race}
            onChangeText={(text) => updateField('race', text)}
            placeholder="Race"
          />
          <TextInput
            style={styles.input}
            value={character.class}
            onChangeText={(text) => updateField('class', text)}
            placeholder="Class"
          />
          <TextInput
            style={styles.input}
            value={String(character.level)}
            onChangeText={(text) => updateField('level', text)}
            placeholder="Level"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={character.background}
            onChangeText={(text) => updateField('background', text)}
            placeholder="Background"
          />
          <TextInput
            style={styles.input}
            value={character.alignment}
            onChangeText={(text) => updateField('alignment', text)}
            placeholder="Alignment"
          />
        </>
      ) : (
        <>
          <Text style={styles.text}>Race: {character.race}</Text>
          <Text style={styles.text}>Class: {character.class}</Text>
          <Text style={styles.text}>Level: {character.level}</Text>
          <Text style={styles.text}>Background: {character.background}</Text>
          <Text style={styles.text}>Alignment: {character.alignment}</Text>
        </>
      )}

      <Text style={styles.sectionTitle}>Stats</Text>
      {isEditing ? (
        Object.entries(character.stats || {}).map(([stat, value]) => (
          <TextInput
            key={stat}
            style={styles.input}
            value={String(value)}
            onChangeText={(text) =>
              setCharacter((prev) => ({
                ...prev,
                stats: { ...prev.stats, [stat]: text },
              }))
            }
            placeholder={stat}
            keyboardType="numeric"
          />
        ))
      ) : (
        Object.entries(character.stats || {}).map(([stat, value]) => (
          <Text key={stat} style={styles.text}>
            {stat}: {value}
          </Text>
        ))
      )}

      <Text style={styles.sectionTitle}>Backstory</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          value={character.backstory}
          onChangeText={(text) => updateField('backstory', text)}
          placeholder="Backstory"
        />
      ) : (
        <Text style={styles.text}>{character.backstory}</Text>
      )}

      <Text style={styles.sectionTitle}>Personality</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          value={character.personality}
          onChangeText={(text) => updateField('personality', text)}
          placeholder="Personality"
        />
      ) : (
        <Text style={styles.text}>{character.personality}</Text>
      )}

      <Text style={styles.sectionTitle}>Traits & Abilities</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          value={(character.traits || []).join('\n')}
          onChangeText={(text) =>
            updateField('traits', text.split('\n'))
          }
          placeholder="Traits & Abilities (one per line)"
        />
      ) : (
        (character.traits || []).map((trait, idx) => (
          <Text key={idx} style={styles.text}>
            - {trait}
          </Text>
        ))
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonHalf} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonHalf} onPress={handleShare}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonHalf} onPress={handleCopy}>
          <Text style={styles.buttonText}>Copy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonHalf}
          onPress={() => setIsEditing((e) => !e)}
        >
          <Text style={styles.buttonText}>{isEditing ? 'Done' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.backButton}>
        <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Create New Character</Text>
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
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  input: {
    borderWidth: 1,
    borderColor: COLORS.text,
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    color: COLORS.text,
    fontFamily: 'Aclonica',
  },
  buttonRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonHalf: {
    backgroundColor: COLORS.button,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 10,
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    color: COLORS.text,
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