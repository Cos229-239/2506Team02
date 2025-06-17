import React, { useState } from 'react';
import Dropdown from './Dropdown'; // Make sure the path is correct
import DisplayPeopleInfo from './PeopleScreen'; // Ensure path is correct
import { View, Text, StyleSheet } from 'react-native';

function People () {
    const [selectedRace, setSelectedRace] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedAbility, setSelectedAbility] = useState('');
    const [selectedBackGround, setSelectedBackground] = useState('');
    const [selectedAlignment, setSelectedAlignment] = useState('');

    const dropdownStyle = {
        width: '250px', // Set the width of the dropdown
        padding: '10px', // Add padding for better appearance
        borderRadius: '5px', // Rounded corners
        border: '1px solid #ccc', // Border color
        fontSize: '16px', // Font size
    };

    const handleDropdown1Change = (event) => {
        setSelectedRace(event.target.value);
    };

    const handleDropdown2Change = (event) => {
        setSelectedClass(event.target.value);
    };

    const handleDropdown3Change = (event) => {
        setSelectedAbility(event.target.value);
    };

    const handleDropdown4Change = (event) => {
        setSelectedBackground(event.target.value);
    };

    const handleDropdown5Change = (event) => {
        setSelectedAlignment(event.target.value);
    };

    const handleOutput = () => {
    alert(`
      Race: ${selectedRace}
      Class: ${selectedClass}
      Ability: ${selectedAbility}
      Background: ${selectedBackGround}
      Alignment: ${selectedAlignment}
    `);
  };

    const Race = ['Aarakocra', 'Aasimar', 'Bugbear', 'Centaur', 'Changeling', 
        'Deep Gnome', 'Dwarf', 'Draonborn', 'Draonlance', 'Duarag', 'Eberron', 
        'Eladrin', 'Elf', 'Fairy', 'Firbolg', 'Genasi (Air)', 'Genasi (Earth)', 
        'Genasi (Fire)', 'Genasi (Water)', 'Githyanki', 'Githzerai', 'Goliath', 
        'Goblin', 'Grung', 'Halfling', 'Half-Elf', 'Half-Orc', 'Harengon', 'Hobgoblin', 
        'Human', 'Kenku', 'Kobold', 'Lizardfolk', 'Locathah', 'MInotaur', 'Owlain', 
        'Orc', 'Ravenloft', 'Ravnica', 'Sea Elf', 'Satyr', 'Sef-Kai', 'Spelljammer', 
        'Tablaxi', 'Tiefling', 'Tortle', 'Triton', 'Theros', 'Verdan', 'Yuan-Ti'];
    const Class = ['Artificer', 'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 
        'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard',];
    const Ability = ['Strong', 'Intelegent', 'Stealthy'];
    const Background = ['Acolyte', 'Anthropologist', 'Archaeologist', 'Athlete', 
        'Black Fist Double Agent', 'Caravan Specialist', 'Charlatan', 'City Watch', 
        'Clan Crafter', 'Cloistered Scholar', 'Courtier', 'Criminal', 'Dragon Casualty', 
        'Entertainer', 'Faceless', 'Faction Agent', 'Far Traveler', 'Feylost', 'Fisher', 
        'Folk Hero', 'Giant Foundling', 'Gladiator', 'Guild Artisan', 'Guild Merchant', 
        'Haunted One', 'Hermit', 'Harborfolk', 'House Agent', 'Inheritor', 
        'Investigator (SCAG)', 'Investigator (VRGR)', 'Iron Route Bandit', 'Knight', 
        'Knight of the Order', 'Marine', 'Mercenary Veteran', 'Mulmaster Aristocrat', 
        'Noble', 'Outlander', 'Phlan Insurgent', 'Phlan Refugee', 'Pirate', 'Rewarded', 
        'Ruined', 'Rune Carver', 'Sage', 'Sailor', 'Secret Identity', 'Shade Fanatic', 
        'Shipwright', 'Smuggler', 'Soldier', 'Spy', 'Stojanow Prisoner', 
        'Ticklebelly Nomad', 'Trade Sheriff', 'Urban Bounty Hunter', 'Urchin', 
        'Uthgardt Tribe Member', 'Waterdhavian Noble', 'Witchlight Hand',];
    const Alignment = ['Chaotic Evil', 'Chaotic Good', 'Chaotic Neutral', 'Lawful Evil', 
        'Lawful Good', 'Lawful Neutral', 'Neutral Evil', 'Neutral Good', 'True Neutral',];

    return (
        <View>
            <Text><People/></Text>
            <Dropdown 
                options={Race} 
                onChange={handleDropdown1Change} 
                label="Races"
            />
            <Dropdown 
                options={Class} 
                onChange={handleDropdown2Change} 
                label="Classes"
            />
            <Dropdown 
                options={Ability} 
                onChange={handleDropdown3Change} 
                label="Ability"
            />
            <Dropdown 
                options={Background} 
                onChange={handleDropdown4Change} 
                label="BackGround"
            />
            <Dropdown 
                options={Alignment} 
                onChange={handleDropdown5Change} 
                label="Alignment"
            />
            <View>
                <Text>Selected from Dropdown 1: {selectedRace}</Text>
                <Text>Selected from Dropdown 2: {selectedClass}</Text>
                <Text>Selected from Dropdown 2: {selectedAbility}</Text>
                <Text>Selected from Dropdown 2: {selectedBackGround}</Text>
                <Text>Selected from Dropdown 2: {selectedAlignment}</Text>
            </View>

             <button onClick={handleOutput}>Show Selected Options</button>
             <DisplayPeopleInfo
        race={selectedRace}
        classType={selectedClass}
        ability={selectedAbility}
        background={selectedBackGround}
        alignment={selectedAlignment}
      />

        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default People;