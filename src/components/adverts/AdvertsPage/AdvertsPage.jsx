import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getLastestAdverts } from '../service';
import Button from '../../common/Button/Button';
import Layout from '../../layout/Layout';

import './AdvertsPage.css';

const EmptyList = () => (
  <div className="emptylistContainer">
    <p>Create your first advert!</p>
    <Button as={Link} to="/advert/new">
      New Advert
    </Button>
  </div>
);

function AdvertsPage() {
  const [adverts, setAdverts] = useState([]);

  // Esto es el ciclo de vida del componente. Cuando se arranca hacemos lo siguiente.
  useEffect(() => {
    getLastestAdverts().then((adverts) => setAdverts(adverts));
  }, []); // Como hay una array vacia, solo se arranca una vez

  return (
    <Layout title="Lastest adverts">
      <div className="advertsPage">
        {adverts.length ? (
          <div className="advertsList-main">
            {adverts.map(({ id, ...advert }) => (
              <li key={id}>
                <Link to={`/adverts/${id}`}>{advert.name}</Link>
              </li>
            ))}
          </div>
        ) : (
          <EmptyList />
        )}
      </div>
    </Layout>
  );
}

export default AdvertsPage;
