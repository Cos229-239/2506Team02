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
import TermsAndAgreementScreen from './screens/TermsAndAgreementScreen';
import SettingsScreen from './screens/SettingsScreen';
import OtherScreen from './screens/OtherScreen'
import ItemScreen from './screens/ItemScreen';
import ItemDetailsScreen from './screens/ItemDetailsScreen';
import SavedDatabaseScreen from './screens/SavedDatabaseScreen';
import PrivateCharactersScreen from './screens/PrivateCharactersScreen';
import PrivateMonstersScreen from './screens/PrivateMonstersScreen';
import PrivateItemsScreen from './screens/PrivateItemsScreen';
import PrivateSpellsScreen from './screens/PrivateSpellsScreen';
import GlobalCharactersScreen from './screens/GlobalCharactersScreen';
import GlobalMonstersScreen from './screens/GlobalMonstersScreen';
import GlobalItemsScreen from './screens/GlobalItemsScreen';
import GlobalSpellsScreen from './screens/GlobalSpellsScreen';


import HeaderMenuButton from './HeaderMenuButton';
import SavedDatabaseScreen from './screens/SavedDatabaseScreen';
import SettingsScreen from './screens/SettingsScreen';
import TermsAndAgreementScreen from './screens/TermsAndAgreementScreen';



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
      <Drawer.Screen name="Items" component={ItemScreen} />
      <Drawer.Screen name="Spells" component={SpellsScreen} />
      <Drawer.Screen name="Other" component={OtherScreen} />
      <Drawer.Screen name="Character Details" component={CharacterDetailsScreen} />
      <Drawer.Screen name="Monster Details" component={MonsterDetailsScreen} />
      <Drawer.Screen name="Item Details" component={ItemDetailsScreen} />
      <Drawer.Screen name="Spell Details" component={SpellDetailsScreen} />
      <Drawer.Screen name="Terms and Agreement" component={TermsAndAgreementScreen} options={{drawerItemStyle:{display: 'none'}}} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Terms & Agreement" component={TermsAndAgreementScreen} />
      <Drawer.Screen name="Private Characters" component={PrivateCharactersScreen} />
            <Drawer.Screen name="Private Monsters" component={PrivateMonstersScreen} />
            <Drawer.Screen name="Private Items" component={PrivateItemsScreen} />
            <Drawer.Screen name="Private Spells" component={PrivateSpellsScreen} />
            <Drawer.Screen name="Global Characters" component={GlobalCharactersScreen} />
            <Drawer.Screen name="Global Monsters" component={GlobalMonstersScreen} />
            <Drawer.Screen name="Global Items" component={GlobalItemsScreen} />
            <Drawer.Screen name="Global Spells" component={GlobalSpellsScreen} />
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
            <Stack.Screen name="Item" component={ItemScreen} />
            <Stack.Screen name="Item Details" component={ItemDetailsScreen} />
            <Stack.Screen name="Saved Databases" component ={SavedDatabaseScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Terms & Agreement" component={TermsAndAgreementScreen} />
            <Stack.Screen name="Private Characters" component={PrivateCharactersScreen} />
            <Stack.Screen name="Private Monsters" component={PrivateMonstersScreen} />
            <Stack.Screen name="Private Items" component={PrivateItemsScreen} />
            <Stack.Screen name="Private Spells" component={PrivateSpellsScreen} />
            <Stack.Screen name="Global Characters" component={GlobalCharactersScreen} />
            <Stack.Screen name="Global Monsters" component={GlobalMonstersScreen} />
            <Stack.Screen name="Global Items" component={GlobalItemsScreen} />
            <Stack.Screen name="Global Spells" component={GlobalSpellsScreen} />


          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
