import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../../api/client';

import storage from '../../utils/storage';

export const login = async (credentials) => {
  return client.post('api/auth/login', credentials).then(({ accesToken }) => {
    setAuthorizationHeader(accesToken);
    storage.set('auth', accesToken);
  });
};

export const logout = () =>
  Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove('auth');
  });
