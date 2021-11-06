import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { setAuthorizationHeader } from './api/client';
import storage from './utils/storage';

import './index.css';

const accesToken = storage.get('auth');
setAuthorizationHeader(accesToken);

ReactDOM.render(
  <React.StrictMode>
    <App isInitiallyLogged={!!accesToken} />
  </React.StrictMode>,
  document.getElementById('root')
);
