import React from 'react';
// import {View} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {MenuItem} from '../MenuItem';
import {
  Container,
  // NameUser,
  // TitleUser,
  Body,
  Footer,
  // Logo,
  // HeaderBody,
} from './styles';

export const DrawerContent = (
  props: DrawerContentComponentProps,
): React.ReactElement => {
  const menuItems = [
    {
      label: 'App',
      route: 'App',
      icon: 'home',
    },
  ];

  return (
    <Container>
      <Body>
        {/* <HeaderBody>
          <View>
            <Logo size={50} name="account-circle" />
          </View>
          <NameUser>Ednilson</NameUser>
          <TitleUser>Desenvolvedor</TitleUser>
        </HeaderBody> */}
        {menuItems.map(item => (
          <MenuItem
            stack={props}
            key={item.route}
            icon={item.icon}
            routeName={item.route}
            label={item.label}
          />
        ))}
      </Body>
      <Footer>
        <MenuItem
          stack={props}
          onPress={() => console.log('Teste')}
          icon="power"
          label="Sair"
        />
      </Footer>
    </Container>
  );
};
