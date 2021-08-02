import {api, source} from '../utils/axios';
import {showToastWithGravity} from '../utils/notifications/showToast';

class Login {
  async signinLogin(email: string, password: string) {
    return api
      .get(`/usuarios?email=${email}&password=${password}`, {
        cancelToken: source.token,
      })
      .then(async response => {
        if (response.data.length === 0) {
          return false;
        } else {
          return true;
        }
      })
      .catch(() => {
        showToastWithGravity('Houve um erro ao realizar o Login');
        return null;
      });
  }
}

export default new Login();
