<<<<<<< HEAD
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
=======
/* eslint-disable react/prop-types */ 
import React, { useState } from 'react';
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
<<<<<<< HEAD
import { ThemeContext } from '../ThemeContext';
import { getGlobalStyles, THEMES } from '../styles';
=======
import { GLOBAL_STYLES, COLORS } from '../styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0

export default function SignInScreen({ navigation }) {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

<<<<<<< HEAD
  const { theme } = useContext(ThemeContext);
  const globalStyles = getGlobalStyles(theme);
  const colors = THEMES[theme];

  const handleLogin = () => {
    navigation.replace('Main');
    console.log('Main Menu tapped');
=======
  const handleLogin = async () => {
    try {
      let loginEmail = emailOrUsername;

      if (!emailOrUsername.includes('@')) {
        // Assume username, find email
        const q = query(collection(db, 'users'), where('username', '==', emailOrUsername));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          throw new Error('Username not found.');
        }

        if (snapshot.docs.length > 1) {
          throw new Error('Multiple users found with that username.');
        }

        const userData = snapshot.docs[0].data();
        loginEmail = userData.email;
      }

      await signInWithEmailAndPassword(auth, loginEmail, password);
      console.log('✅ Logged in as', loginEmail);
    } catch (error) {
      console.error('Login error:', error.message);
      alert(error.message);
    }
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpScreen');
<<<<<<< HEAD
    console.log('Sign Up tapped');
=======
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
  };

  return (
    <View style={[globalStyles.screen, styles.container]}>
      <Text style={[styles.title, { color: colors.text }]}>Loot & Lore</Text>

<<<<<<< HEAD
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <Text style={[styles.label, { color: colors.text }]}>Username or email</Text>
=======
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.label}>Username or Email</Text>
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.inputBackground, color: colors.inputText },
        ]}
        placeholder="Type your username or e-mail"
<<<<<<< HEAD
        placeholderTextColor={colors.placeholder}
        value={email}
        onChangeText={setEmail}
=======
        placeholderTextColor="#ccc"
        value={emailOrUsername}
        onChangeText={setEmailOrUsername}
        autoCapitalize="none"
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
      />

      <Text style={[styles.label, { color: colors.text }]}>Password</Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.inputBackground, color: colors.inputText },
        ]}
        placeholder="Type your password"
        placeholderTextColor={colors.placeholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.forgotContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
<<<<<<< HEAD
          <Text style={[styles.forgot, { color: colors.text }]}>FORGOT PASSWORD</Text>
=======
          <Text style={styles.forgot}>FORGOT PASSWORD</Text>
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: colors.button }]}
          onPress={handleSignUp}
        >
          <Text style={[styles.buttonText, { color: colors.text }]}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.button }]}
          onPress={handleLogin}
        >
          <Text style={[styles.buttonText, { color: colors.text }]}>Login</Text>
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
<<<<<<< HEAD
=======
    color: '#000',
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
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
<<<<<<< HEAD
=======
    backgroundColor: COLORS.button,
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
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
