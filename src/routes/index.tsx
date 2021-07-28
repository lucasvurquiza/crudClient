import React from 'react';
import {createDrawerNavigator, DrawerContent} from '@react-navigation/drawer';
import {CreateClient} from '../screens/CreateClient';
import {ListClients} from '../screens/ListClients';

export type RootDrawerParamList = {
  CreateClient: undefined;
  ListClients: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <DrawerContent {...props} />}
      // eslint-disable-next-line react-native/no-inline-styles
      drawerStyle={{width: '80%'}}>
      <Drawer.Screen name="CreateClient" component={CreateClient} />
      <Drawer.Screen name="ListClients" component={ListClients} />
    </Drawer.Navigator>
  );
};
