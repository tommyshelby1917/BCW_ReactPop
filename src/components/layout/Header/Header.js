import './Header.css';

import { useContext } from 'react';
import classNames from 'classnames';
import Button from '../../common/Button/Button';
import AuthContext from '../../auth/context';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  const { isLogged, handleLogout } = useContext(AuthContext);
  return (
    <header className="header-main">
      <Link to="/">
        <h1>Logo</h1>
      </Link>
      <div className="menu-main">
        <h2>Item 1</h2>
        <h2>Item 2</h2>
      </div>
    </header>
  );
}

export default Header;
