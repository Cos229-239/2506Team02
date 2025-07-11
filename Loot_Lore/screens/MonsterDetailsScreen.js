/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from 'react';
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

export default function MonsterDetailsScreen({ route, navigation }) {
  const { monster } = route.params || {};
  const { theme, boldText } = useContext(ThemeContext);
  const themeColors = THEMES[theme] || THEMES.default;
  const textWeight = boldText ? 'bold' : 'normal';
  const [editableMonster, setEditableMonster] = useState(monster);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditableMonster(monster);
  }, [monster]);

  if (!editableMonster || typeof editableMonster !== 'object') {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.title, { color: themeColors.text, fontWeight: textWeight }]}>No monster data found.</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.button }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonText, { color: themeColors.text, fontWeight: textWeight }]}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const generateMonsterText = () => {
    const abilities = (editableMonster.abilities || []).join('\n- ');
    const attacks = (editableMonster.attacks || []).join('\n- ');
    const spells = (editableMonster.spells || []).join('\n- ');

    return (
      `Name: ${editableMonster.name}\n\n` +
      `Prompt Used:\n` +
      `- Type: ${editableMonster.promptType || 'N/A'}\n` +
      `- Race: ${editableMonster.promptRace || 'N/A'}\n` +
      `- Challenge Rating: ${editableMonster.promptChallengeRating || 'N/A'}\n` +
      `- Size: ${editableMonster.promptSize || 'N/A'}\n` +
      `- Alignment: ${editableMonster.promptAlignment || 'N/A'}\n\n` +
      `Stats:\nSTR: ${editableMonster.stats.STR}\nDEX: ${editableMonster.stats.DEX}\nCON: ${editableMonster.stats.CON}\n` +
      `INT: ${editableMonster.stats.INT}\nWIS: ${editableMonster.stats.WIS}\nCHA: ${editableMonster.stats.CHA}\n\n` +
      `Abilities:\n- ${abilities}\n\n` +
      `Attacks:\n- ${attacks}\n\n` +
      `Spells:\n- ${spells}\n\n` +
      `Lore:\n${editableMonster.lore}\n\n` +
      `Short Description:\n${editableMonster.shortDescription}`
    );
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(generateMonsterText());
    Alert.alert('Copied', 'Monster copied to clipboard!');
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: generateMonsterText() });
    } catch (error) {
      Alert.alert('Error sharing', error.message);
    }
  };

  const handleSave = async () => {
    try {
      const existing = await AsyncStorage.getItem('@saved_monsters');
      const monsters = existing ? JSON.parse(existing) : [];
      monsters.push(editableMonster);
      await AsyncStorage.setItem('@saved_monsters', JSON.stringify(monsters));
      Alert.alert('Success', 'Monster saved successfully!');
    } catch (error) {
      Alert.alert('Error saving', error.message);
    }
  };

  const updateField = (field, value) => {
    setEditableMonster((prev) => ({ ...prev, [field]: value }));
  };

  const updateStat = (statKey, value) => {
    setEditableMonster((prev) => ({
      ...prev,
      stats: { ...prev.stats, [statKey]: value },
    }));
  };

  const updateListField = (field, value) => {
    setEditableMonster((prev) => ({ ...prev, [field]: value.split('\n') }));
  };

  const applyTextStyle = { color: themeColors.text, fontWeight: textWeight, fontFamily: 'Aclonica' };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: themeColors.background }]}>
      {isEditing ? (
        <TextInput
          style={[styles.inputTitle, applyTextStyle, { borderColor: themeColors.text }]}
          value={editableMonster.name}
          onChangeText={(text) => updateField('name', text)}
          placeholder="Name"
        />
      ) : (
        <Text style={[styles.title, applyTextStyle]}>{editableMonster.name}</Text>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Monster Details</Text>
      {isEditing ? (
        <>
          {['promptType', 'promptRace', 'promptChallengeRating', 'promptSize', 'promptAlignment'].map((field) => (
            <TextInput
              key={field}
              style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]}
              value={editableMonster[field]}
              onChangeText={(text) => updateField(field, text)}
              placeholder={field}
            />
          ))}
        </>
      ) : (
        <>
          <Text style={[styles.text, applyTextStyle]}>Type: {editableMonster.promptType || 'N/A'}</Text>
          <Text style={[styles.text, applyTextStyle]}>Race: {editableMonster.promptRace || 'N/A'}</Text>
          <Text style={[styles.text, applyTextStyle]}>Challenge Rating: {editableMonster.promptChallengeRating || 'N/A'}</Text>
          <Text style={[styles.text, applyTextStyle]}>Size: {editableMonster.promptSize || 'N/A'}</Text>
          <Text style={[styles.text, applyTextStyle]}>Alignment: {editableMonster.promptAlignment || 'N/A'}</Text>
        </>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Stats</Text>
      {Object.entries(editableMonster.stats || {}).map(([key, value]) =>
        isEditing ? (
          <TextInput
            key={key}
            style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]}
            value={String(value)}
            onChangeText={(text) => updateStat(key, text)}
            placeholder={key}
            keyboardType="numeric"
          />
        ) : (
          <Text key={key} style={[styles.text, applyTextStyle]}>{`${key}: ${value}`}</Text>
        )
      )}

      {['attacks', 'spells', 'abilities'].map((field) => (
        <View key={field}>
          <Text style={[styles.sectionTitle, applyTextStyle]}>{field[0].toUpperCase() + field.slice(1)}</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, applyTextStyle, { height: 80, borderColor: themeColors.text }]}
              multiline
              value={(editableMonster[field] || []).join('\n')}
              onChangeText={(text) => updateListField(field, text)}
              placeholder={`One ${field.slice(0, -1)} per line`}
            />
          ) : (
            editableMonster[field].map((item, i) => (
              <Text key={`${field}-${i}`} style={[styles.text, applyTextStyle]}>- {item}</Text>
            ))
          )}
        </View>
      ))}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Description</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, applyTextStyle, { height: 100, borderColor: themeColors.text }]}
          multiline
          value={editableMonster.shortDescription}
          onChangeText={(text) => updateField('shortDescription', text)}
        />
      ) : (
        <Text style={[styles.text, applyTextStyle]}>{editableMonster.shortDescription}</Text>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Lore</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, applyTextStyle, { height: 100, borderColor: themeColors.text }]}
          multiline
          value={editableMonster.lore}
          onChangeText={(text) => updateField('lore', text)}
        />
      ) : (
        <Text style={[styles.text, applyTextStyle]}>{editableMonster.lore}</Text>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.buttonHalf, { backgroundColor: themeColors.button }]}>
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
        <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.button }]} onPress={() => navigation.goBack()}>
          <Text style={[styles.buttonText, applyTextStyle]}>Create New Monster</Text>
        </TouchableOpacity>
      </View>

      <ImageGenerator prompt={editableMonster.shortDescription} />
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
  },
  inputTitle: {
    fontSize: 26,
    marginBottom: 15,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
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
  },
});
