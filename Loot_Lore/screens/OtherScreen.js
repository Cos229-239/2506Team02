/* eslint-disable react/prop-types */ 
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { auth } from '../firebaseConfig'; 
import { signOut } from 'firebase/auth'; 

import { ThemeContext } from '../ThemeContext';
import { getGlobalStyles, THEMES } from '../styles';

export default function OtherScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const themeColors = THEMES[theme] || THEMES.default;
  const globalStyles = getGlobalStyles(theme);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('👋 User signed out');
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  return (
    <SafeAreaView style={globalStyles.screen}>
       <ScrollView
                contentContainerStyle={styles.scroll}
                keyboardShouldPersistTaps="handled"
              >

    <View style={[globalStyles.screen, styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Loot & Lore</Text>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity

          style={[styles.menuButton, { backgroundColor: themeColors.button }]}
         onPress={() => navigation.navigate('Saved Databases')}

        >
          <Text style={[styles.buttonText, { color: themeColors.text }]}>Saved Databases</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: themeColors.button }]}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={[styles.buttonText, { color: themeColors.text }]}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: themeColors.button }]}
          onPress={() => navigation.navigate('Terms & Agreement')}
        >
          <Text style={[styles.buttonText, { color: themeColors.text }]}>Terms & Agreement</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.centeredButton, { backgroundColor: themeColors.button }]}
          onPress={handleSignOut}
        >
          <Text style={[styles.buttonText, { color: themeColors.text }]}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
     </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
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
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  centeredButton: {
    paddingVertical: 16,
    paddingHorizontal: 65,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Aclonica',
  },
});
