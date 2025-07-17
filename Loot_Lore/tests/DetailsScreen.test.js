import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CharacterDetailsScreen from '../screens/CharacterDetailsScreen';
import MonsterDetailsScreen from '../screens/MonsterDetailsScreen';
import SpellDetailsScreen from '../screens/SpellDetailScreen';
import { NavigationContainer } from '@react-navigation/native';


jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const character = {
  name: 'Test Hero',
  race: 'Elf',
  class: 'Wizard',
  level: '5',
  background: 'Sage',
  alignment: 'Neutral Good',
  personality: 'Curious and aloof',
  backstory: 'Once a librarian...',
  traits: ['Darkvision', 'Arcane Recovery'],
  stats: { STR: 8, DEX: 14, CON: 10, INT: 18, WIS: 12, CHA: 11 },
};

const monster = {
  name: 'Goblin King',
  promptType: 'Humanoid',
  promptRace: 'Goblin',
  promptChallengeRating: '3',
  stats: { STR: 12, DEX: 16, CON: 14, INT: 10, WIS: 8, CHA: 6 },
  abilities: ['Sneak', 'Regeneration'],
  attacks: ['Spear Thrust'],
  spells: ['Dark Bolt'],
  lore: 'A cunning leader of goblin clans.',
  shortDescription: 'Smells bad, thinks worse.',
};

const spell = {
  name: 'Fireball',
  school: 'Evocation',
  level: '3',
  castingTime: '1 action',
  duration: 'Instantaneous',
  range: '150 feet',
  description: 'A bright streak flashes...',
  effects: ['8d6 fire damage in a 20-ft radius'],
  components: { verbal: true, somatic: true, material: 'a tiny ball of bat guano and sulfur' },
};

const renderWithNav = (Component, props) => {
  return render(
    <NavigationContainer>
      <Component {...props} navigation={{ goBack: jest.fn() }} />
    </NavigationContainer>
  );
};

describe('CharacterDetailsScreen', () => {
  it('renders character info', () => {
    const { getByText } = renderWithNav(CharacterDetailsScreen, { route: { params: { character } } });
    expect(getByText('Test Hero')).toBeTruthy();
    expect(getByText('Class: Wizard')).toBeTruthy();
    expect(getByText('Traits & Abilities')).toBeTruthy();
  });
});

describe('MonsterDetailsScreen', () => {
  it('renders monster info', () => {
    const { getByText } = renderWithNav(MonsterDetailsScreen, { route: { params: { monster } } });
    expect(getByText('Goblin King')).toBeTruthy();
    expect(getByText('Challenge Rating: 3')).toBeTruthy();
    expect(getByText('Lore')).toBeTruthy();
  });
});

describe('SpellDetailsScreen', () => {
  it('renders spell info', () => {
    const { getByText } = renderWithNav(SpellDetailsScreen, { route: { params: { spell } } });
    expect(getByText('Fireball')).toBeTruthy();
    expect(getByText('Range: 150 feet')).toBeTruthy();
    expect(getByText('Effects')).toBeTruthy();
  });
});
