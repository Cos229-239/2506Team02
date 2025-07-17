jest.mock('expo-clipboard', () => ({
  setStringAsync: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CharacterDetailsScreen from '../screens/CharacterDetailsScreen';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Alert } from 'react-native';
import Share from 'react-native/Libraries/Share/Share';

const mockCharacter = {
  name: 'Test Hero',
  race: 'Elf',
  class: 'Wizard',
  level: 3,
  background: 'Sage',
  alignment: 'Neutral Good',
  stats: {
    STR: 10,
    DEX: 14,
    CON: 12,
    INT: 18,
    WIS: 13,
    CHA: 8,
  },
  backstory: 'A wandering wizard in search of lost lore.',
  personality: 'Curious, cautious, and clever.',
  traits: ['Arcane Recovery', 'Spellcasting'],
};

const navigation = { goBack: jest.fn() };

describe('CharacterDetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders character details', () => {
    const { getByText } = render(
      <CharacterDetailsScreen route={{ params: { character: mockCharacter } }} navigation={navigation} />
    );

    expect(getByText('Test Hero')).toBeTruthy();
    expect(getByText('Race: Elf')).toBeTruthy();
    expect(getByText('Level: 3')).toBeTruthy();
    expect(getByText('- Arcane Recovery')).toBeTruthy();
  });

  it('calls Clipboard on copy', async () => {
    const { getByText } = render(
      <CharacterDetailsScreen route={{ params: { character: mockCharacter } }} navigation={navigation} />
    );

    fireEvent.press(getByText('Copy'));

    await waitFor(() => {
      expect(Clipboard.setStringAsync).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith('Copied', 'Character copied to clipboard!');
    });
  });

  it('calls Share on share', async () => {
    const { getByText } = render(
      <CharacterDetailsScreen route={{ params: { character: mockCharacter } }} navigation={navigation} />
    );

    fireEvent.press(getByText('Share'));

    await waitFor(() => {
      expect(Share.share).toHaveBeenCalled();
    });
  });

  it('saves character to AsyncStorage', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(null);

    const { getByText } = render(
      <CharacterDetailsScreen route={{ params: { character: mockCharacter } }} navigation={navigation} />
    );

    fireEvent.press(getByText('Save'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith('Success', 'Character saved successfully!');
    });
  });

  it('handles missing character prop', () => {
    const { getByText } = render(<CharacterDetailsScreen route={{}} navigation={navigation} />);
    expect(getByText('No character data found.')).toBeTruthy();
    fireEvent.press(getByText('Go Back'));
    expect(navigation.goBack).toHaveBeenCalled();
  });
});
