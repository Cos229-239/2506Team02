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

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      flexGrow: 1,
      backgroundColor: themeColors.background,
    },
    centeredContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: themeColors.background,
    },
    title: {
      fontSize: 26,
      fontWeight: textWeight,
      marginBottom: 15,
      fontFamily: 'Aclonica',
      color: themeColors.text,
    },
    inputTitle: {
      fontSize: 26,
      fontWeight: textWeight,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderColor: themeColors.text,
      color: themeColors.text,
      fontFamily: 'Aclonica',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: textWeight,
      marginTop: 15,
      marginBottom: 6,
      fontFamily: 'Aclonica',
      color: themeColors.text,
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
      marginBottom: 8,
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
      fontSize: 16,
      fontFamily: 'Aclonica',
      color: themeColors.text,
      fontWeight: textWeight,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* render content here using styles */}
    </ScrollView>
  );
}