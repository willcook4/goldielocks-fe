import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'redux-zero/react'
import actions from './redux/actions'
import Login from './routes/Login'
import Register from './routes/Register'
import Homepage from './routes/Homepage'
import FourOhFour from './routes/FourOhFour'
import App from './routes/protectedRoutes/App'

const PublicRoutes = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path='/'
          component={Homepage}
        />
        <Route
          exact
          path={'/login'}
          component={Login}
        />
        <Route
          exact
          path={'/register'}
          component={Register}
        />
        <RestrictedRoute
          path='/dashboard'
          component={App}
          isLoggedIn={isLoggedIn}
        />
        <Route component={FourOhFour} />
      </Switch>
    </Router>
  )
}

const RestrictedRoute = ({component: Component, isLoggedIn, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => isLoggedIn ?
        (<Component {...props} />) :
        (<Redirect to={{pathname: '/', state: {from: props.location }}} />)}
    />
  )
}

const mapToProps = ({ isLoggedIn }) => ({
  isLoggedIn
})
export default connect(mapToProps, actions)(PublicRoutes)
