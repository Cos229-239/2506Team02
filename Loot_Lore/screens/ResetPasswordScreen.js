/* eslint-disable react/prop-types */
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

export default function ResetPasswordScreen({ navigation }) {
  const [input, setInput] = useState('');

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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loot & Lore</Text>

      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.label}>Enter your email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        placeholderTextColor="#ccc"
        value={input}
        onChangeText={setInput}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleSendLink}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.screen,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: COLORS.text,
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
    color: COLORS.text,
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'Aclonica',
    alignSelf: 'flex-start',
    marginLeft: 4,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: COLORS.button,
    padding: 12,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.text,
    fontFamily: 'Aclonica',
    fontSize: 16,
  },
});