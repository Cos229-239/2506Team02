import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { OPENAI_API_KEY } from '@env';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { CHARACTER_CREATION_PROMPT } from '../prompts';
import DisplayPeopleInfo from '../People';
import { GLOBAL_STYLES, COLORS } from '../styles';
import peopleOptions from '../data/peopleOptions';

export default function PeopleScreen() { 
  const navigation = useNavigation();   
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedBackground, setSelectedBackground] = useState('');
  const [selectedAlignment, setSelectedAlignment] = useState('');
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


const isGenerateDisabled = !selectedRace || !selectedClass || !selectedLevel || !selectedBackground || !selectedAlignment;

const handleOutput = async () => {
  if (isGenerateDisabled) {
    Alert.alert("Missing Info", "Please select all options before generating.");
    return;
  }

  setIsLoading(true); 

  const levelNumber = selectedLevel.replace("Level ", "");

  const interpolatedPrompt = CHARACTER_CREATION_PROMPT
    .replace(/\$\{character.race\}/g, selectedRace)
    .replace(/\$\{character.class\}/g, selectedClass)
    .replace(/\$\{levelNumber\}/g, levelNumber)
    .replace(/\$\{character.background\}/g, selectedBackground)
    .replace(/\$\{character.alignment\}/g, selectedAlignment);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: CHARACTER_CREATION_PROMPT },
          { role: "user", content: interpolatedPrompt }
        ],
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    console.log("OpenAI Response:", data);

    if (data.choices && data.choices.length > 0) {
      try {
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
      } catch (err) {
        console.error("Failed to parse JSON:", err, data.choices[0].message?.content);
        Alert.alert("Error", "Character generation failed. Try again.");
      }
    } else {
      console.error("Invalid OpenAI response", data);
      Alert.alert("Error", "OpenAI did not return a valid response.");
    }
  } catch (fetchErr) {
    console.error("API request failed:", fetchErr);
    Alert.alert("Error", "Failed to fetch from OpenAI. Try again.");
  } finally {
    setIsLoading(false); 
  }
};

  const handleClear = () => {
    setSelectedRace('');
    setSelectedClass('');
    setSelectedLevel('');
    setSelectedBackground('');
    setSelectedAlignment('');
    setCharacter(null);
  };

  return (
     <SafeAreaView style={GLOBAL_STYLES.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80} 
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'left',
            padding: 20,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
        >
      <View style={styles.header}>
        <Text style={styles.title}>Loot & Lore</Text>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
      <Text style={styles.label}>Races</Text>
      <SelectList setSelected={setSelectedRace} data={peopleOptions.races} placeholder="Races" boxStyles={styles.dropdown} inputStyles={styles.dropdownInput} dropdownStyles={styles.dropdownList} dropdownItemStyles={styles.dropdownItem} dropdownTextStyles={styles.dropdownText}/>

      <Text style={styles.label}>Classes</Text>
      <SelectList setSelected={setSelectedClass} data={peopleOptions.classes} placeholder="Classes" boxStyles={styles.dropdown}  inputStyles={styles.dropdownInput} dropdownStyles={styles.dropdownList} dropdownItemStyles={styles.dropdownItem} dropdownTextStyles={styles.dropdownText}/>

      <Text style={styles.label}>Level</Text>
      <SelectList setSelected={setSelectedLevel} data={peopleOptions.levels} placeholder="Level" boxStyles={styles.dropdown}  inputStyles={styles.dropdownInput} dropdownStyles={styles.dropdownList} dropdownItemStyles={styles.dropdownItem} dropdownTextStyles={styles.dropdownText}/>

      <Text style={styles.label}>Backgrounds</Text>
      <SelectList setSelected={setSelectedBackground} data={peopleOptions.backgrounds} placeholder="Backgrounds" boxStyles={styles.dropdown}  inputStyles={styles.dropdownInput} dropdownStyles={styles.dropdownList} dropdownItemStyles={styles.dropdownItem} dropdownTextStyles={styles.dropdownText}/>

      <Text style={styles.label}>Alignment</Text>
      <SelectList setSelected={setSelectedAlignment} data={peopleOptions.alignments} placeholder="Alignment" boxStyles={styles.dropdown}  inputStyles={styles.dropdownInput} dropdownStyles={styles.dropdownList} dropdownItemStyles={styles.dropdownItem} dropdownTextStyles={styles.dropdownText}/>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={handleOutput}
        style={[styles.generateButton, (isGenerateDisabled || isLoading) && { opacity: 0.5 }]}
        disabled={isGenerateDisabled || isLoading}
        >
  <Text style={styles.buttonText}>
    {isLoading ? 'Generating...' : 'Generate'}
  </Text>
</TouchableOpacity>
      </View>

      {character && <DisplayPeopleInfo character={character} />}
    </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.screen,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
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