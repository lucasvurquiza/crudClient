import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  View,
} from 'react-native';
import Cep from '../../api/Cep';
import Cliente from '../../api/Cliente';

import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootDrawerParamList} from '../../routes';
import Header from '../../components/Header';
import {Container} from '../../style/Container';

export const CreateClient = () => {
  const navigation = useNavigation() as DrawerNavigationProp<
    RootDrawerParamList,
    'CreateClient'
  >;

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');

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

  const handleSubmit = async () => {
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
          />
          <Text style={styles.textStyled}>CPF: </Text>
          <TextInput
            style={styles.inputStyled}
            onChangeText={setCpf}
            value={cpf}
          />
          <Text style={styles.textStyled}>E-mail: </Text>
          <TextInput
            style={styles.inputStyled}
            onChangeText={setEmail}
            value={email}
          />
          <Text style={styles.textStyled}>CEP: </Text>
          <TextInput
            style={styles.inputStyled}
            onChangeText={setCep}
            value={cep}
            onEndEditing={e => onBlurCep(e.nativeEvent.text)}
          />
          <Text style={styles.textStyled}>Rua: </Text>
          <TextInput
            style={styles.inputStyled}
            onChangeText={setRua}
            value={rua || ''}
          />
          <Text style={styles.textStyled}>Número: </Text>
          <TextInput
            style={styles.inputStyled}
            onChangeText={setNumero}
            value={numero || ''}
          />
          <Text style={styles.textStyled}>Bairro: </Text>
          <TextInput
            style={styles.inputStyled}
            onChangeText={setBairro}
            value={bairro || ''}
          />
          <Text style={styles.textStyled}>Cidade: </Text>
          <TextInput
            style={styles.inputStyled}
            onChangeText={setCidade}
            value={cidade || ''}
          />
          <Text style={styles.textStyled}>UF: </Text>
          <TextInput
            style={styles.inputStyled}
            onChangeText={setUf}
            value={uf || ''}
          />
          <View style={styles.buttonStyled}>
            <Button
              onPress={() => handleSubmit()}
              title="Criar"
              accessibilityLabel="Learn more about this purple button"
            />
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
  },
});
