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
import { db, auth, storage } from '../firebaseConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function MonsterDetailsScreen({ route, navigation }) {
  const { monster: initialMonster } = route.params || {};
  const { theme, boldText } = useContext(ThemeContext);
  const themeColors = THEMES[theme] || THEMES.default;
  const textWeight = boldText ? 'bold' : 'normal';

  const [monster, setMonster] = useState(initialMonster);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialMonster?.imageUrl || null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setMonster(initialMonster);
    setImageUrl(initialMonster?.imageUrl || null);
  }, [initialMonster]);

  if (!monster || typeof monster !== 'object') {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.title, { color: themeColors.text, fontWeight: textWeight }]}>
          No monster data found.
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
    setMonster((prev) => ({ ...prev, [field]: value }));
  };

  const updateStat = (statKey, value) => {
    setMonster((prev) => ({
      ...prev,
      stats: { ...prev.stats, [statKey]: value },
    }));
  };

  const updateListField = (field, value) => {
    setMonster((prev) => ({ ...prev, [field]: value.split('\n') }));
  };

  const generateMonsterText = () => {
    const abilities = (monster.abilities || []).join('\n- ');
    const attacks = (monster.attacks || []).join('\n- ');
    const spells = (monster.spells || []).join('\n- ');

    return (
      `Name: ${monster.name}\n\n` +
      `Prompt Used:\n` +
      `- Type: ${monster.promptType || 'N/A'}\n` +
      `- Race: ${monster.promptRace || 'N/A'}\n` +
      `- Challenge Rating: ${monster.promptChallengeRating || 'N/A'}\n` +
      `- Size: ${monster.promptSize || 'N/A'}\n` +
      `- Alignment: ${monster.promptAlignment || 'N/A'}\n\n` +
      `Stats:\nSTR: ${monster.stats.STR}\nDEX: ${monster.stats.DEX}\nCON: ${monster.stats.CON}\n` +
      `INT: ${monster.stats.INT}\nWIS: ${monster.stats.WIS}\nCHA: ${monster.stats.CHA}\n\n` +
      `Abilities:\n- ${abilities}\n\n` +
      `Attacks:\n- ${attacks}\n\n` +
      `Spells:\n- ${spells}\n\n` +
      `Lore:\n${monster.lore}\n\n` +
      `Short Description:\n${monster.shortDescription}`
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

  const handleCreateNewMonster = () => {
    navigation.navigate('Monsters');
  };

  const handleSaveCreation = async () => {
    setUploading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not logged in');
      if (!monster.id) throw new Error('Monster ID missing');

      let uploadedImageUrl = imageUrl;

      if (imageUrl && !imageUrl.startsWith('https://')) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const imageRef = ref(storage, `users/${user.uid}/monsters/${monster.id}.png`);
        await uploadBytes(imageRef, blob);
        uploadedImageUrl = await getDownloadURL(imageRef);
        setImageUrl(uploadedImageUrl);
      }

      const docRef = doc(db, 'users', user.uid, 'creations', monster.id);
      await updateDoc(docRef, { ...monster, imageUrl: uploadedImageUrl });

      Alert.alert('Success', 'Monster saved successfully!');
    } catch (error) {
      console.log('Save error:', error);
      Alert.alert('Save error', error.message || 'Unknown error occurred.');
    }
    setUploading(false);
  };

  const handleDeleteMonster = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this monster? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (!user || !monster.id) throw new Error('Missing user or monster ID');

              const docRef = doc(db, 'users', user.uid, 'creations', monster.id);
              await deleteDoc(docRef);

              Alert.alert('Deleted', 'Monster deleted successfully!');
              navigation.navigate('Private Monsters');
            } catch (error) {
              console.log('Delete error:', error);
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

      <ImageGenerator
        prompt={monster.shortDescription}
        onImageGenerated={(url) => setImageUrl(url)}
      />

      {isEditing ? (
        <TextInput
          style={[styles.inputTitle, applyTextStyle, { borderColor: themeColors.text }]}
          value={monster.name}
          onChangeText={(text) => updateField('name', text)}
          placeholder="Name"
          placeholderTextColor={themeColors.text}
        />
      ) : (
        <Text style={[styles.title, applyTextStyle]}>{monster.name}</Text>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Monster Details</Text>
      {isEditing ? (
        <>
          {['promptType', 'promptRace', 'promptChallengeRating', 'promptSize', 'promptAlignment'].map((field) => (
            <TextInput
              key={field}
              style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]}
              value={monster[field]}
              onChangeText={(text) => updateField(field, text)}
              placeholder={field}
              placeholderTextColor={themeColors.text}
            />
          ))}
        </>
      ) : (
        <>
          <Text style={[styles.sectionTitle, applyTextStyle]}>Monster Details</Text>
                <Text style={[styles.text, applyTextStyle]}>Type: {monster.type}</Text>
                <Text style={[styles.text, applyTextStyle]}>Race: {monster.race}</Text>
                <Text style={[styles.text, applyTextStyle]}>Challenge Rating: {monster.challengeRating}</Text>
                <Text style={[styles.text, applyTextStyle]}>Size: {monster.size}</Text>
                <Text style={[styles.text, applyTextStyle]}>Alignment: {monster.alignment}</Text>
        </>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Stats</Text>
      {Object.entries(monster.stats || {}).map(([key, value]) =>
        isEditing ? (
          <TextInput
            key={key}
            style={[styles.input, applyTextStyle, { borderColor: themeColors.text }]}
            value={String(value)}
            onChangeText={(text) => updateStat(key, text)}
            placeholder={key}
            keyboardType="numeric"
            placeholderTextColor={themeColors.text}
          />
        ) : (
          <Text key={key} style={[styles.text, applyTextStyle]}>{`${key}: ${value}`}</Text>
        )
      )}

      {['abilities', 'attacks', 'spells'].map((field) => (
        <View key={field}>
          <Text style={[styles.sectionTitle, applyTextStyle]}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, applyTextStyle, { height: 80, borderColor: themeColors.text }]}
              multiline
              value={(monster[field] || []).join('\n')}
              onChangeText={(text) => updateListField(field, text)}
              placeholder={`One ${field.slice(0, -1)} per line`}
              placeholderTextColor={themeColors.text}
            />
          ) : (
            (monster[field] || []).map((item, i) => (
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
          value={monster.shortDescription}
          onChangeText={(text) => updateField('shortDescription', text)}
          placeholder='Description'
          placeholderTextColor={themeColors.text}
        />
      ) : (
        <Text style={[styles.text, applyTextStyle]}>{monster.shortDescription}</Text>
      )}

      <Text style={[styles.sectionTitle, applyTextStyle]}>Lore</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, applyTextStyle, { height: 100, borderColor: themeColors.text }]}
          multiline
          value={monster.lore}
          onChangeText={(text) => updateField('lore', text)}
          placeholder='Lore'
          placeholderTextColor={themeColors.text}

        />
      ) : (
        <Text style={[styles.text, applyTextStyle]}>{monster.lore}</Text>
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

      <View style={styles.buttonRow}>
  <TouchableOpacity
    style={[styles.buttonHalf, { backgroundColor: themeColors.button }]}
    onPress={handleCreateNewMonster}
  >
    <Text style={[styles.buttonText, applyTextStyle]}>New Monster</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.buttonHalf, { backgroundColor: themeColors.button }]}
    onPress={() => navigation.navigate('Private Monsters')}
  >
    <Text style={[styles.buttonText, applyTextStyle]}>Back</Text>
  </TouchableOpacity>
</View>


      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.buttonHalf, { backgroundColor: 'red' }]}
          onPress={handleDeleteMonster}
        >
          <Text style={[styles.buttonText, { color: 'white', fontWeight: 'bold' }]}>Delete Monster</Text>
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
  monsterImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 15,
    borderRadius: 10,
  },
});