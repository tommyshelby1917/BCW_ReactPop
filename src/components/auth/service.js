import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../../api/client';

import storage from '../../utils/storage';

// export const login = async (data) => {
//   const credentials = { email: data.email, password: data.password };
//   const { accesToken } = await client.post('api/auth/login', credentials);
//   console.log(accesToken);
//   setAuthorizationHeader(accesToken);
//   storage.set('auth', accesToken, data.remember);
// };

export const login = (data) => {
  console.log(data.remember);
  const credentials = { email: data.email, password: data.password };
  return client.post('api/auth/login', credentials).then(({ accessToken }) => {
    console.log(data.remember);
    setAuthorizationHeader(accessToken);
    storage.set('auth', accessToken, data.remember);
  });
};

export const logout = () =>
  Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove('auth');
  });
