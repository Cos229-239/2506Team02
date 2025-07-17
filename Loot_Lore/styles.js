// style.js
import { StyleSheet } from 'react-native';

export const THEMES = {
  default: {
    background: '#3B291C',
    text: '#E59F34',
    button: '#944C17',
    inputBackground: '#fff',
    inputText: '#000',
    placeholder: '#ccc',
  },
  light: {
    background: '#FAFAFA',
    text: '#333',
    button: '#DD8B41',
    inputBackground: '#fff',
    inputText: '#000',
    placeholder: '#aaa',
  },
  dark: {
    background: '#000',
    text: '#DDD',
    button: '#222',
    inputBackground: '#1a1a1a',
    inputText: '#fff',
    placeholder: '#666',
  },
};

export const getGlobalStyles = (theme = 'default') => {
  const colors = THEMES[theme] || THEMES.default;

  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 10,
      minHeight: 60,
      textAlignVertical: 'top',
      color: colors.text,
      fontFamily: 'Aclonica',
    },
    button: {
      backgroundColor: colors.button,
      padding: 12,
      borderRadius: 6,
      alignItems: 'center',
    },
    buttonText: {
      color: colors.text,
      fontFamily: 'Aclonica',
      fontSize: 16,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      fontFamily: 'Aclonica',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
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
};
