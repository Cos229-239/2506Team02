// HeaderMenuButton.js
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext'; // ✅ import context
import { THEMES } from './styles';             // ✅ use dynamic colors

export default function HeaderMenuButton() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const colors = THEMES[theme] || THEMES.default;

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={{ marginRight: 16 }}
    >
      <Ionicons name="menu" size={24} color={colors.text} />
    </TouchableOpacity>
  );
}
