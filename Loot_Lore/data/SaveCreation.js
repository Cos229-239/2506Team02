import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db } from '../firebaseConfig';
import { Alert } from 'react-native';

export const handleSaveCreation = async (creation, type = 'character') => {
  try {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Not logged in', 'Please sign in to save this creation.');
      return;
    }

    let imageUrl = creation.imageUrl;

    // Upload image if it's a temporary DALL·E-style blob URL
    if (imageUrl && imageUrl.includes('blob.core.windows.net')) {
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch blob image: ${response.status}`);
        }

        const blob = await response.blob();

        const storage = getStorage();
        const filename = `${type}_${Date.now()}.png`;
        const storageRef = ref(storage, `users/${user.uid}/${filename}`);

        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
        console.log("Image uploaded to Firebase Storage:", imageUrl);
      } catch (uploadError) {
        console.warn("Image upload failed, falling back to original URL:", uploadError);
        // Optionally notify the user:
        // Alert.alert('Image Upload Failed', 'Could not store image permanently.');
      }
    }

    // Prepare creation data
    const creationData = {
      ...creation,
      imageUrl, // final URL (original or Firebase-hosted)
      type,
      timestamp: new Date(),
    };

    // Save to Firestore under user's creations subcollection
    const userCreationsRef = collection(db, 'users', user.uid, 'creations');
    await addDoc(userCreationsRef, creationData);

    Alert.alert('Success', `${type.charAt(0).toUpperCase() + type.slice(1)} saved to your library!`);
  } catch (error) {
    console.error(`Error saving ${type}:`, error);
    Alert.alert('Save Failed', `Unable to save your ${type}. Please try again.`);
  }
};
