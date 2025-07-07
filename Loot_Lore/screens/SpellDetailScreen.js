/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from 'react';
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
  const [editableSpell, setEditableSpell] = useState(spell);
  const [isEditing, setIsEditing] = useState(false);

  const { theme, boldText } = useContext(ThemeContext);
  const themeColors = THEMES[theme] || THEMES.default;
  const globalStyles = getGlobalStyles(theme);
  const textWeight = boldText ? 'bold' : 'normal';

  useEffect(() => {
    setEditableSpell(spell);
  }, [spell]);

  if (!editableSpell || typeof editableSpell !== 'object') {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.title, { color: themeColors.text, fontWeight: textWeight }]}>No spell data found.</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.button }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonText, { color: themeColors.text, fontWeight: textWeight }]}>Go Back</Text>
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
      const existing = await AsyncStorage.getItem('@saved_spells');
      const spells = existing ? JSON.parse(existing) : [];
      spells.push(editableSpell);
      await AsyncStorage.setItem('@saved_spells', JSON.stringify(spells));
      Alert.alert('Success', 'Spell saved successfully!');
    } catch (error) {
      Alert.alert('Error saving', error.message);
    }
  };

  const styles = StyleSheet.create({
    centeredContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: themeColors.background,
    },
    container: {
      padding: 20,
      flexGrow: 1,
      backgroundColor: themeColors.background,
    },
    title: {
      fontSize: 26,
      marginBottom: 15,
      fontFamily: 'Aclonica',
      color: themeColors.text,
      fontWeight: textWeight,
    },
    sectionTitle: {
      fontSize: 20,
      marginTop: 15,
      marginBottom: 6,
      fontFamily: 'Aclonica',
      color: themeColors.text,
      fontWeight: textWeight,
    },
    text: {
      fontSize: 16,
      marginBottom: 5,
      fontFamily: 'Aclonica',
      color: themeColors.text,
      fontWeight: textWeight,
    },
    input: {
      borderWidth: 1,
      borderColor: themeColors.text,
      borderRadius: 6,
      padding: 8,
      marginBottom: 10,
      color: themeColors.text,
      fontFamily: 'Aclonica',
      fontWeight: textWeight,
    },
    buttonRow: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    buttonHalf: {
      backgroundColor: themeColors.button,
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
      backgroundColor: themeColors.button,
      paddingVertical: 16,
      paddingHorizontal: 40,
      borderRadius: 8,
      marginBottom: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: themeColors.text,
      fontSize: 16,
      fontFamily: 'Aclonica',
      fontWeight: textWeight,
    },
  });

  return (
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
          <TextInput style={styles.input} value={editableSpell.school} onChangeText={(text) => updateField('school', text)} placeholder="School" />
          <TextInput style={styles.input} value={editableSpell.level} onChangeText={(text) => updateField('level', text)} placeholder="Level" />
          <TextInput style={styles.input} value={editableSpell.castingTime} onChangeText={(text) => updateField('castingTime', text)} placeholder="Casting Time" />
          <TextInput style={styles.input} value={editableSpell.duration} onChangeText={(text) => updateField('duration', text)} placeholder="Duration" />
          <TextInput style={styles.input} value={editableSpell.range} onChangeText={(text) => updateField('range', text)} placeholder="Range" />
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
          <TextInput style={styles.input} value={editableSpell.components?.verbal ? 'Yes' : 'No'} onChangeText={(text) => updateComponent('verbal', text.toLowerCase() === 'yes')} placeholder="Verbal (Yes/No)" />
          <TextInput style={styles.input} value={editableSpell.components?.somatic ? 'Yes' : 'No'} onChangeText={(text) => updateComponent('somatic', text.toLowerCase() === 'yes')} placeholder="Somatic (Yes/No)" />
          <TextInput style={styles.input} value={editableSpell.components?.material || ''} onChangeText={(text) => updateComponent('material', text)} placeholder="Material" />
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
        <TouchableOpacity style={styles.buttonHalf} onPress={() => setIsEditing((prev) => !prev)}>
          <Text style={styles.buttonText}>{isEditing ? 'Done' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.backButton}>
        <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Create New Spell</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}