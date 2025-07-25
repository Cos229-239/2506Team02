/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { getGlobalStyles, THEMES } from '../styles';
import { ThemeContext } from '../ThemeContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

const TERMS_LIST = [
  '1. You agree to use this app in accordance with all applicable laws and regulations.',
  '2. You shall not misuse or interfere with the app’s functionality.',
  '3. Your data may be stored securely and used for app functionality purposes.',
  '4. We do not share your personal data without consent.',
  '5. We are not liable for any loss or damage resulting from app usage.',
  '6. Terms may be updated periodically. Continued use implies acceptance.',
  '7. You are responsible for maintaining the confidentiality of your login credentials.',
  '8. All content is owned by the app creator unless otherwise specified.',
  '9. You must not attempt to reverse-engineer or hack the app.',
  '10. Violation of these terms may result in access restrictions or termination.',
];

export default function SignUpScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const globalStyles = getGlobalStyles(theme);
  const themeColors = THEMES[theme];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false); 
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isUsernameTaken = async (usernameToCheck) => {
    const normalized = usernameToCheck.trim().toLowerCase();
    const q = query(collection(db, 'users'), where('username', '==', normalized));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!username || username.trim() === '') {
      alert("Please enter a valid username");
      return;
    }

    if (!termsAccepted) {
      alert("You must accept the Terms and Agreement to sign up.");
      return;
    }

    try {
      const taken = await isUsernameTaken(username);
      if (taken) {
        alert("Username already taken. Please choose another.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const normalizedUsername = username.trim().toLowerCase();

      await updateProfile(user, { displayName: normalizedUsername });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email,
        username: normalizedUsername,
        firstName,
        lastName,
        phone,
        createdAt: new Date().toISOString(),
      });

      console.log('✅ User signed up & saved:', user.uid);
    } catch (error) {
  console.log('Signup error:', error.code); // Optional for dev

  switch (error.code) {
    case 'auth/email-already-in-use':
      alert('This email is already in use. Try signing in instead.');
      break;
    case 'auth/invalid-email':
      alert('Please enter a valid email address.');
      break;
    case 'auth/weak-password':
      alert('Password is too weak. It should be at least 6 characters.');
      break;
    case 'auth/missing-password':
      alert('Please enter a password.');
      break;
    default:
      alert('Failed to create account. Please check your info and try again.');
  }
}
  };

  return (
    <SafeAreaView style={globalStyles.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[styles.title, { color: themeColors.text }]}>Loot & Lore</Text>
          <Image source={require('../assets/logo.png')} style={styles.logo} />

          <Text style={[styles.label, { color: themeColors.text }]}>First Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: themeColors.inputBackground, color: themeColors.inputText }]}
            placeholder="Enter your first name"
            placeholderTextColor={themeColors.placeholder}
            value={firstName}
            onChangeText={setFirstName}
          />

          <Text style={[styles.label, { color: themeColors.text }]}>Last Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: themeColors.inputBackground, color: themeColors.inputText }]}
            placeholder="Enter your last name"
            placeholderTextColor={themeColors.placeholder}
            value={lastName}
            onChangeText={setLastName}
          />

          <Text style={[styles.label, { color: themeColors.text }]}>Phone Number</Text>
          <TextInput
            style={[styles.input, { backgroundColor: themeColors.inputBackground, color: themeColors.inputText }]}
            placeholder="Enter phone number"
            placeholderTextColor={themeColors.placeholder}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={[styles.label, { color: themeColors.text }]}>Username</Text>
          <TextInput
            style={[styles.input, { backgroundColor: themeColors.inputBackground, color: themeColors.inputText }]}
            placeholder="Enter username"
            placeholderTextColor={themeColors.placeholder}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <Text style={[styles.label, { color: themeColors.text }]}>Email</Text>
          <TextInput
            style={[styles.input, { backgroundColor: themeColors.inputBackground, color: themeColors.inputText }]}
            placeholder="Enter email"
            placeholderTextColor={themeColors.placeholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={[styles.label, { color: themeColors.text }]}>Password</Text>
          <TextInput
            style={[styles.input, { backgroundColor: themeColors.inputBackground, color: themeColors.inputText }]}
            placeholder="Enter password"
            placeholderTextColor={themeColors.placeholder}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={[styles.label, { color: themeColors.text }]}>Confirm Password</Text>
          <TextInput
            style={[styles.input, { backgroundColor: themeColors.inputBackground, color: themeColors.inputText }]}
            placeholder="Confirm password"
            placeholderTextColor={themeColors.placeholder}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* ✅ Custom checkbox using TouchableOpacity */}
          <Text style={[styles.legalText, { color: themeColors.text }]}>
            To continue, you must read and agree to our Terms and Agreement, confirming your understanding and acceptance.
            </Text>
             <TouchableOpacity onPress={() => setIsModalVisible(true)}>
             <Text style={[styles.legalText, { color: themeColors.text }]}>
            Click here for Terms and Agreement.
          </Text>
          </TouchableOpacity>
            
          <TouchableOpacity
            onPress={() => setTermsAccepted(!termsAccepted)}
            style={styles.checkboxContainer}
          >
            <View style={[styles.checkboxBase, termsAccepted && styles.checkboxChecked]}>
              {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={[styles.termsText, { color: themeColors.text }]}>
              I accept the Terms and Agreement.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: themeColors.button }]}
            onPress={handleSignUp}
          >
            <Text style={[styles.buttonText, { color: themeColors.text }]}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backToSignIn}>
            <Text style={[styles.backToSignInText, { color: themeColors.text }]}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </ScrollView>


        {/* Terms View Button */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={[styles.modalView, { backgroundColor: themeColors.background }]}>
            <ScrollView>
              <Text style={[styles.modalTitle, { color: themeColors.text }]}>Terms and Agreement</Text>
              <Text style={[styles.modalText, { color: themeColors.text }]}>
                {/* This is where the legal verbage goes */}
                By using this app, you agree to the following Terms and Agreement...
              </Text>
              {TERMS_LIST.map((term, index) => (
               <Text key={index} style={[styles.modalText, { color: themeColors.text }]}>
                {term}
                </Text>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: themeColors.button }]}
              onPress={() => setIsModalVisible(false)}
              >
                <Text style={[styles.closeButtonText, { color: themeColors.text }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    marginBottom: 4,
    fontFamily: 'Aclonica',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'Aclonica',
    alignSelf: 'flex-start',
    marginLeft: 4,
  },
  primaryButton: {
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Aclonica',
    fontSize: 16,
  },
  backToSignIn: {
    marginTop: 20,
  },
  backToSignInText: {
    fontFamily: 'Aclonica',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 14,
  },
  legalText: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
  },
  modalText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
