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
import DisplaySpellInfo from '../Spells';
import { GLOBAL_STYLES, COLORS } from '../styles';

export default function SpellsScreen() { 
  const navigation = useNavigation();   
  const [selectedSpellType, setSelectedSpellType] = useState('');
  const [selectedSpellLevel, setSelectedSpellLevel] = useState('');
  const [selectedCastingTime, setSelectedCastingTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedRangeArea, setSelectedRangeArea] = useState('');
  const [spell, setSpell] = useState(null);

  const dropdownData = {
  spellType: [
    { value: 'abjuration' },
  { value: 'conjuration' },
  { value: 'divination' },
  { value: 'enchantment' },
  { value: 'evocation' },
  { value: 'illusion' },
  { value: 'necromancy' },
  { value: 'transmutation' }
  ],
  spellLevel:[
    { value: 'Level 1' },
  { value: 'Level 2' },
  { value: 'Level 3' },
  { value: 'Level 4' },
  { value: 'Level 5' },
  { value: 'Level 6' },
  { value: 'Level 7' },
  { value: 'Level 8' },
  { value: 'Level 9' }
  ],
  castingTime:[
     { value: '1 action' },
  { value: '1 bonus action' },
  { value: '1 reaction' },
  { value: '1 minute' },
  { value: '10 minutes' },
  { value: '1 hour' },
  { value: '8 hours' },
  { value: '12 hours' },
  { value: '24 hours' }
  ],
  duration:[
  { value: 'Instantaneous' },
  { value: 'Until dispelled' },
  { value: 'Concentration, up to 1 round' },
  { value: 'Concentration, up to 1 minute' },
  { value: 'Concentration, up to 10 minutes' },
  { value: 'Concentration, up to 1 hour' },
  { value: 'Concentration, up to 8 hours' },
  { value: '1 round' },
  { value: '1 minute' },
  { value: '10 minutes' },
  { value: '1 hour' },
  { value: '8 hours' },
  { value: '24 hours' },
  { value: '7 days' },
  { value: 'Special' }
],
rangeArea:[
  { value: 'Self' },
  { value: 'Touch' },
  { value: '5 feet' },
  { value: '10 feet' },
  { value: '15 feet' },
  { value: '30 feet' },
  { value: '60 feet' },
  { value: '90 feet' },
  { value: '120 feet' },
  { value: '150 feet' },
  { value: '300 feet' },
  { value: '500 feet' },
  { value: '1 mile' },
  { value: 'Sight' },
  { value: 'Unlimited' },
  { value: 'Special' },
  { value: 'Area: 5-foot radius' },
  { value: 'Area: 10-foot radius' },
  { value: 'Area: 15-foot cone' },
  { value: 'Area: 20-foot cube' },
  { value: 'Area: 60-foot line' },
  { value: 'Area: Sphere (varies)' },
  { value: 'Area: Cylinder (varies)' }
]
};

const handleOutput = async () => {
    if (!selectedSpellType || !selectedSpellLevel || !selectedCastingTime || !selectedDuration || !selectedRangeArea) {
      Alert.alert("Missing Info", "Please select all options before generating.");
      return;
    }

    const newSpell = {
      spellType: selectedSpellType,
      spellLevel: selectedSpellLevel,
      castingTime: selectedCastingTime,
      duration: selectedDuration,
      rangeArea: selectedRangeArea,
    };

    const levelNumber = selectedSpellLevel.replace("Level ", "");
    const prompt = `
Create a unique and immersive fantasy RPG spell with the following properties:

- Spell Type: ${newSpell.spellType}
- Spell Level: ${levelNumber}
- Casting Time: ${newSpell.castingTime}
- Duration: ${newSpell.duration}
- Range/Area: ${newSpell.rangeArea}

The spell should include a vivid name, description, magical effects, and relevant mechanical details. Focus on how the spell looks, feels, and functions in the game world. Include any visual effects, elemental themes, and any special quirks or drawbacks the spell might have.

Randomly generate the spell's power metrics such as damage, save DCs, or healing (if applicable), and note any conditions or status effects it causes.

Return ONLY valid JSON in this format:

{
  "name": "Spell Name",
  "description": "A flavorful and vivid spell description...",
  "effects": [
    "Primary effect (e.g., 'Deals 6d8 fire damage in a 20 ft cone')",
    "Secondary effect (e.g., 'Targets must make a Dexterity saving throw or be blinded for 1 turn')",
    "Quirk or drawback (e.g., 'The caster glows with radiant light, giving enemies advantage to hit them for 1 round')"
  ],
  "components": {
    "verbal": true,
    "somatic": true,
    "material": "a ruby worth 50gp"
  },
  "school": "${newSpell.spellType}",
  "level": ${levelNumber},
  "castingTime": "${newSpell.castingTime}",
  "duration": "${newSpell.duration}",
  "range": "${newSpell.rangeArea}"
}
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    console.log("OpenAI Response:", data);

    if (data.choices && data.choices.length > 0) {
      try {
        const raw = data.choices[0].message?.content;
        const generated = JSON.parse(raw);

        navigation.navigate('SpellDetails', {
          spell: {
            ...newSpell,
            ...generated,
          },
        });
      } catch (err) {
        console.error("Failed to parse JSON:", err, data.choices[0].message?.content);
        Alert.alert("Error", "Spell generation failed. Try again.");
      }
    } else {
      console.error("Invalid OpenAI response", data);
      Alert.alert("Error", "OpenAI did not return a valid response.");
    }
  } catch (fetchErr) {
    console.error("API request failed:", fetchErr);
    Alert.alert("Error", "Failed to fetch from OpenAI. Try again.");
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

  return (
     <SafeAreaView style={GLOBAL_STYLES.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80} // Adjust this if you have a header
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
      <Text style={styles.label}>Spell Type</Text>
      <SelectList setSelected={setSelectedSpellType} data={dropdownData.spellType} placeholder="Spell Type" boxStyles={styles.dropdown} />

      <Text style={styles.label}>Spell Level</Text>
      <SelectList setSelected={setSelectedSpellLevel} data={dropdownData.spellLevel} placeholder="Spell Level" boxStyles={styles.dropdown} />

      <Text style={styles.label}>Casting Time</Text>
      <SelectList setSelected={setSelectedCastingTime} data={dropdownData.castingTime} placeholder="Casting Time" boxStyles={styles.dropdown} />

      <Text style={styles.label}>Duration</Text>
      <SelectList setSelected={setSelectedDuration} data={dropdownData.duration} placeholder="Duration" boxStyles={styles.dropdown} />

      <Text style={styles.label}>Range/Area</Text>
      <SelectList setSelected={setSelectedRangeArea} data={dropdownData.rangeArea} placeholder="Range/Area" boxStyles={styles.dropdown} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOutput} style={styles.generateButton}>
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>
      </View>

      {spell && <DisplaySpellInfo spell={spell} />}
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
    backgroundColor: '#fff',
    marginBottom: 10,
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