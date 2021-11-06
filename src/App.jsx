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
import AdvertSingle from './components/adverts/AdvertSingle/AdvertSingle';
import NewAdvert from './components/adverts/NewAdvert/NewAdvert';
import Page404 from './components/page404/Page404';

import { AuthContextProvider } from './components/auth/context';
import PrivateRoute from './components/auth/PrivateRoute';

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
            <PrivateRoute path="/adverts/new">
              <NewAdvert />
            </PrivateRoute>
            <PrivateRoute path="/adverts/:advertId">
              {(routeProps) => <AdvertSingle {...routeProps} />}
            </PrivateRoute>
            <PrivateRoute path="/adverts">
              <AdvertsPage />
            </PrivateRoute>
            <Route exact path="/">
              <Redirect to="/adverts" />
            </Route>
            <PrivateRoute path="/404">
              <Page404 />
            </PrivateRoute>
            <Route>
              <Redirect to="/404" />
            </Route>
          </Switch>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
