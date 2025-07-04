/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { getGlobalStyles, THEMES } from '../styles';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { theme } = useContext(ThemeContext);
  const globalStyles = getGlobalStyles(theme);
  const colors = THEMES[theme];

  const handleLogin = () => {
    navigation.replace('Main');
    console.log('Main Menu tapped');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpScreen');
    console.log('Sign Up tapped');
  };

  return (
    <View style={[globalStyles.screen, styles.container]}>
      <Text style={[styles.title, { color: colors.text }]}>Loot & Lore</Text>

      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <Text style={[styles.label, { color: colors.text }]}>Username or email</Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.inputBackground, color: colors.inputText },
        ]}
        placeholder="Type your username or e-mail"
        placeholderTextColor={colors.placeholder}
        value={email}
        onChangeText={setEmail}
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
          <Text style={[styles.forgot, { color: colors.text }]}>FORGOT PASSWORD</Text>
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
