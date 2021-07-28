import axios from 'axios';
import {BASE_URL} from './urls';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const source = axios.CancelToken.source();

export {api, source};
