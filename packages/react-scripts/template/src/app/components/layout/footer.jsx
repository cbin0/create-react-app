import React from 'react'
import { inject, observer } from 'mobx-react'
import BaseComponent from '../base'
import { toJS } from 'mobx'

@inject('root')
@observer
export default class Foot extends BaseComponent {
  render() {
    return (
      <footer className="footer">
      </footer>
    )
  }

}
