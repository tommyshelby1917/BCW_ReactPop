import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getLastestAdverts } from '../service';
import Button from '../../common/Button/Button';
import Layout from '../../layout/Layout';

import './AdvertsPage.css';

function AdvertsPage() {
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    getLastestAdverts().then((adverts) => setAdverts(adverts));
  }, []);

  return <Layout title="Lastest adverts"></Layout>;
}

export default AdvertsPage;
