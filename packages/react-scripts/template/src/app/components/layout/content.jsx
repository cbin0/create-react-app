import React from 'react'
import stores from '@stores'
import BaseComponent from '../base'
import Home from '../home'
import {
  Router, Redirect,
  Route, Switch
} from 'react-router-dom'

export default class Content extends BaseComponent {
  render() {
    return (
      <Router history={stores.route.history}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Redirect to='/' />
        </Switch>
      </Router>
    )
  }
}