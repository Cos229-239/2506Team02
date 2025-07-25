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
import ImageGenerator from '../ImageGenerator';
import { ThemeContext } from '../ThemeContext';
import { THEMES, getGlobalStyles } from '../styles';
import { handleSaveCreation } from '../data/SaveCreation';


export default function SpellDetailsScreen({ route, navigation }) {
  const { spell } = route.params || {};
  const [editableSpell, setEditableSpell] = useState(spell);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

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
      `School: ${editableSpell.school}\nLevel: ${editableSpell.spellLevel}\n` +
      `Casting Time: ${editableSpell.castingTime}\nDuration: ${editableSpell.duration}\nRange: ${editableSpell.range}\n\n` +
      `Description:\n${editableSpell.description}\n\n` +
      `Effects:\n- ${effects}\n\n` +
      `Components:\nVerbal: ${editableSpell.components?.verbal ? 'Yes' : 'No'}\n` +
      `Somatic: ${editableSpell.components?.somatic ? 'Yes' : 'No'}\n` +
      `Material: ${editableSpell.components?.material || 'None'}`
    );
  };

  const handleCreateNewSpell = () => {
  setEditableSpell(null);
  navigation.navigate('Spells');
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

 const applyTextStyle = {
    color: themeColors.text,
    fontWeight: textWeight,
    fontFamily: 'Aclonica',
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, {backgroundColor: themeColors.background}]}>
      {!spell.isChecked ? (
    <ImageGenerator prompt={editableSpell.name + editableSpell.description} onImageGenerated={setImageUrl} />
      ) : (<></>)}
      {isEditing ? (
        <TextInput
          style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]}
          value={editableSpell.name}
          onChangeText={(text) => updateField('name', text)}
          placeholder="Spell Name"
          placeholderTextColor={themeColors.text}
        />
      ) : (
        <Text style={[styles.title, applyTextStyle]}>{editableSpell.name}</Text>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Spell Details</Text>

      {isEditing ? (
        <>
          <TextInput style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]} value={editableSpell.school} onChangeText={(text) => updateField('school', text)} placeholder="School" placeholderTextColor={themeColors.text}/>
          <TextInput style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]} value={editableSpell.spellLevel} onChangeText={(text) => updateField('spellLevel', text)} placeholder="Level" placeholderTextColor={themeColors.text}/>
          <TextInput style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]} value={editableSpell.castingTime} onChangeText={(text) => updateField('castingTime', text)} placeholder="Casting Time" placeholderTextColor={themeColors.text}/>
          <TextInput style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]} value={editableSpell.duration} onChangeText={(text) => updateField('duration', text)} placeholder="Duration" placeholderTextColor={themeColors.text}/>
          <TextInput style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]} value={editableSpell.range} onChangeText={(text) => updateField('range', text)} placeholder="Range" placeholderTextColor={themeColors.text}/>
        </>
      ) : (
        <>
          <Text style={[styles.input, applyTextStyle, { borderColor: themeColors.background }]}>School: {editableSpell.school}</Text>
          <Text style={[styles.input, applyTextStyle, { borderColor: themeColors.background }]}>Level: {editableSpell.spellLevel}</Text>
          <Text style={[styles.input, applyTextStyle, { borderColor: themeColors.background }]}>Casting Time: {editableSpell.castingTime}</Text>
          <Text style={[styles.input, applyTextStyle, { borderColor: themeColors.background }]}>Duration: {editableSpell.duration}</Text>
          <Text style={[styles.input, applyTextStyle, { borderColor: themeColors.background }]}>Range: {editableSpell.range}</Text>
        </>
      )}

      <Text  style={[styles.sectionTitle, applyTextStyle]}>Components</Text>
      {isEditing ? (
        <>
          <TextInput style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]} value={editableSpell.components?.verbal ? 'Yes' : 'No'} onChangeText={(text) => updateComponent('verbal', text.toLowerCase() === 'yes')} placeholder="Verbal (Yes/No)" placeholderTextColor={themeColors.text}/>
          <TextInput style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]} value={editableSpell.components?.somatic ? 'Yes' : 'No'} onChangeText={(text) => updateComponent('somatic', text.toLowerCase() === 'yes')} placeholder="Somatic (Yes/No)" placeholderTextColor={themeColors.text}/>
          <TextInput style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]} value={editableSpell.components?.material || ''} onChangeText={(text) => updateComponent('material', text)} placeholder="Material" placeholderTextColor={themeColors.text}/>
        </>
      ) : (
        <>
          <Text style={[styles.input, applyTextStyle, { borderColor: themeColors.background }]}>Verbal: {editableSpell.components?.verbal ? 'Yes' : 'No'}</Text>
          <Text style={[styles.input, applyTextStyle, { borderColor: themeColors.background }]}>Somatic: {editableSpell.components?.somatic ? 'Yes' : 'No'}</Text>
          <Text style={[styles.input, applyTextStyle, { borderColor: themeColors.background }]}>Material: {editableSpell.components?.material || 'None'}</Text>
        </>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Description</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, applyTextStyle, { height: 100, borderColor: themeColors.text }]}
          multiline
          value={editableSpell.description}
          onChangeText={(text) => updateField('description', text)}
          placeholder="Description"
          placeholderTextColor={themeColors.text}
        />
      ) : (
        <Text style={[styles.text, applyTextStyle]}>{editableSpell.description}</Text>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Effects</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, applyTextStyle, { height: 100, borderColor: themeColors.text }]}
          multiline
          value={(editableSpell.effects || []).join('\n')}
          onChangeText={updateEffects}
          placeholder="Effects (one per line)"
          placeholderTextColor={themeColors.text}
        />
      ) : (
        (editableSpell.effects || []).map((effect, idx) => (
          <Text key={idx} style={[styles.text, applyTextStyle]}>- {effect}</Text>
        ))
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.buttonHalf, { backgroundColor: themeColors.button }]} onPress={() => handleSaveCreation({ ...editableSpell, imageUrl }, 'spell')}>
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
        <TouchableOpacity style={[styles.buttonHalf, { backgroundColor: themeColors.button }]} onPress={() => setIsEditing((prev) => !prev)}>
          <Text style={[styles.buttonText, applyTextStyle]}>{isEditing ? 'Done' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.backButton}>
        <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.button }, { width: '100%' }]} onPress={handleCreateNewSpell}>
        <Text style={[styles.buttonText, applyTextStyle]}>Create New Spell</Text>
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
      marginBottom: 15,
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
      marginBottom: 10,
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