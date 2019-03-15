import { Component } from 'react';
import { t } from '@lib/i18n';
import debug from 'debug';

export default class BaseComponent extends Component {
  constructor(props, context) {
    super(props, context);
    if (this.props.route) {
      this.unsubscribe = this.props.route.history.subscribe((location, action) => {
        setTimeout(() => {
          if (!this.unmounted) this.onRouteChange(location, action);
        }, 50);
      });
    }
  }

  componentWillUnmount() {
    this.debug('componentWillUnmount');
    this.unmounted = true;
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  get debug() {
    return debug(`client::Component::${this.constructor.name}`);
  }

  unmounted = false
  unsubscribe

  onRouteChange(location, action) { // eslint-disable-line
  }

  t = t.bind(this)
}
