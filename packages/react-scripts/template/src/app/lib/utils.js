import React, { lazy, Suspense } from 'react';
import stores from '@stores';
import { t } from '@lib/i18n';

const debug = require('debug')('client:lib:utils');
const util = require('util');

const obj2QlOpts = (obj) => {
  const str = util.inspect(obj, false, 10).slice(1, -1).replace(/'{1,}/img, '"');
  debug(`transfer ${JSON.stringify(obj)} => ${str}`);
  return str;
};

const createLazy = (name, load, Loading = <div>{t('loading....')}</div>) => {
  const actLoad = async () => {
    let config = stores.root.lazy[name] || {};
    config.loading = true;
    let res = await load();
    config.loading = false;
    return res;
  };
  const Lazy = lazy(actLoad);
  const component = props => {
    return (<Suspense fallback={Loading}><Lazy {...props} /></Suspense>);
  };
  if (name) {
    _.set(stores.root.lazy, `${name}.load`, actLoad);
    component.lazyName = name;
    component.lazyLoad = actLoad;
  }
  return component;
};

export {
  obj2QlOpts, createLazy
};
