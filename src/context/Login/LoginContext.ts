import {createContext} from 'react';

interface ILoginContext {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

export const LoginContext = createContext({} as ILoginContext);
