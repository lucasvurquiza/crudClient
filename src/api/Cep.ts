import axios from 'axios';

const source = axios.CancelToken.source();

class Cep {
  async getCepApi(cep: string) {
    return axios
      .get(`https://viacep.com.br/ws/${cep}/json`, {
        cancelToken: source.token,
      })
      .then(async response => {
        const data = response.data;
        return data;
      })
      .catch(() => {
        return null;
      });
  }
}

export default new Cep();
