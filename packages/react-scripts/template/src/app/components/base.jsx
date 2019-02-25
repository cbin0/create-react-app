import React from 'react'
import qs from 'query-string'
import { Component } from 'react'
import { t } from '@lib/i18n'
import debug from 'debug'
import classNames from 'classnames'

export default class BaseComponent extends Component {
  unmounted = false
  unsubscribe
  t = t.bind(this)
  get debug() {
    return debug(`client::Component::${this.constructor.name}`)
  }

  constructor(props, context) {
    super(props, context)
    if (this.props.route) {
      this.unsubscribe = this.props.route.history.subscribe((location, action) => {
        setTimeout(() => {
          if (!this.unmounted) this.onRouteChange(location, action)
        }, 50)
      })
    }
  }

  onRouteChange(location, action) {
  }

  componentWillUnmount() {
    this.debug('componentWillUnmount')
    this.unmounted = true
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }
}
