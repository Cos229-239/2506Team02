/* eslint-disable react/prop-types */ 
import { auth } from '../firebaseConfig'; 
import { getAuth, signOut } from 'firebase/auth'; 
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { GLOBAL_STYLES, COLORS } from '../styles';

export default function HomeScreen({ navigation }) {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('👋 User signed out');
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
     <Text style={styles.title}>Loot & Lore</Text>
     
           <Image
             source={require('../assets/logo.png')}
             style={styles.logo}
           />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Saved Database')}
        >
          <Text style={styles.buttonText}>Saved Database</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('TermsAndAgreement')}
        >
          <Text style={styles.buttonText}>Terms & Agreement</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.centeredButton]}
          onPress={handleSignOut}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.screen,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    color: COLORS.text,
    fontSize: 32,
    fontFamily: 'Aclonica',
    marginTop: 20,
    marginBottom: 4,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: COLORS.button,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  centeredButton: {
    backgroundColor: COLORS.button,
    paddingVertical: 16,
    paddingHorizontal: 65,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 18,
    fontFamily: 'Aclonica',
  },
});