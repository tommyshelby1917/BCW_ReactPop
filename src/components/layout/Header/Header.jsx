import './Header.css';

import { useContext } from 'react';
import classNames from 'classnames';
import AuthContext from '../../auth/context';
import { Link, NavLink } from 'react-router-dom';

import Button from '../../common/Button/Button';
import LogoutButton from '../../common/LogoutButton/LogoutButton';
import Logo from '../../../public/images/logo.png';

function Header() {
  const { isLogged, handleLogout } = useContext(AuthContext);
  return (
    <header className="header-container">
      <Link to="/">
        <img src={Logo} alt="" width="100" />
      </Link>
      <div className="menu-container">
        <Button className="newpost-button" as={Link} to="/adverts/new">
          New Post
        </Button>
      </div>
      <div className="loguser-container">{isLogged && <LogoutButton />}</div>
    </header>
  );
}

export default Header;
