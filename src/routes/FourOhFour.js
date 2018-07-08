import React from 'react'
import { Link } from 'react-router-dom'
import Image from '../images/rob.png'
// import FourZeroFourStyleWrapper from './404.style'

class FourZeroFour extends React.Component {
  render () {
    return (
      // <FourZeroFourStyleWrapper className='iso404Page'>
      <div>
        <div className='iso404Content'>
          <h1>
            404 title
          </h1>
          <h3>
            404 subtitle
          </h3>
          <p>
            404 description
          </p>
          <button type='button'>
            <Link to='/'>
              Back Home
            </Link>
          </button>
        </div>

        <div className='iso404Artwork'>
          <img alt='#' src={Image} />
        </div>
      </div>
      /* </FourZeroFourStyleWrapper> */
    )
  }
}

export default FourZeroFour
