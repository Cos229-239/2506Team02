/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { getGlobalStyles, THEMES } from '../styles';
import { ThemeContext } from '../ThemeContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function SignInScreen({ navigation }) {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const { theme } = useContext(ThemeContext);
  const globalStyles = getGlobalStyles(theme);
  const themeColors = THEMES[theme];

  const handleLogin = async () => {
    setLoading(true); // Set loading to true when login begins
    try {
      let loginEmail = emailOrUsername.toLowerCase(); // Convert to lowercase

      // Check if input is email or username
      if (!loginEmail.includes('@')) {
        const q = query(collection(db, 'users'), where('username', '==', loginEmail));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          throw new Error('Username not found.');
        }

        if (snapshot.docs.length > 1) {
          throw new Error('Multiple users found with that username.');
        }

        const userData = snapshot.docs[0].data();
        loginEmail = userData.email.toLowerCase(); // Ensure email is also in lowercase
      }

      // Attempt to sign in with email and password
      await signInWithEmailAndPassword(auth, loginEmail, password);
      console.log('✅ Logged in as', loginEmail);
    } catch (error) {
  console.log('Login error:', error.code); // Optional: for dev visibility

  switch (error.code) {
    case 'auth/invalid-email':
      alert('The email address is badly formatted.');
      break;
    case 'auth/missing-password':
      alert('Please enter your password.');
      break;
    case 'auth/internal-error':
      // This often means password was missing
      alert('Password is required. Please try again.');
      break;
    case 'auth/wrong-password':
      alert('Incorrect password. Please try again.');
      break;
    case 'auth/user-not-found':
      alert('No user found with that email or username.');
      break;
    case 'auth/too-many-requests':
      alert('Too many attempts. Try again later.');
      break;
    default:
      alert('Login failed. Please check your input and try again.');
  }
    } finally {
      setLoading(false); // Reset loading state when login finishes
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <View style={[globalStyles.screen, styles.container]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Loot & Lore</Text>

      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={[styles.label, { color: themeColors.text }]}>Username or Email</Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: themeColors.inputBackground, color: themeColors.inputText },
        ]}
        placeholder="Type your username or e-mail"
        placeholderTextColor={themeColors.placeholder}
        value={emailOrUsername}
        onChangeText={setEmailOrUsername}
        autoCapitalize="none"
      />

      <Text style={[styles.label, { color: themeColors.text }]}>Password</Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: themeColors.inputBackground, color: themeColors.inputText },
        ]}
        placeholder="Type your password"
        placeholderTextColor={themeColors.placeholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.forgotContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={[styles.forgot, { color: themeColors.text }]}>FORGOT PASSWORD</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: themeColors.button }]}
          onPress={handleSignUp}
        >
          <Text style={[styles.buttonText, { color: themeColors.text }]}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: themeColors.button }]}
          onPress={handleLogin}
          disabled={loading} // Disable button during loading state
        >
          {loading ? (
            <ActivityIndicator size="small" color={themeColors.text} /> // Loading spinner
          ) : (
            <Text style={[styles.buttonText, { color: themeColors.text }]}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 4,
    fontFamily: 'Aclonica',
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    borderRadius: 6,
    padding: 12,
    marginVertical: 8,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'Aclonica',
    alignSelf: 'flex-start',
    marginLeft: 4,
  },
  forgotContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 4,
    marginBottom: 10,
  },
  forgot: {
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  primaryButton: {
    padding: 12,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  secondaryButton: {
    padding: 12,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Aclonica',
    fontSize: 16,
  },
});