import React from 'react';
import { inject, observer } from 'mobx-react';
import BaseComponent from '../base';

@inject('route', 'root')
@observer
export default class Header extends BaseComponent {
  render() {
    return (<div className="header" />);
  }
}
