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
import { ThemeContext } from '../ThemeContext';
import { getGlobalStyles, THEMES } from '../styles';
import { SPELL_CREATION_PROMPT } from '../prompts';
import spellOptions from '../data/spellOptions';
import LoadingOverlay from './LoadingOverlay';

export default function SpellsScreen() {
  const navigation = useNavigation();
  const { theme, boldText } = useContext(ThemeContext); 
  const globalStyles = getGlobalStyles(theme);
  const themeColors = THEMES[theme];

  const [selectedSpellType, setSelectedSpellType] = useState('');
  const [selectedSpellLevel, setSelectedSpellLevel] = useState('');
  const [selectedCastingTime, setSelectedCastingTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedRangeArea, setSelectedRangeArea] = useState('');
  const [spell, setSpell] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isGenerateDisabled =
    !selectedSpellType ||
    !selectedSpellLevel ||
    !selectedCastingTime ||
    !selectedDuration ||
    !selectedRangeArea;

  const handleOutput = async () => {
    if (isGenerateDisabled) {
      Alert.alert('Missing Info', 'Please select all options before generating.');
      return;
    }

    setIsLoading(true);
    const levelNumber = selectedSpellLevel.replace('Level ', '');
    const interpolatedPrompt = SPELL_CREATION_PROMPT
      .replace(/\$\{newSpell.spellType\}/g, selectedSpellType)
      .replace(/\$\{levelNumber\}/g, levelNumber)
      .replace(/\$\{newSpell.castingTime\}/g, selectedCastingTime)
      .replace(/\$\{newSpell.duration\}/g, selectedDuration)
      .replace(/\$\{newSpell.rangeArea\}/g, selectedRangeArea);

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
            { role: 'system', content: SPELL_CREATION_PROMPT },
            { role: 'user', content: interpolatedPrompt },
          ],
          temperature: 0.8,
        }),
      });

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        try {
          const raw = data.choices[0].message?.content;
          const generated = JSON.parse(raw);

          navigation.navigate('Spell Details', {
            spell: {
              spellType: selectedSpellType,
              spellLevel: selectedSpellLevel,
              castingTime: selectedCastingTime,
              duration: selectedDuration,
              rangeArea: selectedRangeArea,
              ...generated,
            },
          });
        } catch (err) {
          console.error('Failed to parse JSON:', err, data.choices[0].message?.content);
          Alert.alert('Error', 'Spell generation failed. Try again.');
        }
      } else {
        Alert.alert('Error', 'OpenAI did not return a valid response.');
      }
    } catch (fetchErr) {
      console.error('API request failed:', fetchErr);
      Alert.alert('Error', 'Failed to fetch from OpenAI. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedSpellType('');
    setSelectedSpellLevel('');
    setSelectedCastingTime('');
    setSelectedDuration('');
    setSelectedRangeArea('');
    setSpell(null);
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
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>Loot & Lore</Text>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
          </View>

          {/* Spell Type Dropdown */}
          <Text style={[styles.label, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>Spell Type</Text>
          <SelectList
            setSelected={setSelectedSpellType}
            data={spellOptions.spellType}
            placeholder="Spell Type"
            boxStyles={[styles.dropdown, { backgroundColor: themeColors.button, borderColor: themeColors.text }]}
            inputStyles={[styles.dropdownInput, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}
            dropdownStyles={[styles.dropdownList, { backgroundColor: themeColors.button }]}
            dropdownItemStyles={styles.dropdownItem}
            dropdownTextStyles={[styles.dropdownText, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}
          />

          {/* Spell Level Dropdown */}
          <Text style={[styles.label, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>Spell Level</Text>
          <SelectList
            setSelected={setSelectedSpellLevel}
            data={spellOptions.spellLevel}
            placeholder="Spell Level"
            boxStyles={[styles.dropdown, { backgroundColor: themeColors.button, borderColor: themeColors.text }]}
            inputStyles={[styles.dropdownInput, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}
            dropdownStyles={[styles.dropdownList, { backgroundColor: themeColors.button }]}
            dropdownItemStyles={styles.dropdownItem}
            dropdownTextStyles={[styles.dropdownText, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}
          />

          {/* Casting Time Dropdown */}
          <Text style={[styles.label, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>Casting Time</Text>
          <SelectList
            setSelected={setSelectedCastingTime}
            data={spellOptions.castingTime}
            placeholder="Casting Time"
            boxStyles={[styles.dropdown, { backgroundColor: themeColors.button, borderColor: themeColors.text }]}
            inputStyles={[styles.dropdownInput, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}
            dropdownStyles={[styles.dropdownList, { backgroundColor: themeColors.button }]}
            dropdownItemStyles={styles.dropdownItem}
            dropdownTextStyles={[styles.dropdownText, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}
          />

          {/* Duration Dropdown */}
          <Text style={[styles.label, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>Duration</Text>
          <SelectList
            setSelected={setSelectedDuration}
            data={spellOptions.duration}
            placeholder="Duration"
            boxStyles={[styles.dropdown, { backgroundColor: themeColors.button, borderColor: themeColors.text }]}
            inputStyles={[styles.dropdownInput, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}
            dropdownStyles={[styles.dropdownList, { backgroundColor: themeColors.button }]}
            dropdownItemStyles={styles.dropdownItem}
            dropdownTextStyles={[styles.dropdownText, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}
          />

          {/* Range/Area Dropdown */}
          <Text style={[styles.label, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>Range/Area</Text>
          <SelectList
            setSelected={setSelectedRangeArea}
            data={spellOptions.rangeArea}
            placeholder="Range/Area"
            boxStyles={[styles.dropdown, { backgroundColor: themeColors.button, borderColor: themeColors.text }]}
            inputStyles={[styles.dropdownInput, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}
            dropdownStyles={[styles.dropdownList, { backgroundColor: themeColors.button }]}
            dropdownItemStyles={styles.dropdownItem}
            dropdownTextStyles={[styles.dropdownText, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleClear} style={[styles.clearButton, { backgroundColor: themeColors.button }]}>
              <Text style={[styles.buttonText, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleOutput}
              style={[styles.generateButton, { backgroundColor: themeColors.button }, isGenerateDisabled && { opacity: 0.5 }]}
              disabled={isGenerateDisabled}
            >
              <Text style={[styles.buttonText, { color: themeColors.text, fontWeight: boldText ? 'bold' : 'normal' }]}>Generate</Text>
            </TouchableOpacity>
          </View>

          {spell && <DisplaySpellInfo spell={spell} />}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,  // Ensures ScrollView content can grow and scroll
    paddingBottom: 40,  // Adds space at the bottom for the last item
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
  dropdownInput: {},
  dropdownList: {},
  dropdownItem: {
    borderBottomWidth: 1,
  },
  dropdownText: {},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  clearButton: {
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  generateButton: {
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    textAlign: 'center',
  },
});
