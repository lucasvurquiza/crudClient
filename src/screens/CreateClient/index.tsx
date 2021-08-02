import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
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
import {RootDrawerParamList} from '../../routes';
import {Header} from '../../components/Header';
import {Container} from '../../style/Container';
import {showToastWithGravity} from '../../utils/notifications/showToast';
import {isEmail} from '../../utils/validates/emailValidation';
import {ResponseProps} from '../ListClients';
import {useRef} from 'react';
import {LoginContext} from '../../context/Login/LoginContext';
import {InputStyled, InputStyledMask} from '../../components/InputStyled';
import {TextStyled} from '../../components/TextStyled';

type RootStackParamList = {
  ClientDetails: {editClient: ResponseProps};
};

type Props = DrawerScreenProps<RootStackParamList, 'ClientDetails'>;

export const CreateClient: React.FC<Props> = ({route}) => {
  const {setLoading} = useContext(LoginContext);
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
        setLoading(false);
        clearForm();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setLoading(true);
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
      setLoading(false);
    } else {
      setLoading(true);
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
      setLoading(false);
    }
    clearForm();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <Header
            title="Adicionar Cliente"
            onPress={() => navigation.openDrawer()}
          />
          <TextStyled>Nome: </TextStyled>
          <InputStyled
            onChangeText={setNome}
            value={nome}
            ref={inputNome}
            onSubmitEditing={() => inputCpf.current?._inputElement?.focus()}
          />
          <TextStyled>CPF: </TextStyled>
          <InputStyledMask
            type={'cpf'}
            onChangeText={setCpf}
            value={cpf}
            ref={inputCpf}
            onSubmitEditing={() => inputEmail.current?.focus()}
          />
          <TextStyled>E-mail: </TextStyled>
          <InputStyled
            onChangeText={setEmail}
            value={email}
            ref={inputEmail}
            onSubmitEditing={() => inputCep.current?._inputElement?.focus()}
          />
          <TextStyled>CEP: </TextStyled>
          <InputStyledMask
            type={'zip-code'}
            onChangeText={setCep}
            value={cep}
            onEndEditing={e => onBlurCep(e.nativeEvent.text)}
            ref={inputCep}
            onSubmitEditing={() => inputNumero.current?.focus()}
          />
          <TextStyled>Rua: </TextStyled>
          <InputStyled
            onChangeText={setRua}
            value={rua || ''}
            ref={inputRua}
            onSubmitEditing={() => inputNumero.current?.focus()}
          />
          <TextStyled>Número: </TextStyled>
          <InputStyled
            onChangeText={setNumero}
            value={numero || ''}
            ref={inputNumero}
          />
          <TextStyled>Bairro: </TextStyled>
          <InputStyled
            onChangeText={setBairro}
            value={bairro || ''}
            ref={inputBairro}
            onSubmitEditing={() => inputCidade.current?.focus()}
          />
          <TextStyled>Cidade: </TextStyled>
          <InputStyled
            onChangeText={setCidade}
            value={cidade || ''}
            ref={inputCidade}
            onSubmitEditing={() => inputUf.current?.focus()}
          />
          <TextStyled>UF: </TextStyled>
          <InputStyled onChangeText={setUf} value={uf || ''} ref={inputUf} />
          <View style={styles.containerButtons}>
            <TouchableOpacity
              // eslint-disable-next-line react-native/no-inline-styles
              style={[styles.button, {backgroundColor: '#B2FFB2'}]}
              onPress={() => handleSubmit()}>
              <TextStyled style={styles.styledText}>Criar</TextStyled>
            </TouchableOpacity>
            <TouchableOpacity
              // eslint-disable-next-line react-native/no-inline-styles
              style={[styles.button, {backgroundColor: '#FFB2B2'}]}
              onPress={() => clearForm()}>
              <TextStyled style={styles.styledText}>Limpar</TextStyled>
            </TouchableOpacity>
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
