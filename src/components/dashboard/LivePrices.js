import React, { Component } from 'react'
import moment from 'moment'
import LineChart from '../linechart/LineChart'
import ToolTip from '../linechart/ToolTip'
// import Wrapper from './dashboard.style'

class LivePrices extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      data: [],
      hoverLoc: null,
      activePoint: null,
      chartWidth: 900,
      chartHeight: 300
    }
  }

  // Function for the child component to report data to this parent component
  handleChartHover (hoverLoc, activePoint) {
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint
    })
    if (this.props.onChange) {
      this.props.onChange(activePoint)
    }
  }

  async componentDidMount () {
    let prices = this.props.data
    let dataArray = prices.map((item, index) => {
      let priceNum = null
      if ((item.price[0] !== '£') && (typeof parseFloat(item.price) === 'number')) {
        priceNum = parseFloat(item.price)
      } else {
        priceNum = parseFloat((item.price).substring(1, item.price.length))
      }

      return {
        d: moment(item.timestamp, 'YYYY-MM-DDTHH:mm:ss.sssZ').format('DD MMM - HHa'),
        p: item.price,
        x: index, // previous days
        y: priceNum
        // numerical price
      }
    })

    this.setState({data: dataArray})
  }

  render () {
    // Scale the chart according to the main content window size
    console.log(document.getElementById('main').getBoundingClientRect().width)
    // let mainElementSize = document.getElementById('main').getBoundingClientRect()
    let chartWidth = 900
    let chartHeight = 300
    // if (mainElementSize.width > (200 + 200 + 30 + 900 + 30 + 200) && 
    if (window.innerWidth > 1500) {
      console.log('full size')
      // leave the default width and height
    } else if (window.innerWidth <= 1499 && window.innderWidth > 1200) {
        // smaller desktops
        chartWidth = 600
        console.log('smaller desktops')
    } else if (window.innderWidth < 1199) {
        // tablet
        chartWidth = 400
        console.log('tablets')
    } else if (window.innderWidth < 800) {
        // small
        chartWidth = 300
        console.log('small')
    } else {
      chartWidth = 250
    }


    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}> 
        {/* The hover tooltip */}
        {this.state.hoverLoc ? (<ToolTip hoverLoc={this.state.hoverLoc} activePoint={this.state.activePoint} />) : null }
        {/* The chart */}
        {(this.state.data.length > 0)
          ? (<LineChart
            color={'#da4531'}
            svgHeight={chartHeight}
            svgWidth={chartWidth}
            height={320}
            data={this.state.data}
            onChartHover={(hoverLoc, activePoint) => this.handleChartHover(hoverLoc, activePoint)}
            // yLabelSize={90}
          />) : null}
      </div>
    )
  }
}

export default LivePrices
