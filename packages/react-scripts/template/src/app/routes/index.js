import { lazy } from 'react';
import { createLazy } from '@lib/utils';

const Home = createLazy(lazy(() => {
  return import(
    /* webpackChunkName: "home" */
    /* webpackMode: "eager" */
    './home');
}), undefined, true);


export default [
  { path: '/', exact: true, component: Home }
];
