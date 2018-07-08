import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import PropTypes from 'prop-types'
import Dashboard from './Dashboard'

class AppRouter extends React.Component {
  render () {
    const { url } = this.props
    return (
      <Switch>
        <Route
          exact
          path={`${url}`}
          component={Dashboard}
        />
      </Switch>
    )
  }
}

export default AppRouter