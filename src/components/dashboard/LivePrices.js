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
      activePoint: null
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
    return (
      <div>
        {/* The hover tooltip */}
        {this.state.hoverLoc ? (<ToolTip hoverLoc={this.state.hoverLoc} activePoint={this.state.activePoint} />) : null }
        {/* The chart */}
        {(this.state.data.length > 0)
          ? (<LineChart
            data={this.state.data}
            onChartHover={(hoverLoc, activePoint) => this.handleChartHover(hoverLoc, activePoint)}
            // yLabelSize={90}
          />) : null}
      </div>
    )
  }
}

export default LivePrices
