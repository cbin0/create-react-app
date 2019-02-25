import _ from 'lodash'
import RootStore from './root'
import RouterStore from './route'

let stores = {
  root: new RootStore(),
  route: new RouterStore()
}

export default stores

_.map(stores, x => {
  if (x.autorun) x.autorun.call(x)
})

