import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Redirect, useHistory } from 'react-router';

import { getFilteredAdverts } from '../service';

import Button from '../../common/Button/Button';
import Layout from '../../layout/Layout';
import FormField from '../../common/FormField/FormField';
import SelectTags from '../NewAdvert/SelectTags';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';

import './FilterAdvert.css';
import { array } from 'prop-types';

function FilterAdvert() {
  const history = useHistory();

  const [adverts, setAdverts] = useState(null);
  const [value, setValue] = useState({
    name: '',
    sale: false,
    tags: [],
    priceMin: 0,
    priceMax: 0,
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
    let tags = value.tags;
    const selected = event.target.textContent;

    tags.includes(selected)
      ? (tags = tags.filter((e) => e !== selected))
      : tags.push(selected);

    setValue((prevState) => ({
      ...prevState,
      tags,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let params = '';
    const name = value.name;
    const sale = value.sale;
    const priceMin = value.priceMin;
    const priceMax = value.priceMax;
    let tags = value.tags;
    let tagsParams = '';

    priceMin > 0 && priceMax > priceMin
      ? (params = `name=${name}&sale=${sale}&price=${priceMin}&price=${priceMax}`)
      : (params = `name=${name}&sale=${sale}`);

    switch (tags.length) {
      case 1:
        tagsParams = `&tags=${tags[0]}`;
        break;
      case 2:
        tagsParams = `&tags=${tags[0]}&tags=${tags[1]}`;
        break;
      case 3:
        tagsParams = `&tags=${tags[0]}&tags=${tags[1]}&tags=${tags[2]}`;
        break;
      case 4:
        tagsParams = `&tags=${tags[0]}&tags=${tags[1]}&tags=${tags[2]}&tags=${tags[3]}`;
    }

    params = `${params}${tagsParams}`;

    try {
      const collectedAds = await getFilteredAdverts(params);
      setAdverts(collectedAds);
    } catch (error) {
      if (error.status === 401) {
        return history.push('/login');
      }
      setError(error.message);
    }
  };

  if (value.priceMin > value.priceMax) {
    setValue((prevState) => ({
      ...prevState,
      priceMax: value.priceMin,
    }));
  }

  return (
    <div className="filteradvert-container">
      <div className="filteradvert-form-container">
        <form onSubmit={handleSubmit}>
          <FormField
            type="text"
            name="name"
            label="name"
            className="filterAdvert-field"
            value={value.name}
            onChange={handleChange}
          ></FormField>
          <FormField
            type="checkbox"
            name="sale"
            label="sale"
            className="filterAdvert-field"
            value={value.sale}
            onChange={handleChange}
          ></FormField>
          <SelectTags click={handleTags} />
          <FormField
            type="number"
            name="priceMin"
            label="Price min."
            className="filterAdvert-field"
            value={value.priceMin}
            onChange={handleChange}
          ></FormField>
          <FormField
            type="number"
            name="priceMax"
            label="Price max."
            className="filterAdvert-field"
            value={value.priceMax}
            onChange={handleChange}
          ></FormField>
          <Button type="submit">Search</Button>
        </form>
      </div>
      <div className="results-container">
        {adverts ? (
          <div className="advertsList-main">
            {adverts.map(({ id, ...advert }) => (
              <div key={id} className="advertList-item">
                <Link to={`/adverts/${id}`}>
                  <Fragment>
                    <div className="advertTitleContainer">
                      <h2>{advert.name}</h2>
                    </div>
                    <div className="advertSaleContainer">
                      <h2>{advert.sale ? 'I want sell!' : 'I want buy!'}</h2>
                    </div>
                    <div className="advertPriceContainer">
                      <h2>{advert.price}</h2>
                    </div>
                    <div className="advertTagsContainer">
                      <h2>{advert.tags || 'NO TAGS'}</h2>
                    </div>
                  </Fragment>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <h2>No adverts found!</h2>
        )}
      </div>
      {error && <ErrorMessage error={error} />}
    </div>
  );
}

export default FilterAdvert;
