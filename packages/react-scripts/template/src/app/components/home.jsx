import React from 'react'
import BaseComponent from './base'
import Article from './layout/article'
import { inject, observer } from 'mobx-react'

@inject( 'route', 'root')
@observer
export default class Home extends BaseComponent {

  onRouteChange() {
    this.debug('route change, getting data')
  }

  render() {
    return <div>{this.t('This is Home.')}</div>
  }

}
