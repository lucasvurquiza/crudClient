import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootDrawerParamList} from '../../routes';
import Header from '../../components/Header';
import {Container} from '../../style/Container';
import {Table} from '../../components/Table';
import Cliente from '../../api/Cliente';

export type ResponseProps = {
  nome: string;
  cpf: string;
  email: string;
  endereco: {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
  id: number;
};

export const ListClients = () => {
  const [loadClientes, setLoadClientes] = useState([]);
  const isFocused = useIsFocused();

  const navigation = useNavigation() as DrawerNavigationProp<
    RootDrawerParamList,
    'ListClients'
  >;

  useEffect(() => {
    const fetchAllCliente = async () => {
      const response = await Cliente.getAllClientes();
      setLoadClientes(response);
    };
    fetchAllCliente();
  }, [isFocused]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <Header
            title="Listar Cliente"
            onPress={() => navigation.openDrawer()}
          />
          <View style={styles.viewStyled}>
            <Table listClients={loadClientes} />
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: '#ffffff',
  },
  HeadStyle: {
    height: 50,
    alignContent: 'center',
    backgroundColor: '#ffe0f0',
  },
  TableText: {
    textAlign: 'center',
  },
  TableBorder: {
    borderWidth: 1,
    borderColor: '#ffa1d2',
  },
  viewStyled: {
    marginLeft: 5,
    marginRight: 5,
  },
});
