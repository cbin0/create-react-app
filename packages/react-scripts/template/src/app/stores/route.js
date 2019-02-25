import _ from 'lodash'
import qs from 'query-string'
import { History } from 'history'
import createHistory from 'history/createBrowserHistory'
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router'

export default class RouterStore extends BaseRouterStore {

  history = syncHistoryWithStore(createHistory(), this)

  constructor() {
    super()
  }

  getSearch(name, defaultValue) {
    return _.get(qs.parse(this.location.search), name, defaultValue)
  }

  goto(opt) {
    let { search, replace, route } = _.extend({
      search: {}, replace: true, route: '/'
    }, opt)
    let pathname = route || this.location.pathname
    let curSearch = qs.parse(this.location.search)
    let mergedSearch = `?${qs.stringify({ ...(replace ? {} : curSearch), ...search })}`
    if (
      pathname === this.location.pathname &&
      mergedSearch === this.location.search
    ) {
      return
    }
    this.history.push({
      pathname: pathname,
      search: mergedSearch
    })
  }
}
