import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerNavigation} from './routes';

export const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
};
