import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import navigation
import { ThemeContext } from './ThemeContext'; // adjust path if needed
import { getGlobalStyles } from './styles';     // adjust path if needed

export default function DeleteAccountButton({ label = 'Delete Account' }) {
  const navigation = useNavigation();  // Initialize useNavigation hook to navigate
  const { theme, boldText } = useContext(ThemeContext);
  const styles = getGlobalStyles(theme);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Delete Account')}  // Navigate to DeleteAccountScreen
      style={[styles.button, localStyles.deleteButton]}
    >
      <Text style={[styles.buttonText, boldText && { fontWeight: 'bold' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const localStyles = StyleSheet.create({
  deleteButton: {
    marginVertical: 20,  
    backgroundColor: '#FF4D4D',  // Red color for delete action
    borderRadius: 8,
    alignSelf: 'center',
    paddingVertical: 14, 
    paddingHorizontal: 40,  
    width: '100%',
  },
});
