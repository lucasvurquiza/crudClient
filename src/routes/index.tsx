import React, {useContext, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CreateClient} from '../screens/CreateClient';
import {ListClients} from '../screens/ListClients';
import {Signin} from '../screens/Signin';
import {LoginContext} from '../context/Login/LoginContext';
import {SignoutButton} from '../screens/SignoutButton';
import {useState} from 'react';
import {isSignedIn} from '../services/auth';
import {showToastWithGravity} from '../utils/notifications/showToast';
import Icon from 'react-native-vector-icons/MaterialIcons';

export type RootDrawerParamList = {
  CreateClient: undefined;
  ListClients: undefined;
  Signin: undefined;
};

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  const {isLogin} = useContext(LoginContext);
  const [signLoaded, setSignLoaded] = useState(false);

  useEffect(() => {
    (() => {
      isSignedIn()
        .then(() => setSignLoaded(true))
        .catch(() => showToastWithGravity('Erro ao Logar'));
    })();
  }, [isLogin]);

  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <SignoutButton {...props} />}
      // eslint-disable-next-line react-native/no-inline-styles
      drawerStyle={{width: '80%'}}>
      {isLogin === false || signLoaded === false ? (
        <Drawer.Screen
          name="Signin"
          component={Signin}
          options={{swipeEnabled: false}}
        />
      ) : (
        <React.Fragment>
          <Drawer.Screen
            name="Lista de Clientes"
            component={ListClients}
            options={{
              drawerIcon: ({color, size}) => (
                <Icon color={color} size={size} name={'format-list-bulleted'} />
              ),
            }}
          />
          <Drawer.Screen
            name="Adicionar Cliente"
            component={CreateClient}
            options={{
              drawerIcon: ({color, size}) => (
                <Icon color={color} size={size} name={'add'} />
              ),
            }}
          />
        </React.Fragment>
      )}
    </Drawer.Navigator>
  );
};
