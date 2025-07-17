/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { getGlobalStyles, THEMES } from '../styles';
import { ThemeContext } from '../ThemeContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import LoginBackButton from '../LoginBackButton';

export default function ResetPasswordScreen({ navigation }) {
  const [input, setInput] = useState('');
  const { theme } = useContext(ThemeContext);
  const themeColors = THEMES[theme];
  const globalStyles = getGlobalStyles(theme);

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
  <View style={{ flex: 1, justifyContent: 'space-between' }}>
    <View style={[globalStyles.screen, styles.container]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Loot & Lore</Text>

      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <Text style={[styles.label, { color: themeColors.text }]}>Enter your email</Text>
      <TextInput
        style={[styles.input, { backgroundColor: themeColors.inputBackground, color: themeColors.inputText }]}
        placeholder="Enter your email address"
        placeholderTextColor={themeColors.placeholder}
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

    {/* Footer Back Button */}
    <View style={[styles.footer, {
            backgroundColor: themeColors.background,
            borderTopColor: themeColors.text,
            }]}>
      <LoginBackButton />
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
  label: {
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
  footer: {
    borderTopWidth: 1,
    padding: 10,
  },

});
