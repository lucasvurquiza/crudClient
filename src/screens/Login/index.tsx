import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {onSignIn} from '../../services/auth';

// import { Container } from './styles';

export const Login: React.FC = ({navigation}) => {
  return (
    <View>
      <TextInput />
      <TouchableOpacity
        onPress={() => onSignIn().then(() => navigation.navigate('App'))}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
