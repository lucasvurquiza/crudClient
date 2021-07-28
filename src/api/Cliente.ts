import {api, source} from '../utils/axios';

type ClienteProps = {
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
        console.log('Cadastrado com Sucesso');
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
        console.log('Deu ruim');
        return null;
      });
  }
}

export default new Cliente();
