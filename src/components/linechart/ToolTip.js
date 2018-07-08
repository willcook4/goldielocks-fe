import React, { Component } from 'react'
import './ToolTip.css'

class ToolTip extends Component {
  render () {
    const { hoverLoc, activePoint } = this.props
    const svgLocation = document.getElementsByClassName('linechart')[0].getBoundingClientRect()
    const placementStyles = {}
    const width = 114
    placementStyles.width = width + 'px'
    placementStyles.left = hoverLoc + svgLocation.left - (width / 2)
    placementStyles.top = activePoint.svgY + 200 + 'px'

    return (
      <div className='hover' style={placementStyles}>
        <div className='date'>{activePoint.d}</div>
        <div className='price'>{activePoint.p}</div>
      </div>
    )

  }
}

export default ToolTip
