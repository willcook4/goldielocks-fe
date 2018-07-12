import React, { Component } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Wrapper from './Homepage.styles'

class Homepage extends Component {
  render () {
    return (
      <Wrapper>
        <Header {...this.props} />
        <div className='container'>
          <h1>Homepage</h1>
          <h4>WIP</h4>
          <button
            onClick={() => this.props.history.push('/login')}
          >Sign In</button>
          <button
            onClick={() => this.props.history.push('/register')}
          >Register</button>
        </div>
        <Footer />
      </Wrapper>
    )
  }
}

export default Homepage
