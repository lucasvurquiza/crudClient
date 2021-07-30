/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import Cep from '../../api/Cep';
import Cliente from '../../api/Cliente';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {TextInputMask} from 'react-native-masked-text';
import {RootDrawerParamList} from '../../routes';
import {Header} from '../../components/Header';
import {Container} from '../../style/Container';
import {showToastWithGravity} from '../../utils/notifications/showToast';
import {isEmail} from '../../utils/validates/emailValidation';
import {ResponseProps} from '../ListClients';
import {useRef} from 'react';

type RootStackParamList = {
  ClientDetails: {editClient: ResponseProps};
};

type Props = DrawerScreenProps<RootStackParamList, 'ClientDetails'>;

export const CreateClient: React.FC<Props> = ({route}) => {
  const navigation = useNavigation() as DrawerNavigationProp<
    RootDrawerParamList,
    'CreateClient'
  >;

  const editClient = route.params?.editClient;

  const [idClient, setIdClient] = useState(editClient ? editClient.id : 0);
  const [nome, setNome] = useState(editClient ? editClient.nome : '');
  const [cpf, setCpf] = useState(editClient ? editClient.cpf : '');
  const [email, setEmail] = useState(editClient ? editClient.email : '');
  const [cep, setCep] = useState(editClient ? editClient.endereco.cep : '');
  const [rua, setRua] = useState(editClient ? editClient.endereco.rua : '');
  const [numero, setNumero] = useState(
    editClient ? editClient.endereco.numero : '',
  );
  const [bairro, setBairro] = useState(
    editClient ? editClient.endereco.bairro : '',
  );
  const [cidade, setCidade] = useState(
    editClient ? editClient.endereco.cidade : '',
  );
  const [uf, setUf] = useState(editClient ? editClient.endereco.uf : '');

  const isFocused = useIsFocused();

  useEffect(() => {
    (() => {
      if (!isFocused) {
        clearForm();
      }
    })();
  }, [isFocused]);

  const inputNome = useRef<TextInput>(null);
  const inputCpf = useRef<TextInput>(null);
  const inputEmail = useRef<TextInput>(null);
  const inputCep = useRef<TextInput>(null);
  const inputRua = useRef<TextInput>(null);
  const inputNumero = useRef<TextInput>(null);
  const inputBairro = useRef<TextInput>(null);
  const inputCidade = useRef<TextInput>(null);
  const inputUf = useRef<TextInput>(null);

  async function onBlurCep(text: string) {
    const cepInput = text?.replace(/[^0-9]/g, '');
    if (cepInput?.length !== 8) {
      setCidade('');
      setUf('');
      setRua('');
      setBairro('');
      return;
    }
    const response = await Cep.getCepApi(cepInput);
    if (response.erro) {
      return;
    } else {
      setCidade(response?.localidade);
      setUf(response?.uf);
      setRua(response?.logradouro);
      setBairro(response?.bairro);
    }
  }

  const clearForm = () => {
    setIdClient(0);
    setNome('');
    setCpf('');
    setEmail('');
    setCep('');
    setRua('');
    setNumero('');
    setBairro('');
    setCidade('');
    setUf('');
  };

  const handleSubmit = async () => {
    if (!nome.trim()) {
      showToastWithGravity('Nome em Branco');
      return;
    }
    if (!cpf.trim()) {
      showToastWithGravity('CPF em Branco');
      return;
    }
    if (!email.trim()) {
      showToastWithGravity('E-mail em Branco');
      return;
    }
    if (!isEmail(email)) {
      showToastWithGravity('E-mail Inválido');
      return;
    }
    if (!cep.trim()) {
      showToastWithGravity('CEP em Branco');
      return;
    }
    if (!rua.trim()) {
      showToastWithGravity('Rua em Branco');
      return;
    }
    if (!numero.trim()) {
      showToastWithGravity('Número em Branco');
      return;
    }
    if (!bairro.trim()) {
      showToastWithGravity('Bairro em Branco');
      return;
    }
    if (!cidade.trim()) {
      showToastWithGravity('Cidade em Branco');
      return;
    }
    if (!uf.trim()) {
      showToastWithGravity('UF em Branco');
      return;
    }
    if (idClient !== 0) {
      await Cliente.putClient({
        id: idClient,
        nome,
        cpf,
        email,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        uf,
      });
    } else {
      await Cliente.createCliente({
        nome,
        cpf,
        email,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        uf,
      });
    }
    clearForm();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <Header
            title="Criar Cliente"
            onPress={() => navigation.openDrawer()}
          />
          <Text style={styles.textStyled}>Nome: </Text>
          <TextInput
            style={styles.inputStyled}
            onChangeText={setNome}
            value={nome}
            ref={inputNome}
            onSubmitEditing={() => inputCpf.current?._inputElement?.focus()}
          />
          <Text style={styles.textStyled}>CPF: </Text>
          <TextInputMask
            type={'cpf'}
            style={styles.inputStyled}
            onChangeText={setCpf}
            value={cpf}
            ref={inputCpf}
            onSubmitEditing={() => inputEmail.current?.focus()}
          />
          <Text style={styles.textStyled}>E-mail: </Text>
          <TextInput
            style={styles.inputStyled}
            onChangeText={setEmail}
            value={email}
            ref={inputEmail}
            onSubmitEditing={() => inputCep.current?._inputElement?.focus()}
          />
          <Text style={styles.textStyled}>CEP: </Text>
          <TextInputMask
            type={'zip-code'}
            style={styles.inputStyled}
            onChangeText={setCep}
            value={cep}
            onEndEditing={e => onBlurCep(e.nativeEvent.text)}
            ref={inputCep}
            onSubmitEditing={() => inputNumero.current?.focus()}
          />
          <Text style={styles.textStyled}>Rua: </Text>
          <TextInput
            style={styles.inputStyled}
            onChangeText={setRua}
            value={rua || ''}
            ref={inputRua}
            onSubmitEditing={() => inputNumero.current?.focus()}
          />
          <Text style={styles.textStyled}>Número: </Text>
          <TextInput
            style={styles.inputStyled}
            onChangeText={setNumero}
            value={numero || ''}
            ref={inputNumero}
          />
          <Text style={styles.textStyled}>Bairro: </Text>
          <TextInput
            style={styles.inputStyled}
            onChangeText={setBairro}
            value={bairro || ''}
            ref={inputBairro}
            onSubmitEditing={() => inputCidade.current?.focus()}
          />
          <Text style={styles.textStyled}>Cidade: </Text>
          <TextInput
            style={styles.inputStyled}
            onChangeText={setCidade}
            value={cidade || ''}
            ref={inputCidade}
            onSubmitEditing={() => inputUf.current?.focus()}
          />
          <Text style={styles.textStyled}>UF: </Text>
          <TextInput
            style={styles.inputStyled}
            onChangeText={setUf}
            value={uf || ''}
            ref={inputUf}
          />
          <View style={styles.buttonStyled}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#B2FFB2'}]}
              onPress={() => handleSubmit()}>
              <Text style={styles.textStyled}>Criar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#FFB2B2'}]}
              onPress={() => clearForm()}>
              <Text style={styles.textStyled}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
