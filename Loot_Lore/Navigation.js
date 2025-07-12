import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, ActivityIndicator, View } from 'react-native';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { COLORS } from './styles';

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
import ItemScreen from './screens/ItemScreen';
import ItemDetailsScreen from './screens/ItemDetailsScreen';
import HeaderMenuButton from './HeaderMenuButton';
import SavedDatabaseScreen from './screens/SavedDatabaseScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Main Menu"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => <HeaderMenuButton />,
        drawerStyle: {
          backgroundColor: COLORS.background,
          width: 220,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          marginTop: 80,
          marginBottom: 80,
          elevation: 12,
        },
        drawerActiveTintColor: COLORS.text,
        drawerInactiveTintColor: COLORS.text,
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
      <Drawer.Screen
        name="Separator"
        component={() => null}
        options={{
          drawerLabel: () => (
            <View style={{ height: 1, backgroundColor: COLORS.text, marginVertical: 8 }} />
          ),
        }}
      />
      <Drawer.Screen name="Character Details" component={CharacterDetailsScreen} />
      <Drawer.Screen name="Monster Details" component={MonsterDetailsScreen} />
      <Drawer.Screen name="Item Details" component={ItemDetailsScreen} />
      <Drawer.Screen name="Spell Details" component={SpellDetailsScreen} />
      <Drawer.Screen name="Saved Database" component={SavedDatabaseScreen} options={{drawerItemStyle:{display: 'none'}}} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}