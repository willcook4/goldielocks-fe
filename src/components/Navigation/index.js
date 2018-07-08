import React, { Component } from 'react'
import store from '../../redux/store'
import Wrapper from './navigation.style'

class Navigation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidMount () {
    // Current User
    const _store = store.getState()
    this.setState({user: _store.user})
  }

  render () {
    return (
      <Wrapper className='navigation'>
        <span>{(this.state.user && this.state.user.displayName) ?
          `Welcome ${this.state.user.displayName}!` : 'Welcome!'}</span>
        <span onClick={() => this.props.actions.signout()}>Sign Out</span>
      </Wrapper>
    )
  }
}

export default Navigation
