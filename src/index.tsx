import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerNavigation} from './routes';
import {LogBox} from 'react-native';

export const App = () => {
  LogBox.ignoreLogs(['Reanimated 2']);

  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
};
