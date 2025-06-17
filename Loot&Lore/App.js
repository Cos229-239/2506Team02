import React from 'react';
//import ChatScreen from './ChatScreen';
import Test from './PeopleGenerater';
import NewPage from './PeopleDropbox';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
      <Stack.Navigator initialRouteName="ChatScreen">
        <Stack.Screen name="ChatScreen" component={NewPage} />
        <Stack.Screen name="NewPage" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

