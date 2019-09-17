import _ from 'lodash';
import qs from 'query-string';
import { createBrowserHistory as createHistory } from 'history';
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router';
import stores from '@stores';

export default class RouterStore extends BaseRouterStore {
  history = syncHistoryWithStore(createHistory(), this)

  getSearch(name, defaultValue) {
    return _.get(qs.parse(this.location.search), name, defaultValue);
  }

  async goto(opt) {
    let { search, replace, route, action, lazy } = _.extend({
      search: {}, replace: true, route: '/', action: 'push'
    }, opt);
    let pathname = route || this.location.pathname;
    let curSearch = qs.parse(this.location.search);
    let mergedSearch = `?${qs.stringify({ ...(replace ? {} : curSearch), ...search })}`;
    if (
      pathname === this.location.pathname &&
      mergedSearch === this.location.search
    ) {
      return;
    }
    if (lazy) {
      await stores.root.lazy[lazy]?.load?.();
    }
    this.history[action]({
      pathname,
      search: mergedSearch
    });
  }
}
