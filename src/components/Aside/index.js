import React, { Component } from 'react'
import Wrapper from './aside.style'

class Aside extends Component {
  render () {
    return (
      <Wrapper className='aside'> 
        <ul>
          <li><span>How does this work?</span></li>
          <li><span>Help</span></li>
        </ul>
      </Wrapper>
    )
  }
}

export default Aside
