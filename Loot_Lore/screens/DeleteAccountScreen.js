import React, { useContext, useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, Image, Modal, StyleSheet, SafeAreaView } from 'react-native';
import { ThemeContext } from '../ThemeContext';  // Import ThemeContext
import { getGlobalStyles, THEMES } from '../styles'; // Import global styles function
import { auth } from '../firebaseConfig'; 
import { EmailAuthProvider, reauthenticateWithCredential, deleteUser } from 'firebase/auth';

export default function DeleteAccountScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);  // Get the current theme
  const themeColors = THEMES[theme] || THEMES.default;  // Get the theme colors (default if not set)
  const globalStyles = getGlobalStyles(theme);  // Get global styles for the current theme

   const [password, setPassword] = useState('');
   const [modalVisible, setModalVisible] = useState(false);
  
  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'No user is currently signed in.');
      return;
    }
    if (!password) {
      alert('Please enter your password to confirm deletion.');
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, password);

    try {
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      console.log('Account deleted');
       setModalVisible(false); // close modal
       Alert.alert(
      'Success',
      'Your account has been permanently deleted.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('SignIn'),
        },
      ],
      { cancelable: false }
    );
    } catch (error) {
      console.error('Account deletion error:', error);
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Incorrect Password', 'Please check your password and try again.');
      } else {
        Alert.alert('Error', 'Failed to delete account. Please try again later.');
      }
    }
  };

  const handleGoBack = () => {
    // Go back to the previous screen
    navigation.goBack('Settings');
  };

  return (
    <SafeAreaView style={globalStyles.screen}>
    <View style={[globalStyles.screen, styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Loot & Lore</Text>
      <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
            />

      <Text style={[styles.text, { color: themeColors.text }]}>
        Are you sure you want to delete your account?
      </Text>

      {/* Yes Button in a Square */}
      <TouchableOpacity 
        style={[styles.square, { backgroundColor: '#FF0000'  }]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.buttonTextContainer}>
          <Text style={[styles.buttonText, { color: '#000000' }]}>YES</Text>
          <Text style={[styles.buttonText, { color: '#000000' }]}>DELETE ACCOUNT</Text>
        </View>
      </TouchableOpacity>

      
      {/* No Button in a Square */}
      <TouchableOpacity 
        style={[styles.square, { backgroundColor: themeColors.button }]}
        onPress={handleGoBack}
      >
        <View style={styles.buttonTextContainer}>
          <Text style={[styles.buttonText, { color: themeColors.text }]}>NO!</Text>
          <Text style={[styles.buttonText, { color: themeColors.text }]}>GO BACK!</Text>
        </View>
      </TouchableOpacity>

      <Modal
  transparent={true}
  visible={modalVisible}
  animationType="slide"
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={[styles.modalContainer, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.modalTitle, { color: themeColors.text }]}>Confirm Deletion</Text>
      <Text style={[styles.modalText, { color: themeColors.text }]}>Enter your password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        style={[styles.input, { color: themeColors.text, borderColor: themeColors.border || '#ccc' }]}
      />
      <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#FF0000' }]} onPress={handleDeleteAccount}>
        <Text style={styles.modalButtonText}>Confirm Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
        <Text style={[styles.modalCancelText, { color: themeColors.text }]}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',     
    padding: 0,
  },
  text: {
    fontSize: 36,
    marginBottom: 20,         
    textAlign: 'center',
  },
  title: {
    fontSize: 42,
    fontFamily: 'Aclonica',
    marginTop: 0,
    marginBottom: 0,
  },
    logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 0,
  },
  square: {
    width: 150,               
    height: 150,              
    marginBottom: 30,        
    justifyContent: 'center', 
    alignItems: 'center',     
    borderRadius: 30,         
  },
  buttonTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',  
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',      
  },
  input: {
    width: 250,
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 18,
  },
  modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContainer: {
  width: 300,
  padding: 20,
  borderRadius: 12,
  alignItems: 'center',
},
modalTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 10,
},
modalText: {
  fontSize: 16,
  marginBottom: 10,
},
modalButton: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
  marginTop: 10,
},
modalButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
modalCancel: {
  marginTop: 10,
},
modalCancelText: {
  fontSize: 16,
  textDecorationLine: 'underline',
},
});
