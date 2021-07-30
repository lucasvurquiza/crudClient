import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootDrawerParamList} from '../../routes';
import {Header} from '../../components/Header';
import {Table} from '../../components/Table';
import Cliente from '../../api/Cliente';
import {Container} from '../../style/Container';
import {Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const [searchQuery, setSearchQuery] = useState('');

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

  const searchWithName = async () => {
    const response = await Cliente.getAllClientesName(searchQuery);
    setLoadClientes(response);
  };

  const fetchAllCliente = async () => {
    const response = await Cliente.getAllClientes();
    setLoadClientes(response);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <Header
            title="Listar Cliente"
            onPress={() => navigation.openDrawer()}
          />
          <View style={styles.viewStyled}>
            <View style={styles.searchAndRefresh}>
              <Searchbar
                placeholder="Search"
                onChangeText={query => setSearchQuery(query)}
                onEndEditing={() => searchWithName()}
                onIconPress={() => searchWithName()}
                style={styles.searchbarStyled}
                value={searchQuery}
              />
              <Icon.Button
                name="refresh"
                size={20}
                color="#000"
                backgroundColor={'transparent'}
                onPress={() => fetchAllCliente()}
              />
            </View>
            <Table listClients={loadClientes} />
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewStyled: {
    marginLeft: 5,
    marginRight: 5,
  },
  searchAndRefresh: {
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchbarStyled: {
    width: '90%',
  },
});
