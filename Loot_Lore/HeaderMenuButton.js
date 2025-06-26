// HeaderMenuButton.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { COLORS } from './styles';

export default function HeaderMenuButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={{ marginRight: 16 }}
    >
      <Ionicons name="menu" size={24} color={COLORS.text} />
    </TouchableOpacity>
  );
}