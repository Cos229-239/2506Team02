import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../ThemeContext';  // Import ThemeContext
import { getGlobalStyles, THEMES } from '../styles'; // Import global styles function
import { auth } from '../firebaseConfig'; 
import { signOut } from 'firebase/auth'; 

export default function DeleteAccountScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);  // Get the current theme
  const themeColors = THEMES[theme] || THEMES.default;  // Get the theme colors (default if not set)
  const globalStyles = getGlobalStyles(theme);  // Get global styles for the current theme

  const handleDeleteAccount = () => {
    // Add your account deletion logic here (e.g., Firebase, API call, etc.)
    console.log('Account deleted');
    navigation.navigate('SignIn'); // Or navigate to another screen after deletion
  };

  const handleGoBack = () => {
    // Go back to the previous screen
    navigation.goBack('Settings');
  };

  return (
    <View style={[globalStyles.screen, styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.text, { color: themeColors.text }]}>
        Are you sure you want to delete your account?
      </Text>

      {/* Yes Button in a Square */}
      <TouchableOpacity 
        style={[styles.square, { backgroundColor: '#FF0000'  }]}
        onPress={handleDeleteAccount}
      >
        <View style={styles.buttonTextContainer}>
          <Text style={[styles.buttonText, { color: '#000000' }]}>YES</Text>
          <Text style={[styles.buttonText, { color: '#000000' }]}>DELETE ACCOUNT</Text>
        </View>
      </TouchableOpacity>

      
      {/* No Button in a Square */}
      <TouchableOpacity 
        style={[styles.square, { backgroundColor: themeColors.button }]}
        onPress={handleGoBack}
      >
        <View style={styles.buttonTextContainer}>
          <Text style={[styles.buttonText, { color: themeColors.text }]}>NO!</Text>
          <Text style={[styles.buttonText, { color: themeColors.text }]}>GO BACK!</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',     
    padding: 20,
  },
  text: {
    fontSize: 40,
    marginBottom: 40,         
    textAlign: 'center',
  },
  square: {
    width: 150,               
    height: 150,              
    marginBottom: 120,        
    justifyContent: 'center', 
    alignItems: 'center',     
    borderRadius: 20,         
  },
  buttonTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',  
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',      
  },
});
