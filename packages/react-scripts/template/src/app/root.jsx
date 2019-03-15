import React from 'react';
import { Provider } from 'mobx-react';
import stores from '@stores';
import Layout from './components/layout/index';

export default (
  <Provider {...stores} >
    <Layout />
  </Provider>
);
