import { createLazy } from '@lib/utils';

const Home = createLazy('home', () => import(/* webpackChunkName: "home" */ /* webpackMode: "eager" */'./home'));

export default [
  { path: '/', exact: true, component: Home }
];
