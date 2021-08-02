import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, {useContext} from 'react';
import {LoginContext} from '../../context/Login/LoginContext';
import {onSignOut} from '../../services/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const SignoutButton = props => {
  const {setIsLogin, isLogin} = useContext(LoginContext);

  const onSignOutApp = () => {
    onSignOut();
    setIsLogin(!isLogin);
    props.navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          onSignOutApp();
        }}
        icon={({color, size}) => (
          <Icon color={color} size={size} name={'logout'} />
        )}
      />
    </DrawerContentScrollView>
  );
};
