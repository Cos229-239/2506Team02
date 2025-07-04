/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from 'react';
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
import { ThemeContext } from '../ThemeContext';
import { THEMES, getGlobalStyles } from '../styles';

export default function SpellDetailsScreen({ route, navigation }) {
  const { spell } = route.params || {};
  const { theme } = useContext(ThemeContext);
  const globalStyles = getGlobalStyles(theme);
  const colors = THEMES[theme];

  useEffect(() => {
    console.log('SpellDetailsScreen → spell:', spell);
  }, [spell]);

  if (!spell || typeof spell !== 'object') {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>No spell data found.</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.button }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonText, { color: colors.text }]}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const generateSpellText = () => {
    const effects = (spell.effects || []).join('\n- ');
    return (
      `Name: ${spell.name}\n\n` +
      `School: ${spell.school}\nLevel: ${spell.level}\n` +
      `Casting Time: ${spell.castingTime}\nDuration: ${spell.duration}\nRange: ${spell.range}\n\n` +
      `Description:\n${spell.description}\n\n` +
      `Effects:\n- ${effects}\n\n` +
      `Components:\nVerbal: ${spell.components?.verbal ? 'Yes' : 'No'}\n` +
      `Somatic: ${spell.components?.somatic ? 'Yes' : 'No'}\n` +
      `Material: ${spell.components?.material || 'None'}`
    );
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(generateSpellText());
    Alert.alert('Copied', 'Spell copied to clipboard!');
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: generateSpellText() });
    } catch (error) {
      Alert.alert('Error sharing', error.message);
    }
  };

  const handleSave = async () => {
    try {
      const existing = await AsyncStorage.getItem('@saved_characters');
      const characters = existing ? JSON.parse(existing) : [];
      characters.push(spell); // Fixed from "character" to "spell"
      await AsyncStorage.setItem('@saved_characters', JSON.stringify(characters));
      Alert.alert('Success', 'Spell saved successfully!');
    } catch (error) {
      Alert.alert('Error saving', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{spell.name}</Text>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Spell Details</Text>
      <Text style={[styles.text, { color: colors.text }]}>School: {spell.school}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Level: {spell.level}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Casting Time: {spell.castingTime}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Duration: {spell.duration}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Range: {spell.range}</Text>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Components</Text>
      <Text style={[styles.text, { color: colors.text }]}>Verbal: {spell.components?.verbal ? 'Yes' : 'No'}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Somatic: {spell.components?.somatic ? 'Yes' : 'No'}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Material: {spell.components?.material || 'None'}</Text>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
      <Text style={[styles.text, { color: colors.text }]}>{spell.description}</Text>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Effects</Text>
      {(spell.effects || []).map((effect, idx) => (
        <Text key={idx} style={[styles.text, { color: colors.text }]}>- {effect}</Text>
      ))}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={handleSave}>
          <Text style={[styles.buttonText, { color: colors.text }]}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={handleShare}>
          <Text style={[styles.buttonText, { color: colors.text }]}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={handleCopy}>
          <Text style={[styles.buttonText, { color: colors.text }]}>Copy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.backButton}>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={() => navigation.goBack()}>
          <Text style={[styles.buttonText, { color: colors.text }]}>Create New Character</Text>
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
  },
  container: {
    padding: 20,
    flexGrow: 1,
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
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
