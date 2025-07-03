// style.js
import { StyleSheet } from 'react-native';

export const THEMES = {
  default: {
    button: '#944C17',
    text: '#E59F34',
    background: '#3B291C',
  },
  light: {
    button: '#DD8B41',
    text: '#333',
    background: '#FAFAFA',
  },
  dark: {
    button: '#222',
    text: '#DDD',
    background: '#000',
  },
};

export const getGlobalStyles = (theme = 'default') =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: THEMES[theme].background,
      padding: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 10,
      minHeight: 60,
      textAlignVertical: 'top',
      color: THEMES[theme].text,
      fontFamily: 'Aclonica',
    },
    button: {
      backgroundColor: THEMES[theme].button,
      padding: 12,
      borderRadius: 6,
      alignItems: 'center',
    },
    buttonText: {
      color: THEMES[theme].text,
      fontFamily: 'Aclonica',
      fontSize: 16,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: THEMES[theme].text,
      fontFamily: 'Aclonica',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: THEMES[theme].text,
      marginTop: 10,
      fontFamily: 'Aclonica',
    },
    drawerStyle: {
      shadowColor: '#000',
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
  });
