// data/saveCreation.js
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { Alert } from 'react-native';

export const handleSaveCreation = async (creation, type = 'character') => {
  try {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Not logged in', 'Please sign in to save this creation.');
      return;
    }

    const creationData = {
      ...creation,
      type,
      timestamp: new Date(),
    };

    const userCreationsRef = collection(db, 'users', user.uid, 'creations');
    await addDoc(userCreationsRef, creationData);

    Alert.alert('Success', `${type.charAt(0).toUpperCase() + type.slice(1)} saved to your library!`);
  } catch (error) {
    console.error(`Error saving ${type}:`, error);
    Alert.alert('Save Failed', `Unable to save your ${type}.`);
  }
};