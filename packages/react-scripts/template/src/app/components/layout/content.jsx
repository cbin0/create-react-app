import React, { Suspense } from 'react';
import stores from '@stores';
import {
  Router, Route, Switch
} from 'react-router-dom';
import BaseComponent from '../base';
import routes from '../../routes/index';

export default class Content extends BaseComponent {
  render() {
    return (
      <Router history={stores.route.history}>
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            {_.map(routes, (props, k) => {
              return <Route key={k} {...props} />;
            })}
            {/* <Redirect to="/" /> */}
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
