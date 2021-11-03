import client from '../../api/client';

export const getLastestAdverts = () => {
  const url = '/api/v1/adverts';
  return client.get(url);
};

export const getSingleAdvert = (id) => {
  const url = `/api/v1/adverts/${id}`;
  return client.get(url);
};
