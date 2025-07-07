/* eslint-disable react/prop-types */
<<<<<<< HEAD
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { THEMES, getGlobalStyles } from '../styles';
=======
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { GLOBAL_STYLES, COLORS } from '../styles';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0

export default function ResetPasswordScreen({ navigation }) {
  const [input, setInput] = useState('');

<<<<<<< HEAD
  const { theme } = useContext(ThemeContext);
  const globalStyles = getGlobalStyles(theme);
  const themeColors = THEMES[theme];

  const handleSendLink = () => {
    console.log('Reset link sent to:', input);
    navigation.goBack(); 
=======
  const handleSendLink = async () => {
    const trimmedInput = input.trim().toLowerCase();

    if (!trimmedInput || !trimmedInput.includes('@')) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, trimmedInput);
      alert("✅ Password reset email sent! Please check your inbox.");
      navigation.goBack();
    } catch (error) {
      console.error('Password reset error:', error.message);
      alert("❌ Error: " + error.message);
    }
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
  };

  return (
    <View style={[globalStyles.screen, styles.container]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Loot & Lore</Text>

      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

<<<<<<< HEAD
      <Text style={[styles.label, { color: themeColors.text }]}>
        Enter your email or phone number
      </Text>

      <TextInput
        style={[styles.input, { backgroundColor: themeColors.inputBackground, color: themeColors.inputText }]}
        placeholder="Email or phone"
        placeholderTextColor={themeColors.placeholder}
=======
      <Text style={styles.label}>Enter your email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        placeholderTextColor="#ccc"
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
        value={input}
        onChangeText={setInput}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: themeColors.button }]}
        onPress={handleSendLink}
      >
        <Text style={[styles.buttonText, { color: themeColors.text }]}>
          Send Reset Link
        </Text>
      </TouchableOpacity>
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
  label: {
<<<<<<< HEAD
=======
    color: COLORS.text,
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'Aclonica',
    alignSelf: 'flex-start',
    marginLeft: 4,
  },
  input: {
    width: '100%',
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    padding: 12,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Aclonica',
  },
});
