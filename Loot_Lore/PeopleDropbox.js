import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import DisplayPeopleInfo from './People';
import { ThemeContext } from './ThemeContext';

export default function PeopleDropbox() {
  const { theme } = useContext(ThemeContext);
  const colors = theme;

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
    { value: 'Sef-Kai' },
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
    { key: '1', value: 'Level 1' },
    { key: '2', value: 'Level 2' },
    { key: '3', value: 'Level 3' },
    { key: '4', value: 'Level 4' },
    { key: '5', value: 'Level 5' },
    { key: '6', value: 'Level 6' },
    { key: '7', value: 'Level 7' },
    { key: '8', value: 'Level 8' },
    { key: '9', value: 'Level 9' },
    { key: '10', value: 'Level 10' },
    { key: '11', value: 'Level 11' },
    { key: '12', value: 'Level 12' },
    { key: '13', value: 'Level 13' },
    { key: '14', value: 'Level 14' },
    { key: '15', value: 'Level 15' },
    { key: '16', value: 'Level 16' },
    { key: '17', value: 'Level 17' },
    { key: '18', value: 'Level 18' },
    { key: '19', value: 'Level 19' },
    { key: '20', value: 'Level 20' }
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

  const handleOutput = () => {
    const newCharacter = {
      race: selectedRace,
      classes: selectedClass,
      levels: selectedLevel,
      background: selectedBackground,
      alignment: selectedAlignment,
    };
    setCharacter(newCharacter);
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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>People</Text>

      <Text style={[styles.label, { color: colors.text }]}>Races</Text>
      <SelectList
        setSelected={setSelectedRace}
        data={dropdownData.races}
        placeholder="Races"
        boxStyles={[styles.dropdown, { backgroundColor: colors.button }]}
        inputStyles={{ color: colors.inputText }}
        dropdownTextStyles={{ color: colors.inputText }}
      />

      <Text style={[styles.label, { color: colors.text }]}>Classes</Text>
      <SelectList
        setSelected={setSelectedClass}
        data={dropdownData.classes}
        placeholder="Classes"
        boxStyles={[styles.dropdown, { backgroundColor: colors.button }]}
        inputStyles={{ color: colors.inputText }}
        dropdownTextStyles={{ color: colors.inputText }}
      />

      <Text style={[styles.label, { color: colors.text }]}>Level</Text>
      <SelectList
        setSelected={setSelectedLevel}
        data={dropdownData.levels}
        placeholder="Level"
        boxStyles={[styles.dropdown, { backgroundColor: colors.button }]}
        inputStyles={{ color: colors.inputText }}
        dropdownTextStyles={{ color: colors.inputText }}
      />

      <Text style={[styles.label, { color: colors.text }]}>Backgrounds</Text>
      <SelectList
        setSelected={setSelectedBackground}
        data={dropdownData.backgrounds}
        placeholder="Backgrounds"
        boxStyles={[styles.dropdown, { backgroundColor: colors.button }]}
        inputStyles={{ color: colors.inputText }}
        dropdownTextStyles={{ color: colors.inputText }}
      />

      <Text style={[styles.label, { color: colors.text }]}>Alignment</Text>
      <SelectList
        setSelected={setSelectedAlignment}
        data={dropdownData.alignments}
        placeholder="Alignment"
        boxStyles={[styles.dropdown, { backgroundColor: colors.button }]}
        inputStyles={{ color: colors.inputText }}
        dropdownTextStyles={{ color: colors.inputText }}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleClear} style={[styles.clearButton, { backgroundColor: colors.button }]}>
          <Text style={[styles.buttonText, { color: colors.text }]}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOutput} style={[styles.generateButton, { backgroundColor: colors.button }]}>
          <Text style={[styles.buttonText, { color: colors.text }]}>Generate</Text>
        </TouchableOpacity>
      </View>

      {character && <DisplayPeopleInfo character={character} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  label: {
    fontSize: 20,
    marginVertical: 5,
  },
  dropdown: {
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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
    fontWeight: 'bold',
  },
});
