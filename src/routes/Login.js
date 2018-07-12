import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'redux-zero/react'
import actions from '../redux/actions'
import Api from '../lib/api'
import notification from '../components/notifications/notifications'
import {Input as CustomInput} from '../components/input/input'
import Wrapper from './Login.styles.js'
import Header from '../components/Header'
import Icon from '../components/icons'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPasswd: false,
      errors: {
        email: null,
        password: null
      }
    }

    // Refs
    this.passwordRef = React.createRef()
    this.emailRef = React.createRef()
    this.sampleRef = React.createRef()

    this.clearError = this.clearError.bind(this)
  }

  clearError (key) {
    if (this.state.errors[key]) {
      let newErrorState = this.state.errors
      newErrorState[key] = null
      this.setState({error: newErrorState})
    }
  }

  // Key === id of element e.g. password
  _renderErrors (key, error) {
    let newErrorState = this.state.errors
    newErrorState[key] = error
    this.setState({error: newErrorState})
  }

  _handleSubmit (e) {
    e.preventDefault()
    // Api.login
    let payload = {
      email: this.emailRef.current.getValue(),
      password: this.passwordRef.current.getValue()
    }

    Api.signin(payload)
      .then(resp => {
        // Save the token
        this.props.login(resp.data.result.token)

        // Save the token expiry
        this.props.storeTokenExpiry(resp.data.result.expiryMilliseconds)

        // Save the currentUser for use later
        this.props.storeUser(resp.data.result.user)

        notification('Success, logging you in')
        // Redirect to dashboard
        this.props.history.push('/dashboard')
      })
      .catch(err => {
        if (err.response.data.code === 'api.error.validation') {
          if (typeof err.response.data.errors === 'object') {
            let keys = Object.keys(err.response.data.errors)
            keys.map(key => {
              this._renderErrors(key, err.response.data.errors[key][0])
              return null
            })
          }
        }
        if (typeof err.response.data.errors === 'string') {
          if (err.response.data.errors === 'No user account exists with that email') {
            notification('No user account exists with that email. Check your email address or signup here')
            // TODO add a link to sign up
            return
          }
          notification(err.response.data.errors)
        }
      })
  }

  render () {
    return (
      <React.Fragment>
        <Header {...this.props} />
        <Wrapper>
          <div className='content'>
            <h2 className='title'>Sign In</h2>
            <form>
              <CustomInput
                ref={this.emailRef}
                errors={this.state.errors}
                idName='email'
                placeholder='Email'
                type='text'
                onChange={this.clearError}
                autocomplete='email'
              />

              <CustomInput
                ref={this.passwordRef}
                errors={this.state.errors}
                idName='password'
                placeholder='Password'
                type={this.state.showPasswd ? 'text' : 'password'}
                onChange={this.clearError}
                addonAfter={
                  <div
                    onClick={() => {
                      this.setState({showPasswd: !this.state.showPasswd})
                    }}>
                    {this.state.showPasswd ? (<Icon name='hide' fill='#757575' />) : (<Icon name='show' fill='#757575' />)}
                  </div>}
                autocomplete='current-password'
              />
              <button
                className='primary-btn'
                onClick={(e) => this._handleSubmit(e)}>
                Sign In</button>
              <span className='link-tag'>Not Registered? <span className='link-text'
                onClick={() => { this.props.history.push('/register') }}>Sign up here</span></span>
            </form>
          </div>
        </Wrapper>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ isLoggedIn }) => ({
  isLoggedIn
})

export default withRouter(
  connect(mapStateToProps, actions)(Login)
)
