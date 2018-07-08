import React, { Component } from 'react'

class Homepage extends Component {
  render () {
    return (
      <div>
        <h1>Homepage</h1>
        <h4>WIP</h4>
        <button
          onClick={() => this.props.history.push('/login')}
        >Sign In</button>
        <button
          onClick={() => this.props.history.push('/register')}
        >Register</button>
      </div>
    )
  }
}

export default Homepage
