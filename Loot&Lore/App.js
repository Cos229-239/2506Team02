import React from 'react';
//import ChatScreen from './ChatScreen';
import Test from './PeopleCard';
import NewPage from './PeopleDropbox';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//const Stack = createStackNavigator();

export default function App() {
  return (
    //  <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Wall">
    //     <Stack.Screen name="Wall" component={NewPage} />
    //     <Stack.Screen name="NewPage" component={Test} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NewPage/>

  );
}

