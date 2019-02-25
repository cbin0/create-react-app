import _ from 'lodash'
import React from 'react'
import BaseComponent from '../base';
import Content from './content'
import Header from './header'
import Footer from './footer'
import MainToast from './main-toast'
import { inject, observer } from 'mobx-react'

@inject('root', 'route')
@observer
export default class Layout extends BaseComponent {

  constructor(...args) {
    super(...args)
    document.title = this.t('React Mobx Template')
  }

  onRouteChange() {
    console.log('on route change index')
  }

  render() {
    return  <div>
      <Header />
      <Content />
      <Footer />
    </div>
  }
}
