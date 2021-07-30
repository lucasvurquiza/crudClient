import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../screens/Login';
import {DrawerNavigation} from '.';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="App" component={DrawerNavigation} />
    </Stack.Navigator>
  );
};
