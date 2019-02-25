import React from 'react'
import BaseComponent from '../base'
import BaseFilter from './base'
import { inject, observer } from 'mobx-react'
import {
  Icon, Button, List
} from 'antd-mobile'
import { Link } from "react-router-dom"

@inject('product')
@observer
export default class Line extends BaseComponent {

  componentWillMount() {
    this.props.product.queryLines()
  }

  render() {
    let lines = [{
      label: this.t('全部'),
      value: null
    }, ...this.props.product.lines.map((x) => {
      return {
        label: x.name,
        value: x.id,
      }
    })]
    return <BaseFilter
      data={lines}
      title={this.t('选择产品线')}
      value={this.props.value}
      name={this.t('产品线')}
      onChange={this.props.onChange}
      onOk={this.props.onOk} />
  }

}
