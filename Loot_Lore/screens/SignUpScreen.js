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
} from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { getGlobalStyles, THEMES } from '../styles';

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
    <SafeAreaView style={globalStyles.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <ScrollView
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
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
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
