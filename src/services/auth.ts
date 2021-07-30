import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOKEN_KEY = '@CrudClient:token';

export const onSignIn = () => AsyncStorage.setItem(TOKEN_KEY, 'true');
export const onSignOut = () => AsyncStorage.removeItem(TOKEN_KEY);

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return token !== null ? true : false;
};
