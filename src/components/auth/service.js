import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../../api/client';

import storage from '../../utils/storage';

export const login = async (data) => {
  const credentials = { email: data.email, password: data.password };
  const token = await client.post('api/auth/login', credentials);
  setAuthorizationHeader(token);
  if (data.remember) {
    storage.set('auth', token);
  }
};

export const logout = () =>
  Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove('auth');
  });
