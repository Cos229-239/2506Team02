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
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
<<<<<<< HEAD
import { ThemeContext } from '../ThemeContext';
import { getGlobalStyles, THEMES } from '../styles';
=======
import { GLOBAL_STYLES, COLORS } from '../styles';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0

export default function SignUpScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const globalStyles = getGlobalStyles(theme);
  const colors = THEMES[theme];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
      console.error('Signup error:', error.message);
      alert(error.message);
    }
  };

  return (
<<<<<<< HEAD
    <SafeAreaView style={globalStyles.screen}>
=======
    <SafeAreaView style={GLOBAL_STYLES.screen}>
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <ScrollView
<<<<<<< HEAD
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[styles.title, { color: colors.text }]}>Loot & Lore</Text>
          <Image source={require('../assets/logo.png')} style={styles.logo} />

          {[
            { label: 'First Name', value: firstName, onChange: setFirstName, placeholder: 'Enter your first name' },
            { label: 'Last Name', value: lastName, onChange: setLastName, placeholder: 'Enter your last name' },
            { label: 'Phone Number', value: phone, onChange: setPhone, placeholder: 'Enter phone number', keyboardType: 'phone-pad' },
            { label: 'Username', value: username, onChange: setUsername, placeholder: 'Enter username' },
            { label: 'Email', value: email, onChange: setEmail, placeholder: 'Enter email', keyboardType: 'email-address' },
            { label: 'Password', value: password, onChange: setPassword, placeholder: 'Enter password', secureTextEntry: true },
            { label: 'Confirm Password', value: confirmPassword, onChange: setConfirmPassword, placeholder: 'Confirm password', secureTextEntry: true },
          ].map(({ label, value, onChange, placeholder, keyboardType, secureTextEntry }, idx) => (
            <View key={idx} style={{ width: '100%' }}>
              <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.inputBackground, color: colors.inputText },
                ]}
                placeholder={placeholder}
                placeholderTextColor={colors.placeholder}
                value={value}
                onChangeText={onChange}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
              />
            </View>
          ))}

          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: colors.button }]}
            onPress={handleSignUp}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backToSignIn}>
            <Text style={[styles.backToSignInText, { color: colors.text }]}>
              Already have an account? Sign In
            </Text>
=======
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
            autoCapitalize="none"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
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
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
=======
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
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
});
