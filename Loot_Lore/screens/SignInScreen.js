/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { GLOBAL_STYLES, COLORS } from '../styles';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.replace('Main');
    console.log('Main Menu tapped');
  };

  const handleSignUp = () => {
     navigation.navigate('SignUpScreen');
    console.log('Sign Up tapped');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loot & Lore</Text>

      <Image
        source={require('../assets/logo.png')} 
        style={styles.logo}
      />

      <Text style={styles.label}>Username or email</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your username or e-mail"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.forgotContainer}>
  <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
    <Text style={styles.forgot}>FORGOT PASSWORD</Text>
  </TouchableOpacity>
    </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
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
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12,
    marginVertical: 8,
    fontSize: 16,
    color: '#000',
  }, 
  label: {
    color: COLORS.text,
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
    color: COLORS.text,
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
    backgroundColor: COLORS.button,
    padding: 12,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: COLORS.button, 
    padding: 12,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.text,
    fontFamily: 'Aclonica',
    fontSize: 16,
  },
});