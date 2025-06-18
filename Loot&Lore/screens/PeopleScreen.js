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
import DisplayPeopleInfo from '../People';
import { GLOBAL_STYLES, COLORS } from '../styles';

export default function PeopleScreen() { 
  const navigation = useNavigation();   
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedBackground, setSelectedBackground] = useState('');
  const [selectedAlignment, setSelectedAlignment] = useState('');
  const [character, setCharacter] = useState(null);

  const dropdownData = {
  races: [
    { value: 'Aarakocra' },
    { value: 'Aasimar' },
    { value: 'Bugbear' },
    { value: 'Centaur' },
    { value: 'Changeling' },
    { value: 'Deep Gnome' },
    { value: 'Dwarf' },
    { value: 'Dragonborn' },
    { value: 'Dragonlance' },
    { value: 'Duergar' },
    { value: 'Eberron' },
    { value: 'Eladrin' },
    { value: 'Elf' },
    { value: 'Fairy' },
    { value: 'Firbolg' },
    { value: 'Genasi (Air)' },
    { value: 'Genasi (Earth)' },
    { value: 'Genasi (Fire)' },
    { value: 'Genasi (Water)' },
    { value: 'Githyanki' },
    { value: 'Githzerai' },
    { value: 'Goliath' },
    { value: 'Goblin' },
    { value: 'Grung' },
    { value: 'Halfling' },
    { value: 'Half-Elf' },
    { value: 'Half-Orc' },
    { value: 'Harengon' },
    { value: 'Hobgoblin' },
    { value: 'Human' },
    { value: 'Kenku' },
    { value: 'Kobold' },
    { value: 'Lizardfolk' },
    { value: 'Locathah' },
    { value: 'Minotaur' },
    { value: 'Owlkin' },
    { value: 'Orc' },
    { value: 'Ravenloft' },
    { value: 'Ravnica' },
    { value: 'Sea Elf' },
    { value: 'Satyr' },
    { value: 'Shifter' },
    { value: 'Spelljammer' },
    { value: 'Tabaxi' },
    { value: 'Tiefling' },
    { value: 'Tortle' },
    { value: 'Triton' },
    { value: 'Theros' },
    { value: 'Verdan' },
    { value: 'Yuan-Ti' }
  ],
  classes: [
    { value: 'Artificer' },
    { value: 'Barbarian' },
    { value: 'Bard' },
    { value: 'Cleric' },
    { value: 'Druid' },
    { value: 'Fighter' },
    { value: 'Monk' },
    { value: 'Paladin' },
    { value: 'Ranger' },
    { value: 'Rogue' },
    { value: 'Sorcerer' },
    { value: 'Warlock' },
    { value: 'Wizard' }
  ],
  levels: [
    { key: "1", value: "Level 1" },
  { key: "2", value: "Level 2" },
  { key: "3", value: "Level 3" },
  { key: "4", value: "Level 4" },
  { key: "5", value: "Level 5" },
  { key: "6", value: "Level 6" },
  { key: "7", value: "Level 7" },
  { key: "8", value: "Level 8" },
  { key: "9", value: "Level 9" },
  { key: "10", value: "Level 10" },
  { key: "11", value: "Level 11" },
  { key: "12", value: "Level 12" },
  { key: "13", value: "Level 13" },
  { key: "14", value: "Level 14" },
  { key: "15", value: "Level 15" },
  { key: "16", value: "Level 16" },
  { key: "17", value: "Level 17" },
  { key: "18", value: "Level 18" },
  { key: "19", value: "Level 19" },
  { key: "20", value: "Level 20" }
  ],
  backgrounds: [
    { value: 'Acolyte' },
    { value: 'Anthropologist' },
    { value: 'Archaeologist' },
    { value: 'Athlete' },
    { value: 'Black Fist Double Agent' },
    { value: 'Caravan Specialist' },
    { value: 'Charlatan' },
    { value: 'City Watch' },
    { value: 'Clan Crafter' },
    { value: 'Cloistered Scholar' },
    { value: 'Courtier' },
    { value: 'Criminal' },
    { value: 'Dragon Casualty' },
    { value: 'Entertainer' },
    { value: 'Faceless' },
    { value: 'Faction Agent' },
    { value: 'Far Traveler' },
    { value: 'Feylost' },
    { value: 'Fisher' },
    { value: 'Folk Hero' },
    { value: 'Giant Foundling' },
    { value: 'Gladiator' },
    { value: 'Guild Artisan' },
    { value: 'Guild Merchant' },
    { value: 'Haunted One' },
    { value: 'Hermit' },
    { value: 'Harborfolk' },
    { value: 'House Agent' },
    { value: 'Inheritor' },
    { value: 'Investigator (SCAG)' },
    { value: 'Investigator (VRGR)' },
    { value: 'Iron Route Bandit' },
    { value: 'Knight' },
    { value: 'Knight of the Order' },
    { value: 'Marine' },
    { value: 'Mercenary Veteran' },
    { value: 'Mulmaster Aristocrat' },
    { value: 'Noble' },
    { value: 'Outlander' },
    { value: 'Phlan Insurgent' },
    { value: 'Phlan Refugee' },
    { value: 'Pirate' },
    { value: 'Rewarded' },
    { value: 'Ruined' },
    { value: 'Rune Carver' },
    { value: 'Sage' },
    { value: 'Sailor' },
    { value: 'Secret Identity' },
    { value: 'Shade Fanatic' },
    { value: 'Shipwright' },
    { value: 'Smuggler' },
    { value: 'Soldier' },
    { value: 'Spy' },
    { value: 'Stojanow Prisoner' },
    { value: 'Ticklebelly Nomad' },
    { value: 'Trade Sheriff' },
    { value: 'Urban Bounty Hunter' },
    { value: 'Urchin' },
    { value: 'Uthgardt Tribe Member' },
    { value: 'Waterdhavian Noble' },
    { value: 'Witchlight Hand' }
  ],
  alignments: [
    { value: 'Chaotic Evil' },
    { value: 'Chaotic Good' },
    { value: 'Chaotic Neutral' },
    { value: 'Lawful Evil' },
    { value: 'Lawful Good' },
    { value: 'Lawful Neutral' },
    { value: 'Neutral Evil' },
    { value: 'Neutral Good' },
    { value: 'True Neutral' }
  ],
};

