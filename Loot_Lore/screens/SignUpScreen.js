/* eslint-disable react/prop-types */
import React, { useState } from 'react';
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
} from 'react-native';
import { GLOBAL_STYLES, COLORS } from '../styles';

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    console.log({
      firstName,
      lastName,
      phone,
      username,
      email,
      password,
      confirmPassword,
    });
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={GLOBAL_STYLES.screen}>
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
      <Text style={styles.title}>Loot & Lore</Text>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your first name"
        placeholderTextColor="#ccc"
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your last name"
        placeholderTextColor="#ccc"
        value={lastName}
        onChangeText={setLastName}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        placeholderTextColor="#ccc"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        placeholderTextColor="#ccc"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backToSignIn}>
        <Text style={styles.backToSignInText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.screen,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    color: COLORS.text,
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
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
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
  primaryButton: {
    backgroundColor: COLORS.button,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.text,
    fontFamily: 'Aclonica',
    fontSize: 16,
  },
  backToSignIn: {
    marginTop: 20,
  },
  backToSignInText: {
    color: COLORS.text,
    fontFamily: 'Aclonica',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});