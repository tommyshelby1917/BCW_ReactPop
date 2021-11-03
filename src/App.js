import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';
import { logout } from './components/auth/service';

import LoginPage from './components/auth/LoginPage/LoginPage';
import AdvertsPage from './components/adverts/AdvertsPage/AdvertsPage';

import { AuthContextProvider } from './components/auth/context';

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    logout().then(() => setIsLogged(false));
  };

  return (
    <Router>
      <AuthContextProvider value={{ isLogged, handleLogout, handleLogin }}>
        <div className="App">
          <Switch>
            <Route path="/login">
              {(routeProps) => <LoginPage {...routeProps} />}
            </Route>
            <Route path="/adverts">
              <AdvertsPage />
            </Route>
            <Route exact path="/">
              <Redirect to="/adverts" />
            </Route>
          </Switch>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
