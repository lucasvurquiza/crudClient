import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerNavigation} from './routes';
import {LogBox} from 'react-native';
import {LoginProvider} from './context/Login/LoginProvider';
// import {AuthStack} from './routes/authNavigation';

export const App = () => {
  LogBox.ignoreLogs(['Reanimated 2']);

  return (
    <NavigationContainer>
      <LoginProvider>
        <DrawerNavigation />
      </LoginProvider>
    </NavigationContainer>
  );
};
