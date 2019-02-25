const debug = require('debug')('client:lib:utils');
const util = require('util');

export const obj2QlOpts = (obj) => {
  const str = util.inspect(obj, false, 10).slice(1, -1).replace(/'{1,}/img, '"');
  debug(`transfer ${JSON.stringify(obj)} => ${str}`);
  return str;
}