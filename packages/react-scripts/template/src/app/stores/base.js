import _ from 'lodash'
import QS from 'querystring'
import URL from 'url'
import { EventEmitter } from 'events'
import { observable, computed } from 'mobx'
import stores from '@stores'
import debug from 'debug'
import axios from 'axios'

const http = axios.create({
  baseURL: '/api/',
  // headers: {'X-Auth-Token': token}
})

export default class BaseStore extends EventEmitter {
  http = http

  constructor() {
    super()
    this.listArgs = {}
  }

  get myStatus() {
    let name = this.constructor.name
    return stores.root.getStore(name)
  }

  @computed get fetching() {
    return !!_.get(this.myStatus, `fetching`, false)
  }

  get debug() {
    return debug(`client::Store::${this.constructor.name}`)
  }

}
