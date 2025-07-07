<<<<<<< HEAD
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ThemeContext } from './ThemeContext';
import { THEMES } from './styles';
import HeaderMenuButton from './HeaderMenuButton';
=======
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, ActivityIndicator, View } from 'react-native';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { COLORS } from './styles';
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0

// Screens
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
import OtherScreen from './screens/OtherScreen'
import MonsterDetailsScreen from './screens/MonsterDetailsScreen';
<<<<<<< HEAD
import SettingsScreen from './screens/SettingsScreen';
=======
import HeaderMenuButton from './HeaderMenuButton';
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0

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
<<<<<<< HEAD
      <Drawer.Screen name="Other" component={SettingsScreen} />
=======
      <Drawer.Screen name="Other" component={OtherScreen} />
      <Drawer.Screen
        name="Separator"
        component={() => null}
        options={{
          drawerLabel: () => (
            <View style={{ height: 1, backgroundColor: COLORS.text, marginVertical: 8 }} />
          ),
        }}
      />
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
      <Drawer.Screen name="Character Details" component={CharacterDetailsScreen} />
      <Drawer.Screen name="Monster Details" component={MonsterDetailsScreen} />
      <Drawer.Screen name="Spell Details" component={SpellDetailsScreen} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.text} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
<<<<<<< HEAD
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Main" component={DrawerNavigator} />
        <Stack.Screen name="People" component={PeopleScreen} />
        <Stack.Screen name="CharacterDetails" component={CharacterDetailsScreen} />
        <Stack.Screen name="Spells" component={SpellsScreen} />
        <Stack.Screen name="Spell Details" component={SpellDetailsScreen} />
        <Stack.Screen name="Monster Screen" component={MonsterScreen} />
        <Stack.Screen name="Monster Details" component={MonsterDetailsScreen} />
        <Stack.Screen name="Other" component={SettingsScreen} />
=======
        {user ? (
          <>
            <Stack.Screen name="Main" component={DrawerNavigator} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          </>
        )}
>>>>>>> 83b9e2a5d160dd641ded8fd0f89997b8f2924cc0
      </Stack.Navigator>
    </NavigationContainer>
  );
}
