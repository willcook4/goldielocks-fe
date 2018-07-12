import React, { Component } from 'react'
import Wrapper from './footer.style'

class Footer extends Component {
  render () {
    return (
      <Wrapper className='footer'>
        <div>
          <h5>Made by <span>Will Cook</span></h5> 
          {/* TODO add link */}
        </div>
      </Wrapper>
    )
  }
}

export default Footer
