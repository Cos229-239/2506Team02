import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { OPENAI_API_KEY } from '@env';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { CHARACTER_CREATION_PROMPT } from '../prompts';
import DisplayPeopleInfo from '../People';
import { getGlobalStyles, THEMES } from '../styles';
import { ThemeContext } from '../ThemeContext';
import peopleOptions from '../data/peopleOptions';
import LoadingOverlay from './LoadingOverlay';

export default function PeopleScreen() {
  const navigation = useNavigation();
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedBackground, setSelectedBackground] = useState('');
  const [selectedAlignment, setSelectedAlignment] = useState('');
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { theme, boldText } = useContext(ThemeContext);
  const globalStyles = getGlobalStyles(theme);
  const themeColors = THEMES[theme];

  const isGenerateDisabled =
    !selectedRace || !selectedClass || !selectedLevel || !selectedBackground || !selectedAlignment;

  const handleOutput = async () => {
    if (isGenerateDisabled) {
      Alert.alert('Missing Info', 'Please select all options before generating.');
      return;
    }

    setIsLoading(true);
    const levelNumber = selectedLevel.replace('Level ', '');

    const interpolatedPrompt = CHARACTER_CREATION_PROMPT
      .replace(/\$\{character.race\}/g, selectedRace)
      .replace(/\$\{character.class\}/g, selectedClass)
      .replace(/\$\{levelNumber\}/g, levelNumber)
      .replace(/\$\{character.background\}/g, selectedBackground)
      .replace(/\$\{character.alignment\}/g, selectedAlignment);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: CHARACTER_CREATION_PROMPT },
            { role: 'user', content: interpolatedPrompt },
          ],
          temperature: 0.8,
        }),
      });

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const raw = data.choices[0].message?.content;
        const generated = JSON.parse(raw);

        navigation.navigate('Character Details', {
          character: {
            race: selectedRace,
            class: selectedClass,
            level: selectedLevel,
            background: selectedBackground,
            alignment: selectedAlignment,
            ...generated,
          },
        });
      } else {
        Alert.alert('Error', 'OpenAI did not return a valid response.');
      }
    } catch (err) {
      console.error('API error:', err);
      Alert.alert('Error', 'Failed to connect to OpenAI.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'Characters' }], 
  });
};

  return isLoading ? (
    <LoadingOverlay />
  ) : (
    <SafeAreaView style={globalStyles.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: themeColors.text }]}>Loot & Lore</Text>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
          </View>

          {[
            { label: 'Races', data: peopleOptions.races, setter: setSelectedRace },
            { label: 'Classes', data: peopleOptions.classes, setter: setSelectedClass },
            { label: 'Level', data: peopleOptions.levels, setter: setSelectedLevel },
            { label: 'Backgrounds', data: peopleOptions.backgrounds, setter: setSelectedBackground },
            { label: 'Alignment', data: peopleOptions.alignments, setter: setSelectedAlignment },
          ].map(({ label, data, setter }) => (
            <React.Fragment key={label}>
              <Text style={[styles.label, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>
                {label}
              </Text>
              <SelectList
                setSelected={setter}
                data={data}
                placeholder={label}
                boxStyles={[styles.dropdown, { backgroundColor: themeColors.button, borderColor: themeColors.text }]}
                inputStyles={[styles.dropdownInput, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}
                dropdownStyles={[styles.dropdownList, { backgroundColor: themeColors.button }]}
                dropdownItemStyles={styles.dropdownItem}
                dropdownTextStyles={[styles.dropdownText, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}
              />
            </React.Fragment>
          ))}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleClear}
              style={[styles.clearButton, { backgroundColor: themeColors.button }]}
            >
              <Text style={[styles.buttonText, { color: themeColors.text }]}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleOutput}
              style={[
                styles.generateButton,
                { backgroundColor: themeColors.button },
                (isGenerateDisabled || isLoading) && { opacity: 0.5 },
              ]}
              disabled={isGenerateDisabled || isLoading}
            >
              <Text style={[styles.buttonText, { color: themeColors.text }]}>Generate</Text>
            </TouchableOpacity>
          </View>

          {character && <DisplayPeopleInfo character={character} />}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Aclonica',
    marginTop: 20,
    marginBottom: 4,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    marginVertical: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  dropdownInput: {
    fontFamily: 'Aclonica',
  },
  dropdownList: {
    borderWidth: 1,
  },
  dropdownItem: {
    borderBottomWidth: 1,
  },
  dropdownText: {
    fontFamily: 'Aclonica',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  clearButton: {
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  generateButton: {
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Aclonica',
    fontWeight: 'bold',
  },
});
