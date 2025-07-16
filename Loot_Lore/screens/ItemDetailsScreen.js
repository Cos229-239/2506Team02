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
import { ThemeContext } from '../ThemeContext'; // Import ThemeContext
import { getGlobalStyles, THEMES } from '../styles'; // Import getGlobalStyles
import { handleSaveCreation } from '../data/SaveCreation';

export default function ItemDetailsScreen({ route, navigation }) {
  const { item: initialItem } = route.params || {};
  const [item, setItem] = useState(initialItem);
  const [isEditing, setIsEditing] = useState(false);

  const { theme, boldText } = useContext(ThemeContext);  // Get the current theme from ThemeContext
  const themeColors = THEMES[theme] || THEMES.default;  // Retrieve colors based on selected theme
  const textWeight = boldText ? 'bold' : 'normal';  // Adjust text weight based on boldText

  useEffect(() => {
    setItem(initialItem);
  }, [initialItem]);

  if (!item || typeof item !== 'object') {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.title, { color: themeColors.text, fontWeight: textWeight }]}>No item data found.</Text>
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
    setItem((prev) => ({ ...prev, [field]: value }));
  };

  const generateItemText = () => {
    return (
      `Name: ${item.name}\n\n` +
      `Type: ${item.type}\n` +
      `Magic: ${item.magicItem}\n\n` +
      `Damage: ${item.damage?.amount || ''} ${item.damage?.type || ''}\n\n` +
      `Properties:\n${(item.properties || []).join('\n')}\n\n` +
      `Effect:\n${(item.effect || []).join('\n')}\n\n` +
      `Origin:\n${item.origin}\n\n` +
      `Description:\n${item.description}`
    );
  };

  const handleShare = async () => {
    try {
      const message = generateItemText();
      await Share.share({ message });
    } catch (error) {
      Alert.alert('Error sharing', error.message);
    }
  };

  const handleCreateNewItem = () => {
  setItem(null);
  navigation.navigate('Items');
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(generateItemText());
    Alert.alert('Copied', 'Item copied to clipboard!');
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isEditing ? (
                  <TextInput
                    style={styles.inputTitle}
                    value={item.name}
                    onChangeText={(text) => updateField('name', text)}
                    placeholder="Name"
                  />
                ) : (
                  <Text style={styles.title}>{item.name}</Text>
                )}

      <Text style={[styles.sectionTitle, { color: themeColors.text, fontWeight: textWeight }]}>Basic Info</Text>
      {isEditing ? (
        <>
          <TextInput style={[styles.input, { color: themeColors.text }]} value={item.type} onChangeText={(text) => updateField('type', text)} placeholder="Type" />
          <TextInput style={[styles.input, { color: themeColors.text }]} value={item.magicItem} onChangeText={(text) => updateField('magicItem', text)} placeholder="Magic" />
        </>
      ) : (
        <>
          <Text style={[styles.text, { color: themeColors.text, fontWeight: textWeight }]}>Type: {item.type}</Text>
          <Text style={[styles.text, { color: themeColors.text, fontWeight: textWeight }]}>Magic: {item.magicItem}</Text>
        </>
      )}

      <Text style={[styles.sectionTitle, { color: themeColors.text, fontWeight: textWeight }]}>Damage</Text>
      {isEditing ? (
        <>
          <TextInput style={[styles.input, { color: themeColors.text }]} value={item.damage?.amount} onChangeText={(text) => updateField('damage', { ...item.damage, amount: text })} placeholder="Damage Amount" />
          <TextInput style={[styles.input, { color: themeColors.text }]} value={item.damage?.type} onChangeText={(text) => updateField('damage', { ...item.damage, type: text })} placeholder="Damage Type" />
        </>
      ) : (
        <Text style={[styles.text, { color: themeColors.text, fontWeight: textWeight }]}>{item.damage?.amount} {item.damage?.type}</Text>
      )}

      <Text style={[styles.sectionTitle, { color: themeColors.text, fontWeight: textWeight }]}>Properties</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, { height: 80, color: themeColors.text }]}
          multiline
          value={(item.properties || []).join('\n')}
          onChangeText={(text) => updateField('properties', text.split('\n'))}
          placeholder="Properties (one per line)"
        />
      ) : (
        (item.properties || []).map((prop, idx) => (
          <Text key={idx} style={[styles.text, { color: themeColors.text, fontWeight: textWeight }]}>- {prop}</Text>
        ))
      )}

      <Text style={[styles.sectionTitle, { color: themeColors.text, fontWeight: textWeight }]}>Effects</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, { height: 80, color: themeColors.text }]}
          multiline
          value={(item.effect || []).join('\n')}
          onChangeText={(text) => updateField('effect', text.split('\n'))}
          placeholder="Effects (one per line)"
        />
      ) : (
        (item.effect || []).map((eff, idx) => (
          <Text key={idx} style={[styles.text, { color: themeColors.text, fontWeight: textWeight }]}>- {eff}</Text>
        ))
      )}

      <Text style={[styles.sectionTitle, { color: themeColors.text, fontWeight: textWeight }]}>Origin</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, { height: 80, color: themeColors.text }]}
          multiline
          value={item.origin}
          onChangeText={(text) => updateField('origin', text)}
          placeholder="Origin"
        />
      ) : (
        <Text style={[styles.text, { color: themeColors.text, fontWeight: textWeight }]}>{item.origin}</Text>
      )}

      <Text style={[styles.sectionTitle, { color: themeColors.text, fontWeight: textWeight }]}>Description</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, { height: 80, color: themeColors.text }]}
          multiline
          value={item.description}
          onChangeText={(text) => updateField('description', text)}
          placeholder="Description"
        />
      ) : (
        <Text style={[styles.text, { color: themeColors.text, fontWeight: textWeight }]}>{item.description}</Text>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonHalf} onPress={() => handleSaveCreation(item, 'item')}>
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
        <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={handleCreateNewItem}>
          <Text style={styles.buttonText}>Create New Item</Text>
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
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    fontFamily: 'Aclonica',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  buttonRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonHalf: {
    backgroundColor: '#0066cc',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 10,
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    color: '#000',
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
