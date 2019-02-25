import React from 'react'
import BaseComponent from '../base'
import { inject, observer } from 'mobx-react'
import {
  Icon, Button, Picker, List
} from 'antd-mobile'
import { Link } from "react-router-dom"

export default class Filter extends BaseComponent {

  onChange(v) {
    if (this.props.onChange) {
      this.props.onChange(...v)
    }
  }

  onOk(v) {
    if (this.props.onOk) {
      this.props.onOk(...v)
    }
  }

  render() {
    return <div className="base-filter">
      <Picker
        data={this.props.data}
        title={this.props.title}
        cols={1}
        extra={this.t('全部')}
        value={this.props.value}
        onChange={this.onChange.bind(this)}
        onOk={this.onOk.bind(this)}
      >
        <List.Item arrow="horizontal">{this.props.name}</List.Item>
      </Picker>
    </div>
  }

}
