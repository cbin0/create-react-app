import _ from 'lodash';
import { observable, toJS } from 'mobx';
import BaseStore from './base';

/**
 * 这个store是用来保存所有其他store的状态的
 */
export default class RootStore extends BaseStore {
  /**
   * 目前只有一个可观察的状态
   */
  @observable storeStatus = new Map()
  @observable lazy = {}

  constructor() {
    super();
    document.body.addEventListener('click', (e) => {
      this.focusElement = e.target;
    });
  }

  getStore(storeName) {
    this.setStore(storeName);
    return this.storeStatus.get(storeName);
  }

  setStore(storeName, state) {
    if (!this.storeStatus.has(storeName)) {
      this.storeStatus.set(storeName, {
        get fetching() {
          return _.chain(this)
            .keys()
            .without('fetching')
            .some(x => _.get(this, `[${x}].fetching`, false))
            .value();
        }
      });
    }
    if (!state) return;
    let storeState = this.storeStatus.get(storeName);
    let name = state.name;
    storeState[name] = _.extend({}, storeState[name], state);
    this.storeStatus.set(storeName, storeState);
  }

  isMouseIn(el, focusElement = this.focusElement) {
    if (el === focusElement) return el;
    return focusElement.parentElement ?
      this.isMouseIn(el, focusElement.parentElement) :
      false;
  }

  startFetching(storeName, state) {
    state.fetching = true;
    this.setStore(storeName, state);
    this.emit('store:fetching', state);
  }

  stopFetching(storeName, state) {
    state.fetching = false;
    this.setStore(storeName, state);
    this.emit('store:fetching', state);
  }

  isFocus(selector) {
    return this.isMouseIn(document.querySelector(selector));
  }

}
