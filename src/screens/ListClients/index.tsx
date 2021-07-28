import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootDrawerParamList} from '../../routes';
import Header from '../../components/Header';
import {Container} from '../../style/Container';
import {DataTable} from 'react-native-paper';
import {useEffect} from 'react';
import Cliente from '../../api/Cliente';

type ResponseProps = {
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
};

export const ListClients = () => {
  const [loadClientes, setLoadClientes] = useState([]);

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
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <Header
            title="Listar Cliente"
            onPress={() => navigation.openDrawer()}
          />
          <View style={styles.viewStyled}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Nome</DataTable.Title>
                <DataTable.Title>CPF</DataTable.Title>
                <DataTable.Title>Email</DataTable.Title>
                <DataTable.Title>Cidade</DataTable.Title>
              </DataTable.Header>

              {loadClientes.map((cliente: ResponseProps) => {
                <DataTable.Row>
                  <DataTable.Cell>{cliente.nome}</DataTable.Cell>
                  <DataTable.Cell>{cliente.cpf}</DataTable.Cell>
                  <DataTable.Cell>{cliente.email}</DataTable.Cell>
                  <DataTable.Cell>{cliente.endereco.cidade}</DataTable.Cell>
                </DataTable.Row>;
              })}
            </DataTable>
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
