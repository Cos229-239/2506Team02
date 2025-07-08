import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

import { ThemeContext } from './ThemeContext';
import { THEMES } from './styles';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import PlaceholderScreen from './screens/PlaceHolderScreen';
import PeopleScreen from './screens/PeopleScreen';
import CharacterDetailsScreen from './screens/CharacterDetailsScreen';
import SpellsScreen from './screens/SpellsScreen';
import SpellDetailsScreen from './screens/SpellDetailScreen';
import MonsterScreen from './screens/MonsterScreen';
import MonsterDetailsScreen from './screens/MonsterDetailsScreen';
import SettingsScreen from './screens/SettingsScreen';
import OtherScreen from './screens/OtherScreen'
import HeaderMenuButton from './HeaderMenuButton';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const { theme } = useContext(ThemeContext);
  const colors = THEMES[theme] || THEMES.default;

  return (
    <Drawer.Navigator
      initialRouteName="Main Menu"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => <HeaderMenuButton />,
        drawerStyle: {
          backgroundColor: colors.background,
          width: 220,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          marginTop: 80,
          marginBottom: 80,
          elevation: 12,
        },
        drawerActiveTintColor: colors.text,
        drawerInactiveTintColor: colors.text,
        drawerType: 'front',
        overlayColor: 'rgba(160, 152, 127, 0.78)',
        drawerPosition: 'right',
      }}
    >
      <Drawer.Screen name="Main Menu" component={HomeScreen} />
      <Drawer.Screen name="Characters" component={PeopleScreen} />
      <Drawer.Screen name="Monsters" component={MonsterScreen} />
      <Drawer.Screen name="Items" component={PlaceholderScreen} />
      <Drawer.Screen name="Spells" component={SpellsScreen} />
      <Drawer.Screen name="Other" component={OtherScreen} />
      <Drawer.Screen name="Character Details" component={CharacterDetailsScreen} />
      <Drawer.Screen name="Monster Details" component={MonsterDetailsScreen} />
      <Drawer.Screen name="Spell Details" component={SpellDetailsScreen} />
      
    </Drawer.Navigator>
  );
}

export default function AppNavigator({ user }) {
  const { theme } = useContext(ThemeContext);
  const themeColors = THEMES[theme] || THEMES.default;

  const [loading, setLoading] = useState(user === undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: themeColors.background }}>
        <ActivityIndicator size="large" color={themeColors.text} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={DrawerNavigator} />
            <Stack.Screen name="People" component={PeopleScreen} />
            <Stack.Screen name="Character Details" component={CharacterDetailsScreen} />
            <Stack.Screen name="Spells" component={SpellsScreen} />
            <Stack.Screen name="Spell Details" component={SpellDetailsScreen} />
            <Stack.Screen name="Monster Screen" component={MonsterScreen} />
            <Stack.Screen name="Monster Details" component={MonsterDetailsScreen} />
            <Stack.Screen name="Other" component={OtherScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
