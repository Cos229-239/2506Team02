/* eslint-disable react/prop-types */
<<<<<<< HEAD
import React, { useEffect, useContext } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { ThemeContext } from '../ThemeContext';
import { THEMES, getGlobalStyles } from '../styles';

export default function SpellDetailsScreen({ route, navigation }) {
  const { spell } = route.params || {};
<<<<<<< HEAD
  const { theme } = useContext(ThemeContext);
  const globalStyles = getGlobalStyles(theme);
  const colors = THEMES[theme];
=======
  const [editableSpell, setEditableSpell] = useState(spell);
  const [isEditing, setIsEditing] = useState(false);
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0

  useEffect(() => {
    setEditableSpell(spell);
  }, [spell]);

  if (!editableSpell || typeof editableSpell !== 'object') {
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

  const updateField = (field, value) => {
    setEditableSpell((prev) => ({ ...prev, [field]: value }));
  };

  const updateComponent = (field, value) => {
    setEditableSpell((prev) => ({
      ...prev,
      components: { ...prev.components, [field]: value },
    }));
  };

  const updateEffects = (text) => {
    setEditableSpell((prev) => ({
      ...prev,
      effects: text.split('\n'),
    }));
  };

  const generateSpellText = () => {
    const effects = (editableSpell.effects || []).join('\n- ');
    return (
      `Name: ${editableSpell.name}\n\n` +
      `School: ${editableSpell.school}\nLevel: ${editableSpell.level}\n` +
      `Casting Time: ${editableSpell.castingTime}\nDuration: ${editableSpell.duration}\nRange: ${editableSpell.range}\n\n` +
      `Description:\n${editableSpell.description}\n\n` +
      `Effects:\n- ${effects}\n\n` +
      `Components:\nVerbal: ${editableSpell.components?.verbal ? 'Yes' : 'No'}\n` +
      `Somatic: ${editableSpell.components?.somatic ? 'Yes' : 'No'}\n` +
      `Material: ${editableSpell.components?.material || 'None'}`
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
<<<<<<< HEAD
      const existing = await AsyncStorage.getItem('@saved_characters');
      const characters = existing ? JSON.parse(existing) : [];
      characters.push(spell); // Fixed from "character" to "spell"
      await AsyncStorage.setItem('@saved_characters', JSON.stringify(characters));
=======
      const existing = await AsyncStorage.getItem('@saved_spells');
      const spells = existing ? JSON.parse(existing) : [];
      spells.push(editableSpell);
      await AsyncStorage.setItem('@saved_spells', JSON.stringify(spells));
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
      Alert.alert('Success', 'Spell saved successfully!');
    } catch (error) {
      Alert.alert('Error saving', error.message);
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <ScrollView contentContainerStyle={styles.container}>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editableSpell.name}
          onChangeText={(text) => updateField('name', text)}
          placeholder="Spell Name"
        />
      ) : (
        <Text style={styles.title}>{editableSpell.name}</Text>
      )}

      <Text style={styles.sectionTitle}>Spell Details</Text>

      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={editableSpell.school}
            onChangeText={(text) => updateField('school', text)}
            placeholder="School"
          />
          <TextInput
            style={styles.input}
            value={editableSpell.level}
            onChangeText={(text) => updateField('level', text)}
            placeholder="Level"
          />
          <TextInput
            style={styles.input}
            value={editableSpell.castingTime}
            onChangeText={(text) => updateField('castingTime', text)}
            placeholder="Casting Time"
          />
          <TextInput
            style={styles.input}
            value={editableSpell.duration}
            onChangeText={(text) => updateField('duration', text)}
            placeholder="Duration"
          />
          <TextInput
            style={styles.input}
            value={editableSpell.range}
            onChangeText={(text) => updateField('range', text)}
            placeholder="Range"
          />
        </>
      ) : (
        <>
          <Text style={styles.text}>School: {editableSpell.school}</Text>
          <Text style={styles.text}>Level: {editableSpell.level}</Text>
          <Text style={styles.text}>Casting Time: {editableSpell.castingTime}</Text>
          <Text style={styles.text}>Duration: {editableSpell.duration}</Text>
          <Text style={styles.text}>Range: {editableSpell.range}</Text>
        </>
      )}

      <Text style={styles.sectionTitle}>Components</Text>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={editableSpell.components?.verbal ? 'Yes' : 'No'}
            onChangeText={(text) =>
              updateComponent('verbal', text.toLowerCase() === 'yes')
            }
            placeholder="Verbal (Yes/No)"
          />
          <TextInput
            style={styles.input}
            value={editableSpell.components?.somatic ? 'Yes' : 'No'}
            onChangeText={(text) =>
              updateComponent('somatic', text.toLowerCase() === 'yes')
            }
            placeholder="Somatic (Yes/No)"
          />
          <TextInput
            style={styles.input}
            value={editableSpell.components?.material || ''}
            onChangeText={(text) => updateComponent('material', text)}
            placeholder="Material"
          />
        </>
      ) : (
        <>
          <Text style={styles.text}>Verbal: {editableSpell.components?.verbal ? 'Yes' : 'No'}</Text>
          <Text style={styles.text}>Somatic: {editableSpell.components?.somatic ? 'Yes' : 'No'}</Text>
          <Text style={styles.text}>Material: {editableSpell.components?.material || 'None'}</Text>
        </>
      )}

      <Text style={styles.sectionTitle}>Description</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          value={editableSpell.description}
          onChangeText={(text) => updateField('description', text)}
          placeholder="Description"
        />
      ) : (
        <Text style={styles.text}>{editableSpell.description}</Text>
      )}

      <Text style={styles.sectionTitle}>Effects</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          value={(editableSpell.effects || []).join('\n')}
          onChangeText={updateEffects}
          placeholder="Effects (one per line)"
        />
      ) : (
        (editableSpell.effects || []).map((effect, idx) => (
          <Text key={idx} style={styles.text}>- {effect}</Text>
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
          onPress={() => setIsEditing((prev) => !prev)}
        >
          <Text style={styles.buttonText}>{isEditing ? 'Done' : 'Edit'}</Text>
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
        </TouchableOpacity>
      </View>

      <View style={styles.backButton}>
<<<<<<< HEAD
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={() => navigation.goBack()}>
          <Text style={[styles.buttonText, { color: colors.text }]}>Create New Character</Text>
=======
        <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Create New Spell</Text>
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
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
<<<<<<< HEAD
=======
    backgroundColor: COLORS.background,
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
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
  input: {
    borderWidth: 1,
    borderColor: COLORS.text,
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
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
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
<<<<<<< HEAD
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginHorizontal: 5,
=======
    backgroundColor: COLORS.button,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
<<<<<<< HEAD
=======
    color: COLORS.text,
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Aclonica',
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
