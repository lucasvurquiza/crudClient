import React, {useRef, useState} from 'react';
import {useContext} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {LoginContext} from '../../context/Login/LoginContext';
import Login from '../../api/Login';
import {showToastWithGravity} from '../../utils/notifications/showToast';
import {isEmail} from '../../utils/validates/emailValidation';
import {onSignIn} from '../../services/auth';
import {InputStyled} from '../../components/InputStyled';
import {TextStyled} from '../../components/TextStyled';

export const Signin: React.FC = () => {
  const {setIsLogin, isLogin, setLoading} = useContext(LoginContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputEmail = useRef<TextInput>(null);
  const inputPassword = useRef<TextInput>(null);

  const onSignInApp = async () => {
    if (!isEmail(email)) {
      showToastWithGravity('E-mail Inválido');
      return;
    }
    if (password.length < 5) {
      showToastWithGravity('Senha deve ser maior que 4 digitos');
      return;
    }
    setLoading(true);
    const signin = await Login.signinLogin(email, password);
    if (signin) {
      onSignIn();
      setIsLogin(!isLogin);
    } else {
      setLoading(false);
      showToastWithGravity('E-mail ou senha errado');
      return;
    }
  };

  return (
    <View style={styles.content}>
      <View style={styles.form}>
        <TextStyled>E-mail: </TextStyled>
        <InputStyled
          onChangeText={setEmail}
          value={email || ''}
          ref={inputEmail}
          onSubmitEditing={() => inputPassword.current?.focus()}
        />
        <TextStyled>Password: </TextStyled>
        <InputStyled
          onChangeText={setPassword}
          value={password || ''}
          ref={inputPassword}
          secureTextEntry={true}
        />
        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.button} onPress={() => onSignInApp()}>
            <TextStyled style={styles.styledText}>Login</TextStyled>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    width: '100%',
  },
  containerButtons: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    width: '80%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '40%',
    borderRadius: 5,
  },
  styledText: {
    fontWeight: 'bold',
  },
});
