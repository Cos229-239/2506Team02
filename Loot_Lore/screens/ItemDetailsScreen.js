/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { COLORS } from '../styles';

export default function ItemDetailsScreen({ route, navigation }) {
  const { item } = route.params || {};
  const [editableItem, setEditableItem] = useState({
    ...item,
    properties: Array.isArray(item?.properties) ? item.properties : [],
    effect: Array.isArray(item?.effect) ? item.effect : [],
    damage: item?.damage || { amount: '0', type: 'N/A' },
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditableItem({
      ...item,
      properties: Array.isArray(item?.properties) ? item.properties : [],
      effect: Array.isArray(item?.effect) ? item.effect : [],
      damage: item?.damage || { amount: '0', type: 'N/A' },
    });
  }, [item]);

  if (!editableItem || typeof editableItem !== 'object') {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.title}>No item data found.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const updateField = (field, value) => {
    setEditableItem((prev) => ({ ...prev, [field]: value }));
  };

  const updateEffect = (text) => {
    setEditableItem((prev) => ({
      ...prev,
      effect: text.split('\n'),
    }));
  };

  const handleSave = async () => {
    try {
      const existing = await AsyncStorage.getItem('@saved_items');
      const items = existing ? JSON.parse(existing) : [];
      items.push(editableItem);
      await AsyncStorage.setItem('@saved_items', JSON.stringify(items));
      Alert.alert('Success', 'Item saved successfully!');
    } catch (error) {
      Alert.alert('Error saving', error.message);
    }
  };

  const generateItemText = () => {
    const damageAmount = editableItem?.damage?.amount || 'N/A';
    const damageType = editableItem?.damage?.type || 'N/A';
    return `
      Name: ${editableItem?.name || 'N/A'}
      Description: ${editableItem?.description || 'N/A'}
      Damage: ${damageAmount} ${damageType}
      Properties: ${editableItem?.properties?.length ? editableItem.properties.map((prop) => `- ${prop}`).join('\n') : 'No properties available'}
      Effects: ${editableItem?.effect?.length ? editableItem.effect.map((eff) => `- ${eff}`).join('\n') : 'No effects available'}
      Origin: ${editableItem?.origin || 'No origin available'}
    `;
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isEditing ? (
        <TextInput
          style={styles.inputTitle}
          value={editableItem?.name}
          onChangeText={(text) => updateField('name', text)}
          placeholder="Item Name"
        />
      ) : (
        <Text style={styles.title}>{editableItem?.name}</Text>
      )}

      <Text style={styles.sectionTitle}>Item Details</Text>

      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={editableItem?.description}
            onChangeText={(text) => updateField('description', text)}
            placeholder="Description"
          />
          <TextInput
            style={styles.input}
            value={editableItem?.damage?.amount}
            onChangeText={(text) => updateField('damage', { ...editableItem.damage, amount: text })}
            placeholder="Damage Amount"
          />
          <TextInput
            style={styles.input}
            value={editableItem?.damage?.type}
            onChangeText={(text) => updateField('damage', { ...editableItem.damage, type: text })}
            placeholder="Damage Type"
          />
          <TextInput
            style={styles.input}
            value={editableItem?.properties.join(', ')}
            onChangeText={(text) => updateField('properties', text.split(', '))}
            placeholder="Properties (comma separated)"
          />
          <TextInput
            style={styles.input}
            value={editableItem?.effect.join(', ')}
            onChangeText={updateEffect}
            placeholder="Effects (one per line)"
          />
          <TextInput
            style={styles.input}
            value={editableItem?.origin}
            onChangeText={(text) => updateField('origin', text)}
            placeholder="Origin"
          />
        </>
      ) : (
        <>
          <Text style={styles.text}>Description: {editableItem?.description}</Text>
          <Text style={styles.text}>Damage: {editableItem?.damage?.amount} {editableItem?.damage?.type}</Text>
          <Text style={styles.text}>Properties:</Text>
          {editableItem?.properties?.length ? (
            editableItem.properties.map((prop, index) => <Text key={index} style={styles.text}>- {prop}</Text>)
          ) : (
            <Text style={styles.text}>- No properties available</Text>
          )}
          <Text style={styles.text}>Effects:</Text>
          {editableItem?.effect?.length ? (
            editableItem.effect.map((eff, index) => <Text key={index} style={styles.text}>- {eff}</Text>)
          ) : (
            <Text style={styles.text}>- No effects available</Text>
          )}
          <Text style={styles.text}>Origin: {editableItem?.origin}</Text>
        </>
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
    textAlign: 'center',
    fontFamily: 'Aclonica',
  },
});
