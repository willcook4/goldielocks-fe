import React, { Component } from 'react'
import Wrapper from './header.style'
import { LogoSVG, GoldenDisc } from '../../images/LogoSVG.svg'

class Header extends Component {
  render () {
    return (
      <Wrapper className='header'>
        <div onClick={() => this.props.history.push('/')
        }>
          <h1>Goldielocks</h1>
          <LogoSVG />
          <div className='golden-disc'>
            <GoldenDisc />
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default Header
