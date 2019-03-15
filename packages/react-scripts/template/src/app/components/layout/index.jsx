import React from 'react';
import { inject, observer } from 'mobx-react';
import BaseComponent from '../base';
import Content from './content';
import Header from './header';
import Footer from './footer';

@inject('root', 'route')
@observer
export default class Layout extends BaseComponent {
  constructor(...args) {
    super(...args);
    document.title = this.t('React Mobx Template');
  }

  onRouteChange() {
    console.log('on route change index');
  }

  render() {
    return (<div>
      <Header />
      <Content />
      <Footer />
    </div>);
  }
}
