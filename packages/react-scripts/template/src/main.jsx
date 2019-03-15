import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'bluebird';
import { AppContainer } from 'react-hot-loader';
import '@styles/structure.less';
import '@styles/app.less';
import Root from './app/root';
import ErrorBoundary from './errorBoundary';

let render = () => {
  ReactDOM.render(
    <ErrorBoundary><AppContainer>{Root}</AppContainer></ErrorBoundary>,
    document.getElementById('root')
  );
};

render();

if (module.hot) {
  module.hot.accept('./app/root', () => render());
}

Promise.config({
  cancellation: true
});
