import {api, source} from '../utils/axios';
import {showToastWithGravity} from '../utils/notifications/showToast';

type ClienteProps = {
  id?: number;
  nome: string;
  cpf: string;
  email: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
};

class Cliente {
  async createCliente({
    nome,
    cpf,
    email,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    uf,
  }: ClienteProps) {
    api
      .post('/clientes', {
        nome: nome,
        cpf: cpf,
        email: email,
        endereco: {
          cep: cep,
          rua: rua,
          numero: numero,
          bairro: bairro,
          cidade: cidade,
          uf: uf,
        },
      })
      .then(function () {
        showToastWithGravity('Cliente cadastrado com sucesso');
      })
      .catch(function (error) {
        console.log(error);
        return null;
      });
  }

  async getAllClientes() {
    return api
      .get('/clientes', {
        cancelToken: source.token,
      })
      .then(async response => {
        return response.data;
      })
      .catch(() => {
        showToastWithGravity('Houve um erro ao carregar a lista de Clientes');
        return null;
      });
  }

  async getAllClientesName(name: string) {
    return api
      .get(`/clientes?q=${name}`, {
        cancelToken: source.token,
      })
      .then(async response => {
        return response.data;
      })
      .catch(() => {
        showToastWithGravity('Houve um erro ao buscar o Cliente');
        return null;
      });
  }

  async deleteClient(idCliente: number) {
    return api
      .delete(`/clientes/${idCliente}`)
      .then(async () => {
        showToastWithGravity('Cliente apagado com Sucesso');
      })
      .catch(() => {
        showToastWithGravity('Houve um erro ao deletar o Cliente');
        return null;
      });
  }

  async putClient({
    id,
    nome,
    cpf,
    email,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    uf,
  }: ClienteProps) {
    var cliente = {
      nome: nome,
      cpf: cpf,
      email: email,
      endereco: {
        cep: cep,
        rua: rua,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
      },
    };
    api
      .put(`/clientes/${id}`, cliente)
      .then(function () {
        showToastWithGravity(`O Cliente: ${nome} foi alterado com sucesso`);
      })
      .catch(function (error) {
        console.log(error);
        return null;
      });
  }
}

export default new Cliente();
