import React, { Component } from 'react'
// import './Register.css' TEMP moved to global css
import { withRouter } from 'react-router'
import { connect } from 'redux-zero/react'
import actions from '../redux/actions'
import Api from '../lib/api'
import notification from '../components/notifications/notifications'
import { ToastContainer } from 'react-toastify'

class Register extends Component {
  constructor (props) {
    super(props)
    this.emailRef = React.createRef()
    this.passwordRef = React.createRef()
    this.passwordConfirmRef = React.createRef()
    this.nameRef = React.createRef()
  }

  _handleSubmit (e) {
    e.preventDefault()
    // Api.login
    let payload = {
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value,
      passwordConfirm: this.passwordConfirmRef.current.value,
      name: this.nameRef.current.value
    }
    console.log('payload: ', payload)
    Api.register(payload)
      .then(resp => {
        // console.log('resp.data: ', resp.data)
        console.log('resp.data: ', resp.data)
        console.log('resp.data.user: ', resp.data.user)
        console.log('props: ', this.props)
        // Save the token
        this.props.login(resp.data.token)

        // Save the currentUser for use later
        this.props.storeUser(resp.data.user)

        // Redirect to dashboard
        this.props.history.push('/dashboard')
      })
      .catch(err => {
        console.log('Error: ', err)
        // For each key in errors, notify with each key at index[0]
        // e.g. errors.email[0]
        if (err.response.data.code === 'api.error.validation') {
          if (typeof err.response.data.errors === 'object') {
            let keys = Object.keys(err.response.data.errors)
            console.log('keys: ', keys)
            keys.map(key => {
              console.log(err.response.data.errors[key][0])
              notification(err.response.data.errors[key][0])
              return null
            })
          }
        }
      })
  }

  render () {
    return (
      <div>
        <ToastContainer />
        <div className='center'>
          <div className='card'>
            <h1>Register</h1>
            <form>
              <label>
                Name:
                <input
                  className='form-item'
                  placeholder='John Doe'
                  ref={this.nameRef}
                  type='text'
                />
              </label>
              <label>
                Email:
                <input
                  className='form-item'
                  placeholder='john@example.com'
                  ref={this.emailRef}
                  type='text'
                />
              </label>
              <label>
                Password:
                <input
                  className='form-item'
                  placeholder='Password'
                  ref={this.passwordRef}
                  type='password'
                />
              </label>
              <label>
                Password Confirmation:
                <input
                  className='form-item'
                  placeholder='Password Confirmation'
                  ref={this.passwordConfirmRef}
                  type='password'
                />
              </label>
              <button
                onClick={(e) => this._handleSubmit(e)}
                className='form-submit'
              >SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ isLoggedIn }) => ({
  isLoggedIn
})

export default withRouter(
  connect(mapStateToProps, actions)(Register)
)
