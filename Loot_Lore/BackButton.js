import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext'; // adjust path if needed
import { getGlobalStyles } from './styles';     // adjust path if needed

export default function BackButton({ label = 'Back' }) {
  const navigation = useNavigation();
  const { theme, boldText } = useContext(ThemeContext);
  const styles = getGlobalStyles(theme);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Other')} // 👈 Navigates to OtherScreen.js
      style={[styles.button, localStyles.backButton]}
    >
      <Text style={[styles.buttonText, boldText && { fontWeight: 'bold' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const localStyles = StyleSheet.create({
  backButton: {
    marginVertical: 20,
    borderRadius: 8,
    alignSelf: 'center',
     paddingVertical: 14,
    paddingHorizontal: 40,
  },
});
