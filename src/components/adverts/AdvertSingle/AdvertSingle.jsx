import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Redirect, useLocation, useParams } from 'react-router';
import Layout from '../../layout/Layout';

import { getSingleAdvert } from '../service';

import './AdvertSingle.css';

function AdvertSingle() {
  const [advert, setAdvert] = useState(null);
  const { advertId } = useParams();

  React.useEffect(() => {
    const petition = getSingleAdvert(advertId)
      .then((advert) => setAdvert(advert))
      .catch((error) => console.log(error));
  });

  return (
    <Layout title="Single Advert">
      <div className="single-tuit">{JSON.stringify(advert)}</div>
    </Layout>
  );
}

export default AdvertSingle;
