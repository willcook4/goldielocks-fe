import React, { Component } from 'react'
import Wrapper from './linechart.style'

class LineChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hoverLoc: null,
      activePoint: null
    }
  }

  // Get X & Y || Max & Min
  getX () {
    const {data} = this.props
    return {
      min: data[0].x, // Smallest data point 'count' from api resp
      max: data[data.length - 1].x // Highest data point 'count' from api resp
    }
  }
  // Get X & Y || Max & Min
  getY () {
    const {data} = this.props

    return {
      min: data.reduce((min, p) => p.y < min ? p.y : min, data[0].y), // Smallest data point 'price' from api resp
      max: data.reduce((max, p) => p.y > max ? p.y : max, data[0].y) // Highest data point 'price' from api resp
    }
  }

  // Get svg coordinates
  getSvgX (x) {
    const {svgWidth, yLabelSize} = this.props
    return yLabelSize + (x / this.getX().max * (svgWidth - yLabelSize))
  }

  getSvgY (y) {
    const {svgHeight, xLabelSize} = this.props
    const gY = this.getY()
    return ((svgHeight - xLabelSize) * gY.max - (svgHeight - xLabelSize) * y) / (gY.max - gY.min)
  }

  // Build grid axis, Top and bottom horizontal lines to the svg
  makeAxis () {
    const {yLabelSize} = this.props
    const x = this.getX()
    const y = this.getY()

    return (
      <g className='linechart-axis'>
        <line
          x1={this.getSvgX(x.min) - yLabelSize} y1={this.getSvgY(y.min)}
          x2={this.getSvgX(x.max)} y2={this.getSvgY(y.min)}
          strokeDasharray='5' />
        <line
          x1={this.getSvgX(x.min) - yLabelSize} y1={this.getSvgY(y.max)}
          x2={this.getSvgX(x.max)} y2={this.getSvgY(y.max)}
          strokeDasharray='5' />
      </g>
    )
  }

  // Create labels for the X and Y axis of the chart
  makeLabels () {
    const {svgHeight, svgWidth, xLabelSize, yLabelSize} = this.props
    const padding = 5
    return (
      <g className='linechart-label'>
        {/* Y Axis Lable, Highest Value
        svg text, transformed off the chart L */}
        <text transform={`translate(${/* yLabelSize / 2 */ 25}, 20)`} textAnchor='middle'>
          {`Max: £${this.getY().max.toFixed(2)}`}
        </text>
        {/* Y Axis Lable, Lowest Value
        svg text, transformed off the chart L */}
        <text transform={`translate(${/* yLabelSize / 2 */ 25}, ${svgHeight - xLabelSize - padding})`} textAnchor='middle'>
          {`Min: £${this.getY().min.toFixed(2)}`}
        </text>
        {/* X Axis Lable, First date */}
        <text transform={`translate(${yLabelSize}, ${svgHeight})`} textAnchor='start'>
          { this.props.data[0].d }
        </text>
        {/* X Axis Lable, Last date */}
        <text transform={`translate(${svgWidth}, ${svgHeight})`} textAnchor='end'>
          { this.props.data[this.props.data.length - 1].d }
        </text>
      </g>
    )
  }

  // Render an svg path from the data points
  makePath () {
    const {data, color} = this.props

    // pathD === starting point (0, 0)
    let pathD = 'M ' + this.getSvgX(data[0].x) + ' ' + this.getSvgY(data[0].y) + ' '

    // map through data to put a point in on each value drawing a line between
    pathD += data.map((point, i) => {
      return 'L ' + this.getSvgX(point.x) + ' ' + this.getSvgY(point.y) + ' '
    }).join('')

    return (
      <path className='linechart-path' d={pathD} style={{stroke: color}} />
    )
  }

  // Make the area below the line shaded
  makeArea () {
    const { data } = this.props
    // Move to the start
    let pathD = `M ${this.getSvgX(data[0].x)} ${this.getSvgY(data[0].y)} `
    // Add a line in between each data point
    pathD += data.map((point) => {
      return `L ${this.getSvgX(point.x)} ${this.getSvgY(point.y)} `
    }).join('')

    // add the points on the bottom right and bottom left
    const x = this.getX()
    const y = this.getY()
    pathD += `L ${this.getSvgX(x.max)} ${this.getSvgY(y.min)} L ${this.getSvgX(x.min)} ${this.getSvgY(y.min)} `
    return (<path className='linechart-area' d={pathD} />)
  }

  // Find the closest point to the selection (Mouse pointer)
  getCoords (e) {
    const { svgWidth, data, yLabelSize } = this.props
    // Where is the svg graph?
    const svgLocation = document.getElementsByClassName('linechart')[0].getBoundingClientRect()
    const adjustment = (svgLocation.width - svgWidth) / 2 // takes off the padding width
    const relativeLoc = e.clientX - svgLocation.left - adjustment // X coord relative to the graph

    let svgData = [] // Array of objects of svg points with price and date
    data.forEach((point, i) => {
      svgData.push({
        svgX: this.getSvgX(point.x), // svg coord x
        svgY: this.getSvgY(point.y), // svg coord y
        d: point.d, // date
        p: point.p // price
      })
    })

    // Find the closest point
    let closestPoint = {}
    for (let i = 0, c = 500; i < svgData.length; i++) {
      if (Math.abs(svgData[i].svgX - this.state.hoverLoc) <= c) {
        c = Math.abs(svgData[i].svgX - this.state.hoverLoc)
        closestPoint = svgData[i]
      }
    }

    if (relativeLoc - yLabelSize < 0) {
      // if selected place is left of the label on the left, stop
      this.stopHover()
    } else {
      this.setState({
        hoverLoc: relativeLoc,
        activePoint: closestPoint
      })
      // Update the parent component with the closest point
      this.props.onChartHover(relativeLoc, closestPoint)
    }
  }

  // Stop interpreting the hover location
  stopHover () {
    this.setState({hoverLoc: null, activePoint: null})
    this.props.onChartHover(null, null)
  }

  // Hightlight an svg point with an svg circle
  makeActivePoint () {
    const {color, pointRadius} = this.props
    return (
      <circle
        className='linechart-point'
        style={{stroke: color}}
        r={pointRadius}
        cx={this.state.activePoint.svgX}
        cy={this.state.activePoint.svgY}
      />
    )
  }

  // Draw a line from the active point vertically above and below the line
  createLine () {
    const {svgHeight, xLabelSize} = this.props
    return (
      <line
        className='hover-line'
        strokeLinecap='round'
        x1={this.state.hoverLoc}
        y1={-8} // padding on the right of the linechart component
        x2={this.state.hoverLoc}
        y2={svgHeight - xLabelSize}
      />
    )
  }

  render () {
    const {svgHeight, svgWidth} = this.props
    return (
      <Wrapper>
        <svg
          style={{boxSizing: 'content-box', padding: '30px'}} // box sizing needed to account for padding in hover calc
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className='linechart'
          onMouseMove={(e) => this.getCoords(e)}>
          <g>
            {this.makeAxis()}
            {this.makePath()}
            {this.makeArea()}
            {this.makeLabels()}
            {this.state.hoverLoc ? this.createLine() : null}
            {this.state.hoverLoc ? this.makeActivePoint() : null}
          </g>
        </svg>
      </Wrapper>
    )
  }
}

// DEFAULT PROPS
LineChart.defaultProps = {
  data: [],
  color: 'deeppink',
  pointRadius: 5,
  svgHeight: 300,
  svgWidth: 900,
  xLabelSize: 20,
  yLabelSize: 80
}

export default LineChart
