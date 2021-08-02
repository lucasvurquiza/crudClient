import React, {useState} from 'react';
import {Loading} from '../../components/Loading';
import {LoginContext} from './LoginContext';

export const LoginProvider: React.FC = ({children}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        setIsLogin,
        setLoading,
      }}>
      {loading === true && <Loading />}
      {children}
    </LoginContext.Provider>
  );
};
