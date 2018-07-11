import React, { Component } from 'react'
import Wrapper from './header.style'
import { LogoSVG, GoldenDisc } from '../../images/LogoSVG.svg'

class Header extends Component {
  render () {
    return (
      <Wrapper className='header'>
        <h1>Goldielocks</h1>
        <LogoSVG />
        <div className='golden-disc'>
          <GoldenDisc />
        </div>
      </Wrapper>
    )
  }
}

export default Header
