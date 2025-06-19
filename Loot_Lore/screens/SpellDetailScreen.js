/* eslint-disable react/prop-types */
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

export default function SpellDetailsScreen({ route, navigation }) {
  const { spell } = route.params || {};

  useEffect(() => {
    console.log('SpellDetailsScreen → spell:', spell);
  }, [spell]);

  if (!spell || typeof spell !== 'object') {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.title}>No spell data found.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
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
        characters.push(character);
        await AsyncStorage.setItem('@saved_characters', JSON.stringify(characters));
        Alert.alert('Success', 'Character saved successfully!');
      } catch (error) {
        Alert.alert('Error saving', error.message);
      }
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{spell.name}</Text>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.text}>{spell.description}</Text>

      <Text style={styles.sectionTitle}>Effects</Text>
      {(spell.effects || []).map((effect, idx) => (
        <Text key={idx} style={styles.text}>- {effect}</Text>
      ))}

      <Text style={styles.sectionTitle}>Spell Details</Text>
      <Text style={styles.text}>School: {spell.school}</Text>
      <Text style={styles.text}>Level: {spell.level}</Text>
      <Text style={styles.text}>Casting Time: {spell.castingTime}</Text>
      <Text style={styles.text}>Duration: {spell.duration}</Text>
      <Text style={styles.text}>Range: {spell.range}</Text>

      <Text style={styles.sectionTitle}>Components</Text>
      <Text style={styles.text}>Verbal: {spell.components?.verbal ? 'Yes' : 'No'}</Text>
      <Text style={styles.text}>Somatic: {spell.components?.somatic ? 'Yes' : 'No'}</Text>
      <Text style={styles.text}>Material: {spell.components?.material || 'None'}</Text>

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