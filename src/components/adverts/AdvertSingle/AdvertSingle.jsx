import React, { useState, useEffect, useCallback, Fragment } from 'react';
import classNames from 'classnames';
import { Redirect, useLocation, useParams } from 'react-router';
import Layout from '../../layout/Layout';

import { getSingleAdvert } from '../service';

import './AdvertSingle.css';

import noImage from '../../../public/images/noimage.jpeg';

const useGetData = (getData) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData().then((data) => setData(data));

    return () => {
      console.log(getData);
    };
  }, [getData]);

  return data;
};

const useAdvert = (advertId) => {
  const fixedGetAdvert = useCallback(
    () => getSingleAdvert(advertId),
    [advertId]
  );
  const advert = useGetData(fixedGetAdvert);
  return advert;
};

function AdvertSingle() {
  const { advertId } = useParams();
  const advert = useAdvert(advertId);
  const backend = process.env.REACT_APP_API_BASE_URL;

  return (
    <Layout title="Single Advert">
      <div className="singleAdvert">
        {advert && (
          <Fragment>
            <div className="advertTitleContainer">
              <h2>{advert.name}</h2>
            </div>
            <div className="advertSaleContainer">
              <h2>{advert.sale ? 'I want sell!' : 'I want buy'}</h2>
            </div>
            <div className="advertPriceContainer">
              <h2>{advert.price}</h2>
            </div>
            <div className="advertTagsContainer">
              <h2>{advert.tags || 'There are no tags'}</h2>
            </div>
            <div className="advertImageContainer">
              <img
                src={advert.photo ? `${backend}${advert.photo}` : noImage}
                alt=""
                width="300"
              />
            </div>
          </Fragment>
        )}
      </div>
    </Layout>
  );
}

export default AdvertSingle;