const handleOutput = async () => {
    if (!selectedRace || !selectedClass || !selectedLevel || !selectedBackground || !selectedAlignment) {
      Alert.alert("Missing Info", "Please select all options before generating.");
      return;
    }

    const newCharacter = {
      race: selectedRace,
      class: selectedClass,
      level: selectedLevel,
      background: selectedBackground,
      alignment: selectedAlignment,
    };

    const levelNumber = selectedLevel.replace("Level ", "");
    const prompt = `
Create a fantasy RPG character with the following details:

- Race: ${newCharacter.race}
- Class: ${newCharacter.class}
- Level: ${levelNumber}
- Background: ${newCharacter.background}
- Alignment: ${newCharacter.alignment}

Focus on creating unique and immersive traits and abilities based on the character's race, class, background, and level. Traits should include a mix of personality features, physical or magical abilities, and adventuring skills relevant to their class and background.
Randomly generate the character's stats. Use standard 3d6 or 4d6 drop-low methods to assign values between 1 and 25. Do not use default point-buy or pre-balanced stats, try to match stats to level, race and class.
Return ONLY valid JSON in this format:

{
  "name": "Character Name",
  "personality": "Brief personality description...",
  "backstory": "Brief backstory...",
  "traits": [
    "Trait or ability 1 (e.g., 'Darkvision up to 60 feet')",
    "Trait or ability 2 (e.g., 'Rage: Can enter a berserker fury 2 times per day')",
    "Trait or ability 3 (e.g., 'Thieves’ Cant: Can understand and use a secret criminal language')"
  ],
  "stats": {
     "Strength": [random value between 1-25],
    "Dexterity": [random value between 1-25],
    "Constitution": [random value between 1-25],
    "Intelligence": [random value between 1-25],
    "Wisdom": [random value between 1-25],
    "Charisma": [random value between 1-25],
  }
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

        navigation.navigate('CharacterDetails', {
          character: {
            ...newCharacter,
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
      <Text style={styles.label}>Races</Text>
      <SelectList setSelected={setSelectedRace} data={dropdownData.races} placeholder="Races" boxStyles={styles.dropdown} />

      <Text style={styles.label}>Classes</Text>
      <SelectList setSelected={setSelectedClass} data={dropdownData.classes} placeholder="Classes" boxStyles={styles.dropdown} />

      <Text style={styles.label}>Level</Text>
      <SelectList setSelected={setSelectedLevel} data={dropdownData.levels} placeholder="Level" boxStyles={styles.dropdown} />

      <Text style={styles.label}>Backgrounds</Text>
      <SelectList setSelected={setSelectedBackground} data={dropdownData.backgrounds} placeholder="Backgrounds" boxStyles={styles.dropdown} />

      <Text style={styles.label}>Alignment</Text>
      <SelectList setSelected={setSelectedAlignment} data={dropdownData.alignments} placeholder="Alignment" boxStyles={styles.dropdown} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOutput} style={styles.generateButton}>
          <Text style={styles.buttonText}>Generate</Text>
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