import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { OPENAI_API_KEY } from '@env';
import { SelectList } from 'react-native-dropdown-select-list';
import { MONSTER_CREATION_PROMPT } from '../prompts';
import { GLOBAL_STYLES, COLORS } from '../styles';
import monsterOptions from '../data/monsterOptions';
import LoadingOverlay from './LoadingOverlay';

export default function MonsterScreen() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedCR, setSelectedCR] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleClear = () => {
    setSelectedType('');
    setSelectedRace('');
    setSelectedCR('');
  };

  const handleGenerate = async () => {
    if (!selectedType || !selectedRace || !selectedCR) {
      Alert.alert('Missing Info', 'Please select all options before generating.');
      return;
    }

    setIsLoading(true);

    const monsterRequest = `Create a ${selectedRace} of type ${selectedType} with challenge rating ${selectedCR}.`;

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: MONSTER_CREATION_PROMPT },
            { role: 'user', content: monsterRequest },
          ],
          temperature: 0.9,
        }),
      });

      const result = await res.json();
      const message = result.choices[0].message.content;

      try {
        const parsed = JSON.parse(message);
        const enrichedMonster = {
        ...parsed,
        promptType: selectedType,
        promptRace: selectedRace,
        promptChallengeRating: selectedCR,
      };
navigation.navigate('Monster Details', { monster: enrichedMonster }); 
      } catch (parseErr) {
        console.error('JSON Parse Error:', parseErr);
        console.error('Raw response:', message);
        Alert.alert('Invalid JSON', 'OpenAI returned invalid JSON. Try again.');
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      Alert.alert('Error', 'Failed to generate monster. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isGenerateDisabled = !selectedType || !selectedRace || !selectedCR;

  return (
    isLoading ? <LoadingOverlay /> :
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={GLOBAL_STYLES.screen}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={80}
        >
          <ScrollView
            contentContainerStyle={styles.formContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <Text style={styles.title}>Loot & Lore</Text>
              <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>

            <Text style={styles.label}>Monster Type</Text>
           <SelectList setSelected={setSelectedType} data={monsterOptions.typeOptions} placeholder="Monster Type" boxStyles={styles.dropdown} inputStyles={styles.dropdownInput} dropdownStyles={styles.dropdownList} dropdownItemStyles={styles.dropdownItem} dropdownTextStyles={styles.dropdownText} />

            <Text style={styles.label}>Race</Text>
            <SelectList setSelected={setSelectedRace} data={monsterOptions.raceOptions} placeholder="Race"boxStyles={styles.dropdown} inputStyles={styles.dropdownInput} dropdownStyles={styles.dropdownList} dropdownItemStyles={styles.dropdownItem} dropdownTextStyles={styles.dropdownText} />

            <Text style={styles.label}>Challenge Rating</Text>
            <SelectList setSelected={setSelectedCR} data={monsterOptions.crOptions} placeholder="CR" boxStyles={styles.dropdown} inputStyles={styles.dropdownInput} dropdownStyles={styles.dropdownList} dropdownItemStyles={styles.dropdownItem} dropdownTextStyles={styles.dropdownText} />

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleGenerate}
                style={[styles.generateButton, isGenerateDisabled && { opacity: 0.5 }]}
                disabled={isGenerateDisabled || isLoading}
              >
                <Text style={styles.buttonText}>
                  {'Generate'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    color: COLORS.text,
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
    color: '#f4a300',
    fontSize: 20,
    marginVertical: 5,
  },
  dropdown: {
    backgroundColor: COLORS.button,
    borderColor: '#f4a300',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  dropdownInput: {
    color: '#000000',
  },
  dropdownList: {
    backgroundColor: COLORS.button,
    borderColor: '#f4a300',
  },
  dropdownItem: {
    borderBottomColor: '#f4a300',
  },
  dropdownText: {
    color: '#000000',
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
    backgroundColor: COLORS.button,
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  generateButton: {
    backgroundColor: COLORS.button,
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: COLORS.text,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});