import React from 'react';
import {DataTable} from 'react-native-paper';
import {ResponseProps} from '../../screens/ListClients';

type Props = {
  listClients: ResponseProps[];
};

export const Table = (props: Props) => {
  const {listClients} = props;

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Nome</DataTable.Title>
        <DataTable.Title>CPF</DataTable.Title>
        <DataTable.Title>E-mail</DataTable.Title>
        <DataTable.Title>Cidade</DataTable.Title>
      </DataTable.Header>

      {listClients.map((client: ResponseProps) => (
        <DataTable.Row onPress={() => console.log(client.id)} key={client.id}>
          <DataTable.Cell>{client.nome}</DataTable.Cell>
          <DataTable.Cell>{client.cpf}</DataTable.Cell>
          <DataTable.Cell>{client.email}</DataTable.Cell>
          <DataTable.Cell>{client.endereco.cidade}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};
