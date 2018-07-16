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
          <div className='welcome'>
            <h1 className='center' style={{fontSize: '2em'}}>Welcome</h1>
            <h4 className='center wip'>This is a WIP, please bear with as I build my idea out</h4>
          </div>
          <div className='buttons'>
            <div style={{display: 'flex', width: '320px', justifyContent: 'space-around'}}>
              <button
                className='primary-btn'
                onClick={() => this.props.history.push('/login')}
              >Sign In</button>
              <button
                className='primary-btn'
                onClick={() => this.props.history.push('/register')}
              >Register</button>
            </div>
            <p className='link-text why'>Why sign-up?</p>
          </div>
        </div>
        <Footer />
      </Wrapper>
    )
  }
}

export default Homepage
