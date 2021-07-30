import React from 'react';
import {DataTable} from 'react-native-paper';
import {ResponseProps} from '../../screens/ListClients';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Alert, StyleSheet} from 'react-native';
import Cliente from '../../api/Cliente';
import {useNavigation} from '@react-navigation/native';

type Props = {
  listClients: ResponseProps[];
};

export const Table = (props: Props) => {
  const {listClients} = props;

  const navigation = useNavigation();

  const alertExcludeClient = (nameClient: string, idClient: number) =>
    Alert.alert(
      `Excluir cliente: ${nameClient}`,
      'Você tem certeza que deseja exluir?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            await Cliente.deleteClient(idClient);
          },
        },
      ],
    );

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={styles.textStyled}>Nome</DataTable.Title>
        <DataTable.Title style={styles.textStyled}>CPF</DataTable.Title>
        <DataTable.Title style={styles.textStyled}>E-mail</DataTable.Title>
        <DataTable.Title style={styles.textStyled}>Cidade</DataTable.Title>
        <DataTable.Title style={styles.textStyled}>Excluir</DataTable.Title>
        <DataTable.Title style={styles.textStyled}>Editar</DataTable.Title>
      </DataTable.Header>

      {listClients.map((client: ResponseProps) => (
        <DataTable.Row key={client.id}>
          <DataTable.Cell style={styles.textStyled}>
            {client.nome}
          </DataTable.Cell>
          <DataTable.Cell style={styles.textStyled}>
            {client.cpf}
          </DataTable.Cell>
          <DataTable.Cell style={styles.textStyled}>
            {client.email}
          </DataTable.Cell>
          <DataTable.Cell style={styles.textStyled}>
            {client.endereco.cidade}
          </DataTable.Cell>
          <DataTable.Cell style={styles.textStyled}>
            {
              <Icon.Button
                name="delete"
                size={20}
                color="#000"
                backgroundColor={'transparent'}
                onPress={() => alertExcludeClient(client.nome, client.id)}
              />
            }
          </DataTable.Cell>
          <DataTable.Cell style={styles.textStyled}>
            {
              <Icon.Button
                name="account-edit"
                size={20}
                color="#000"
                backgroundColor={'transparent'}
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [
                      {name: 'CreateClient', params: {editClient: client}},
                    ],
                  });
                }}
              />
            }
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

const styles = StyleSheet.create({
  textStyled: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
