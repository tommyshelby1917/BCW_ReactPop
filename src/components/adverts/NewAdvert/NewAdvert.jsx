import React, { useState, useEffect, useRef, Fragment } from 'react';
import classNames from 'classnames';
import Layout from '../../layout/Layout';
import Button from '../../common/Button/Button';
import FormField from '../../common/FormField/FormField';
import SelectTags from '../NewAdvert/SelectTags';
import { newPostApi } from '../service';
import { Redirect, useHistory } from 'react-router';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';

function NewAdvert() {
  const history = useHistory();
  const formData = new FormData();
  const [createdPostId, setCreatedPostId] = useState('');

  const [value, setValue] = useState({
    name: '',
    sale: false,
    tags: [],
    price: 0,
  });

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setValue((prevState) => ({
      ...prevState,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    }));
  };

  const handleTags = (event) => {
    if (!value.tags.includes(event.target.textContent)) {
      setValue((prevState) => ({
        ...prevState,
        tags: [...prevState.tags, event.target.textContent],
      }));
    }
  };

  const handlePhoto = (event) => {
    formData.set('photo', event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    for (const [key, valor] of Object.entries(value)) {
      formData.append(key, valor);
    }

    try {
      const createdPost = await newPostApi(formData);
      setCreatedPostId(createdPost.id);
    } catch (error) {
      if (error.status === 401) {
        return history.push('/login');
      }
      setError(error.message);
    }
  };

  const validate =
    value.name !== '' && value.tags.length > 0 && value.price > 0;

  if (createdPostId) {
    return <Redirect to={`/adverts/${createdPostId}`} />;
  }

  return (
    <Layout title="Create advert!">
      <Fragment>
        <div className="createNew-container">
          <form onSubmit={handleSubmit}>
            <FormField
              type="text"
              name="name"
              label="name"
              className="newAdvert-field"
              value={value.name}
              onChange={handleChange}
            ></FormField>
            <FormField
              type="checkbox"
              name="sale"
              label="sale"
              className="newAdvert-field"
              value={value.sale}
              onChange={handleChange}
            ></FormField>
            <SelectTags click={handleTags} />
            <FormField
              type="number"
              name="price"
              label="price"
              className="newAdvert-field"
              value={value.price}
              onChange={handleChange}
            ></FormField>
            <FormField
              type="file"
              name="photo"
              label="photo"
              onChange={handlePhoto}
            />
            <Button disabled={!validate} type="submit">
              Create advert!
            </Button>
          </form>
          {error && <ErrorMessage error={error} />}
        </div>
      </Fragment>
    </Layout>
  );
}

export default NewAdvert;
