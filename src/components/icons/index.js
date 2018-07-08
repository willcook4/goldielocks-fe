import React from 'react'

// Code pattern from https://blog.lftechnology.com/using-svg-icons-components-in-react-44fbe8e5f91

// Icon Files
import Envelope from './Envelope'
import Show from './Show'
import Hide from './Hide'

const Icon = props => {
  switch (props.name) {
    case 'envelope':
      return <Envelope {...props} />
    case 'show':
      return <Show {...props} />
    case 'hide':
      return <Hide {...props} />
    default:
  }
}

export default Icon
