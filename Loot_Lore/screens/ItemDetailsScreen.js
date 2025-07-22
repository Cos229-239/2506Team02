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
import { THEMES } from '../styles';
import { handleSaveCreation } from '../data/SaveCreation';
import ImageGenerator from '../ImageGenerator';

export default function ItemDetailsScreen({ route, navigation }) {
  const { item: initialItem } = route.params || {};
  const [item, setItem] = useState(initialItem);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const { theme, boldText } = useContext(ThemeContext);
  const themeColors = THEMES[theme] || THEMES.default;
  const textWeight = boldText ? 'bold' : 'normal';

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

  const handleSave = () => {
    handleSaveCreation({ ...item, imageUrl }, 'item');
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(generateItemText());
    Alert.alert('Copied', 'Item copied to clipboard!');
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: generateItemText() });
    } catch (error) {
      Alert.alert('Error sharing', error.message);
    }
  };

  const handleCreateNewItem = () => {
    setItem(null);
    navigation.navigate('Items');
  };

  const applyTextStyle = { color: themeColors.text, fontWeight: textWeight, fontFamily: 'Aclonica' };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: themeColors.background }]}>
      <ImageGenerator prompt={item.name + ' ' + item.description} onImageGenerated={setImageUrl} />

      {isEditing ? (
        <TextInput
          style={[styles.inputTitle, applyTextStyle, { borderColor: themeColors.text }]}
          value={item.name}
          onChangeText={(text) => updateField('name', text)}
          placeholder="Name"
          placeholderTextColor={themeColors.text}
        />
      ) : (
        <Text style={[styles.title, applyTextStyle]}>{item.name}</Text>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Basic Info</Text>
      {isEditing ? (
        <>
          <TextInput style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]} value={item.type} onChangeText={(text) => updateField('type', text)} placeholder="Type" placeholderTextColor={themeColors.text} />
          <TextInput style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]} value={item.magicItem} onChangeText={(text) => updateField('magicItem', text)} placeholder="Magic" placeholderTextColor={themeColors.text} />
        </>
      ) : (
        <>
          <Text style={[styles.text, applyTextStyle]}>Type: {item.type}</Text>
          <Text style={[styles.text, applyTextStyle]}>Magic: {item.magicItem}</Text>
        </>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Damage</Text>
      {isEditing ? (
        <>
          <TextInput style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]} value={item.damage?.amount} onChangeText={(text) => updateField('damage', { ...item.damage, amount: text })} placeholder="Damage Amount" placeholderTextColor={themeColors.text} />
          <TextInput style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]} value={item.damage?.type} onChangeText={(text) => updateField('damage', { ...item.damage, type: text })} placeholder="Damage Type" placeholderTextColor={themeColors.text} />
        </>
      ) : (
        <Text style={[styles.text, applyTextStyle]}>{item.damage?.amount} {item.damage?.type}</Text>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Properties</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, applyTextStyle, { height: 80, borderColor: themeColors.text }]}
          multiline
          value={(item.properties || []).join('\n')}
          onChangeText={(text) => updateField('properties', text.split('\n'))}
          placeholder="Properties (one per line)"
          placeholderTextColor={themeColors.text}
        />
      ) : (
        (item.properties || []).map((prop, idx) => (
          <Text key={idx} style={[styles.text, applyTextStyle]}>- {prop}</Text>
        ))
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Effects</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, applyTextStyle, { height: 80, borderColor: themeColors.text }]}
          multiline
          value={(item.effect || []).join('\n')}
          onChangeText={(text) => updateField('effect', text.split('\n'))}
          placeholder="Effects (one per line)"
          placeholderTextColor={themeColors.text}
        />
      ) : (
        (item.effect || []).map((eff, idx) => (
          <Text key={idx} style={[styles.text, applyTextStyle]}>- {eff}</Text>
        ))
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Origin</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, applyTextStyle, { height: 80, borderColor: themeColors.text }]}
          multiline
          value={item.origin}
          onChangeText={(text) => updateField('origin', text)}
          placeholder="Origin"
          placeholderTextColor={themeColors.text}
        />
      ) : (
        <Text style={[styles.text, applyTextStyle]}>{item.origin}</Text>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Description</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, applyTextStyle, { height: 80, borderColor: themeColors.text }]}
          multiline
          value={item.description}
          onChangeText={(text) => updateField('description', text)}
          placeholder="Description"
          placeholderTextColor={themeColors.text}
        />
      ) : (
        <Text style={[styles.text, applyTextStyle]}>{item.description}</Text>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.buttonHalf, { backgroundColor: themeColors.button }]}
          onPress={handleSave}
        >
          <Text style={[styles.buttonText, applyTextStyle]}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonHalf, { backgroundColor: themeColors.button }]}
          onPress={handleShare}
        >
          <Text style={[styles.buttonText, applyTextStyle]}>Share</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.buttonHalf, { backgroundColor: themeColors.button }]}
          onPress={handleCopy}
        >
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
        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.button }]}
          onPress={handleCreateNewItem}
        >
          <Text style={[styles.buttonText, applyTextStyle]}>Create New Item</Text>
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