import React from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from './styles';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './ChatScreen';
import PlaceholderScreen from './screens/PlaceHolderScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Main Menu"
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.background, 
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="menu" size={24} color={COLORS.text} />
          </TouchableOpacity>
        ),
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
      })}
    >
      <Drawer.Screen name="Main Menu" component={HomeScreen} />
      <Drawer.Screen name="People" component={PlaceholderScreen} />
      <Drawer.Screen name="Monsters" component={ChatScreen} />
      <Drawer.Screen name="Items" component={PlaceholderScreen} />
      <Drawer.Screen name="Spells" component={PlaceholderScreen} />
      <Drawer.Screen name="Other" component={PlaceholderScreen} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Main" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}