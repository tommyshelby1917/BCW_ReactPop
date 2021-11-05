import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Layout from '../../layout/Layout';
import Button from '../../common/Button/Button';
import FormField from '../../common/FormField/FormField';
import SelectField from '../../common/FormField/SelectField';
import SelectTags from '../NewAdvert/SelectTags';

function NewAdvert() {
  const [value, setValue] = useState({
    name: '',
    sell: false,
    tags: [],
    price: 0,
    photo: null,
  });

  const handleChange = (event) => {
    console.log(value);
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

  const handleSubmit = async event => {
    event.preventDefault();
    const createdPost = await 
  }

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
            name="sell"
            label="sell"
            className="newAdvert-field"
            value={value.sell}
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
          <Button>Create advert!</Button>
        </form>
      </div>
    </Layout>
  );
}

export default NewAdvert;
