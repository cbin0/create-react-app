import React, { Suspense } from 'react';

const debug = require('debug')('client:lib:utils');
const util = require('util');

const obj2QlOpts = (obj) => {
  const str = util.inspect(obj, false, 10).slice(1, -1).replace(/'{1,}/img, '"');
  debug(`transfer ${JSON.stringify(obj)} => ${str}`);
  return str;
};

const createLazy = (Lazy, Loading = <div>loading....</div>, isReturnFunc = false) => {
  if (!isReturnFunc) { return (<Suspense fallback={Loading}><Lazy /></Suspense>); }
  return props => {
    return (<Suspense fallback={Loading}><Lazy {...props} /></Suspense>);
  };
};

export {
  obj2QlOpts, createLazy
};
