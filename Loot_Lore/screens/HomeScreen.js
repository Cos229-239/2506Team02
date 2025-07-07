import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { getGlobalStyles, THEMES } from '../styles';

export default function HomeScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const globalStyles = getGlobalStyles(theme);
  const themeColors = THEMES[theme];

  const handleNavigate = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View
      style={[
        globalStyles.screen,
        styles.container,
        { backgroundColor: themeColors.background },
      ]}
    >
      {/* All text wrapped properly */}
      <Text style={[styles.title, { color: themeColors.text }]}>Loot & Lore</Text>

      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: themeColors.button }]}
          onPress={() => handleNavigate('Characters')}
        >
          <Text style={[styles.buttonText, { color: themeColors.text }]}>Characters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: themeColors.button }]}
          onPress={() => handleNavigate('Monsters')}
        >
          <Text style={[styles.buttonText, { color: themeColors.text }]}>Monsters</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: themeColors.button }]}
          onPress={() => handleNavigate('Items')}
        >
          <Text style={[styles.buttonText, { color: themeColors.text }]}>Items</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: themeColors.button }]}
          onPress={() => handleNavigate('Spells')}
        >
          <Text style={[styles.buttonText, { color: themeColors.text }]}>Spells</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.centeredButton, { backgroundColor: themeColors.button }]}
        onPress={() => handleNavigate('Other')}
      >
        <Text style={[styles.buttonText, { color: themeColors.text }]}>Other</Text>
      </TouchableOpacity>
    </View>
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
    width: 350,
    height: 350,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  centeredButton: {
    paddingVertical: 16,
    paddingHorizontal: 65,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Aclonica',
  },
});
