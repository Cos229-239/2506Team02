/* eslint-disable react/prop-types */
// MonsterDetailsScreen.js
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

export default function MonsterDetailsScreen({ route, navigation }) {
  const { monster } = route.params || {};
  const [editableMonster, setEditableMonster] = useState(monster);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditableMonster(monster);
  }, [monster]);

  if (!editableMonster || typeof editableMonster !== 'object') {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.title}>No monster data found.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
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
      `- Challenge Rating: ${editableMonster.promptChallengeRating || 'N/A'}\n\n` +
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isEditing ? (
        <TextInput
          style={styles.inputTitle}
          value={editableMonster.name}
          onChangeText={(text) => updateField('name', text)}
          placeholder="Name"
        />
      ) : (
        <Text style={styles.title}>{editableMonster.name}</Text>
      )}

      <Text style={styles.sectionTitle}>Monster Details</Text>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={editableMonster.promptType}
            onChangeText={(text) => updateField('promptType', text)}
            placeholder="Type"
          />
          <TextInput
            style={styles.input}
            value={editableMonster.promptRace}
            onChangeText={(text) => updateField('promptRace', text)}
            placeholder="Race"
          />
          <TextInput
            style={styles.input}
            value={editableMonster.promptChallengeRating}
            onChangeText={(text) => updateField('promptChallengeRating', text)}
            placeholder="Challenge Rating"
          />
        </>
      ) : (
        <>
          <Text style={styles.text}>Type: {editableMonster.promptType || 'N/A'}</Text>
          <Text style={styles.text}>Race: {editableMonster.promptRace || 'N/A'}</Text>
          <Text style={styles.text}>Challenge Rating: {editableMonster.promptChallengeRating || 'N/A'}</Text>
        </>
      )}

      <Text style={styles.sectionTitle}>Stats</Text>
      {Object.entries(editableMonster.stats || {}).map(([key, value]) =>
        isEditing ? (
          <TextInput
            key={key}
            style={styles.input}
            value={String(value)}
            onChangeText={(text) => updateStat(key, text)}
            placeholder={key}
            keyboardType="numeric"
          />
        ) : (
          <Text key={key} style={styles.text}>{`${key}: ${value}`}</Text>
        )
      )}

      <Text style={styles.sectionTitle}>Attacks</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          value={(editableMonster.attacks || []).join('\n')}
          onChangeText={(text) => updateListField('attacks', text)}
          placeholder="One attack per line"
        />
      ) : (
        editableMonster.attacks.map((atk, i) => (
          <Text key={`attack-${i}`} style={styles.text}>- {atk}</Text>
        ))
      )}

      <Text style={styles.sectionTitle}>Spells</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          value={(editableMonster.spells || []).join('\n')}
          onChangeText={(text) => updateListField('spells', text)}
          placeholder="One spell per line"
        />
      ) : (
        editableMonster.spells.map((sp, i) => (
          <Text key={`spell-${i}`} style={styles.text}>- {sp}</Text>
        ))
      )}

      <Text style={styles.sectionTitle}>Abilities</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          value={(editableMonster.abilities || []).join('\n')}
          onChangeText={(text) => updateListField('abilities', text)}
          placeholder="One ability per line"
        />
      ) : (
        editableMonster.abilities.map((ab, i) => (
          <Text key={`ability-${i}`} style={styles.text}>- {ab}</Text>
        ))
      )}

      <Text style={styles.sectionTitle}>Description</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          value={editableMonster.shortDescription}
          onChangeText={(text) => updateField('shortDescription', text)}
        />
      ) : (
        <Text style={styles.text}>{editableMonster.shortDescription}</Text>
      )}

      <Text style={styles.sectionTitle}>Lore</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          value={editableMonster.lore}
          onChangeText={(text) => updateField('lore', text)}
        />
      ) : (
        <Text style={styles.text}>{editableMonster.lore}</Text>
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
        <TouchableOpacity style={styles.buttonHalf} onPress={() => setIsEditing((e) => !e)}>
          <Text style={styles.buttonText}>{isEditing ? 'Done' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.backButton}>
        <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Create New Monster</Text>
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
  inputTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.text,
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
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.button,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
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