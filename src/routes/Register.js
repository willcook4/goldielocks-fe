import React, { Component } from 'react'
// import './Register.css' TEMP moved to global css
import { withRouter } from 'react-router'
import { connect } from 'redux-zero/react'
import actions from '../redux/actions'
import Api from '../lib/api'
import notification from '../components/notifications/notifications'
import Wrapper from './Login.styles.js'
import Header from '../components/Header'
import {Input as CustomInput} from '../components/input/input'
import Icon from '../components/icons'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {
        email: null,
        password: null,
        passwordConfirmation: null,
        name: null
      }
    }
    // Refs
    this.emailRef = React.createRef()
    this.passwordRef = React.createRef()
    this.passwordConfirmRef = React.createRef()
    this.nameRef = React.createRef()

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
      password: this.passwordRef.current.getValue(),
      passwordConfirmation: this.passwordConfirmRef.current.getValue(),
      name: this.nameRef.current.getValue()
    }
    console.log('payload: ', payload)
    Api.register(payload)
      .then(resp => {
        // console.log('resp.data: ', resp.data)
        // Save the token
        this.props.login(resp.data.token)

        // Save the currentUser for use later
        this.props.storeUser(resp.data.user)

        // notification
        notification('Success, logging you in...')
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
            <h2 className='title'>Sign Up</h2>
            <form>
              <CustomInput
                ref={this.nameRef}
                errors={this.state.errors}
                idName='name'
                placeholder='Name'
                type='text'
                onChange={this.clearError}
                autocomplete='name'
              />

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
                autocomplete='new-password'
              />

              <CustomInput
                ref={this.passwordConfirmRef}
                errors={this.state.errors}
                idName='passwordConfirmation'
                placeholder='Password Confirmation'
                type={this.state.showPasswd ? 'text' : 'password'}
                onChange={this.clearError}
                addonAfter={
                  <div
                    onClick={() => {
                      this.setState({showPasswd: !this.state.showPasswd})
                    }}>
                    {this.state.showPasswd ? (<Icon name='hide' fill='#757575' />) : (<Icon name='show' fill='#757575' />)}
                  </div>}
                autocomplete='new-password'
              />

              <button
                className='primary-btn'
                onClick={(e) => this._handleSubmit(e)}>
                Sign Up</button>
              <span className='link-tag'>Already Registered? <span className='link-text'
                onClick={() => { this.props.history.push('/login') }}>Sign In Here</span></span>
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
  connect(mapStateToProps, actions)(Register)
)
