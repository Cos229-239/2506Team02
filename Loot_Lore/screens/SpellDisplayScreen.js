/* eslint-disable react/prop-types */
import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Share,
  Alert,
  Image,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { ThemeContext } from '../ThemeContext';
import { THEMES } from '../styles';
import ImageGenerator from '../ImageGenerator';
import { db, auth, storage } from '../firebaseConfig'; // Make sure storage is exported here
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'; // Added deleteDoc
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function SpellDetailsScreen({ route, navigation }) {
  const { spell: initialSpell } = route.params || {};
  const { theme, boldText } = useContext(ThemeContext);
  const themeColors = THEMES[theme] || THEMES.default;
  const textWeight = boldText ? 'bold' : 'normal';

  const [spell, setSpell] = useState(initialSpell);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialSpell?.imageUrl || null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setSpell(initialSpell);
    setImageUrl(initialSpell?.imageUrl || null);
  }, [initialSpell]);

  if (!spell || typeof spell !== 'object') {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.title, { color: themeColors.text, fontWeight: textWeight }]}>
          No spell data found.
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.button }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonText, { color: themeColors.text, fontWeight: textWeight }]}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const updateField = (field, value) => {
    setSpell((prev) => ({ ...prev, [field]: value }));
  };

  const updateComponent = (field, value) => {
    setSpell((prev) => ({
      ...prev,
      components: { ...prev.components, [field]: value },
    }));
  };

  const updateEffects = (text) => {
    setSpell((prev) => ({
      ...prev,
      effects: text.split('\n'),
    }));
  };

  const generateSpellText = () => {
    const effects = (spell.effects || []).join('\n- ');
    return (
      `Name: ${spell.name}\n\n` +
      `School: ${spell.school}\nLevel: ${spell.spellLevel}\n` +
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

  const handleCreateNewSpell = () => {
    navigation.navigate('Spells'); // Or your spells list screen
  };

  // Upload image to Firebase Storage and update Firestore document
  const handleSaveCreation = async () => {
    setUploading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not logged in');
      if (!spell.id) throw new Error('Spell ID missing');

      let uploadedImageUrl = imageUrl;

      // Upload if imageUrl is local URI (not already URL)
      if (imageUrl && !imageUrl.startsWith('https://')) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const imageRef = ref(storage, `users/${user.uid}/spells/${spell.id}.png`);
        await uploadBytes(imageRef, blob);
        uploadedImageUrl = await getDownloadURL(imageRef);
        setImageUrl(uploadedImageUrl);
      }

      const docRef = doc(db, 'users', user.uid, 'creations', spell.id);
      await updateDoc(docRef, { ...spell, imageUrl: uploadedImageUrl });

      Alert.alert('Success', 'Spell saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Save error', error.message || 'Unknown error occurred.');
    }
    setUploading(false);
  };

  // Delete spell handler
  const handleDeleteSpell = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this spell? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (!user || !spell.id) throw new Error('Missing user or spell ID');

              const docRef = doc(db, 'users', user.uid, 'creations', spell.id);
              await deleteDoc(docRef);

              Alert.alert('Deleted', 'Spell deleted successfully!');
              navigation.navigate('Spells');
            } catch (error) {
              console.error('Delete error:', error);
              Alert.alert('Delete error', error.message || 'Unknown error occurred.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const applyTextStyle = {
    color: themeColors.text,
    fontWeight: textWeight,
    fontFamily: 'Aclonica',
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: themeColors.background }]}>
    
      {/* Image generator */}
      <ImageGenerator
        prompt={spell.name + ' ' + spell.description}
        onImageGenerated={(url) => setImageUrl(url)}
      />

      {isEditing ? (
        <TextInput
          style={[styles.inputTitle, applyTextStyle, { borderColor: themeColors.text }]}
          value={spell.name}
          onChangeText={(text) => updateField('name', text)}
          placeholder="Spell Name"
        />
      ) : (
        <Text style={[styles.title, applyTextStyle]}>{spell.name}</Text>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Spell Details</Text>
      {isEditing ? (
        <>
          {['school', 'spellLevel', 'castingTime', 'duration', 'range'].map((field) => (
            <TextInput
              key={field}
              style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]}
              value={spell[field]}
              onChangeText={(text) => updateField(field, text)}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
          ))}
        </>
      ) : (
        <>
          <Text style={[styles.text, applyTextStyle]}>School: {spell.school}</Text>
          <Text style={[styles.text, applyTextStyle]}>Level: {spell.spellLevel}</Text>
          <Text style={[styles.text, applyTextStyle]}>Casting Time: {spell.castingTime}</Text>
          <Text style={[styles.text, applyTextStyle]}>Duration: {spell.duration}</Text>
          <Text style={[styles.text, applyTextStyle]}>Range: {spell.range}</Text>
        </>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Components</Text>
      {isEditing ? (
        <>
          <TextInput
            style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]}
            value={spell.components?.verbal ? 'Yes' : 'No'}
            onChangeText={(text) => updateComponent('verbal', text.toLowerCase() === 'yes')}
            placeholder="Verbal (Yes/No)"
          />
          <TextInput
            style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]}
            value={spell.components?.somatic ? 'Yes' : 'No'}
            onChangeText={(text) => updateComponent('somatic', text.toLowerCase() === 'yes')}
            placeholder="Somatic (Yes/No)"
          />
          <TextInput
            style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]}
            value={spell.components?.material || ''}
            onChangeText={(text) => updateComponent('material', text)}
            placeholder="Material"
          />
        </>
      ) : (
        <>
          <Text style={[styles.text, applyTextStyle]}>Verbal: {spell.components?.verbal ? 'Yes' : 'No'}</Text>
          <Text style={[styles.text, applyTextStyle]}>Somatic: {spell.components?.somatic ? 'Yes' : 'No'}</Text>
          <Text style={[styles.text, applyTextStyle]}>Material: {spell.components?.material || 'None'}</Text>
        </>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Description</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, applyTextStyle, { height: 100, borderColor: themeColors.text }]}
          multiline
          value={spell.description}
          onChangeText={(text) => updateField('description', text)}
          placeholder="Description"
        />
      ) : (
        <Text style={[styles.text, applyTextStyle]}>{spell.description}</Text>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Effects</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, applyTextStyle, { height: 100, borderColor: themeColors.text }]}
          multiline
          value={(spell.effects || []).join('\n')}
          onChangeText={updateEffects}
          placeholder="Effects (one per line)"
        />
      ) : (
        (spell.effects || []).map((effect, idx) => (
          <Text key={idx} style={[styles.text, applyTextStyle]}>- {effect}</Text>
        ))
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.buttonHalf, { backgroundColor: themeColors.button }]}
          onPress={handleSaveCreation}
          disabled={uploading}
        >
          <Text style={[styles.buttonText, applyTextStyle]}>
            {uploading ? 'Saving...' : 'Save'}
          </Text>
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
          onPress={handleCreateNewSpell}
        >
          <Text style={[styles.buttonText, applyTextStyle]}>Create New Spell</Text>
        </TouchableOpacity>
      </View>

            {/* Delete Button */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.buttonHalf, { backgroundColor: 'red' }]}
          onPress={handleDeleteSpell}
        >
          <Text style={[styles.buttonText, { color: 'white', fontWeight: 'bold' }]}>Delete Spell</Text>
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
    fontFamily: 'Aclonica',
  },
  inputTitle: {
    fontSize: 26,
    marginBottom: 15,
    borderBottomWidth: 1,
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
    marginBottom: 8,
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
  spellImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 15,
    borderRadius: 10,
  },
});