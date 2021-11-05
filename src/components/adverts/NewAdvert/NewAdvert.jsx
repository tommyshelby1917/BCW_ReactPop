import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Layout from '../../layout/Layout';
import Button from '../../common/Button/Button';
import FormField from '../../common/FormField/FormField';
import SelectTags from '../NewAdvert/SelectTags';
import { newPostApi } from '../service';
import { Redirect, useHistory } from 'react-router';

function NewAdvert() {
  const history = useHistory();
  const formData = new FormData();

  const [value, setValue] = useState({
    name: '',
    sale: false,
    tags: [],
    price: 0,
    photo: null,
  });

  const handleChange = (event) => {
    console.log(value.photo);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    for (const [key, valor] of Object.entries(value)) {
      formData.append(key, valor);
    }

    if (!value.photo) {
      formData.delete('photo');
    }

    try {
      const createdPost = await newPostApi(formData);
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        return history.push('/login');
      }
    }
  };

  return (
    <Layout title="Create advert!">
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
          <FormField type="file" name="photo" label="photo" />
          <Button type="submit">Create advert!</Button>
        </form>
      </div>
    </Layout>
  );
}

export default NewAdvert;
