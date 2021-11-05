import client from '../../api/client';

export const getLastestAdverts = () => {
  const url = '/api/v1/adverts';
  return client.get(url);
};

export const getSingleAdvert = (id) => {
  const url = `/api/v1/adverts/${id}`;
  return client.get(url);
};

export const requestTagsToAPI = () => {
  const url = '/api/v1/adverts/tags';
  return client.get(url);
};

export const newPostApi = (data, config) => {
  const url = '/api/v1/adverts';
  return client.post(url, data, config);
};
