import React from 'react';
import { render } from 'react-dom';

import { Routes } from './Routes';
import * as serviceWorker from './serviceWorker';
import './index.css';

render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
