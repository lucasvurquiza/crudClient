import React, {useRef, useState} from 'react';
import {useContext} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {LoginContext} from '../../context/Login/LoginContext';
import Login from '../../api/Login';
import {showToastWithGravity} from '../../utils/notifications/showToast';
import {isEmail} from '../../utils/validates/emailValidation';
import {onSignIn} from '../../services/auth';

export const Signin: React.FC = ({navigation}) => {
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
        <Text style={styles.textStyled}>E-mail: </Text>
        <TextInput
          style={styles.inputStyled}
          onChangeText={setEmail}
          value={email || ''}
          ref={inputEmail}
        />
        <Text style={styles.textStyled}>Password: </Text>
        <TextInput
          style={styles.inputStyled}
          onChangeText={setPassword}
          value={password || ''}
          ref={inputPassword}
          secureTextEntry={true}
        />
        <View style={styles.buttonStyled}>
          <TouchableOpacity style={styles.button} onPress={() => onSignInApp()}>
            <Text style={styles.styledText}>Login</Text>
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
  inputStyled: {
    borderBottomWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 8,
  },
  textStyled: {
    marginLeft: 5,
    fontSize: 18,
  },
  buttonStyled: {
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
