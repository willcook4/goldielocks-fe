import React, { Component } from 'react'
import Calculate from './Calculate.helper'

class Analysis extends Component {
  constructor (props) {
    super(props)
    this.buyPriceRef = React.createRef()
    this.amountPurchasedRef = React.createRef()

    this.state = {
      showForm: true,
      showStats: false
    }
  }

  _renderForm () {
    return (
      <div>
        <input
          className='form-item'
          placeholder='Your buy price'
          ref={this.buyPriceRef}
          type='text'
        />

        <input
          className='form-item'
          placeholder='Amount purchased (£)'
          ref={this.amountPurchasedRef}
          type='text'
        />

        <button onClick={() => {
          this.setState({
            showForm: false,
            showStats: true,
            buyPrice: this.buyPriceRef.current.value,
            amountPurchased: this.amountPurchasedRef.current.value
          })
        }}>Analyse</button>
      </div>
    )
  }

  _renderAnalysis () {
    // TODO: need to factor in the 0.05% buy commission
    // TODO move into own functions file
    const SALES_COMISSION = 0.05  // TODO move to .env

    /* how many gram of gold was bought in the initial transaction */
    const gBoughtInitally = Calculate.gBoughtInitally(this.state.amountPurchased, this.state.buyPrice)

    /* Selcted comparison point in the graph - inputBuyPrice */
    let priceComparison = null
    if (this.props.comparisonPoint && this.props.comparisonPoint.p && this.state.buyPrice) {
      priceComparison = Calculate.priceComparison(this.props.comparisonPoint.p.substring(1), this.state.buyPrice)
    }
    if (priceComparison !== null) {
      priceComparison = priceComparison.toFixed(2)
    }
    // console.log('priceComparison: ', priceComparison)

    const breakEvenPrice = Calculate.breakEvenPrice(this.state.buyPrice, SALES_COMISSION).toFixed(2)

    /* valueOfInvestment = priceComparison x amountPurchasedRef */
    const valueOfInvestment = this.state.amountPurchased ? parseFloat(this.state.amountPurchased).toFixed(2) : null

    /* investmentAtSelectedTime
      priceComparison x number of grams of initial investment
      OR priceComparison x (amountPurchased / buyPrice) */
    let investmentAtSelectedTime = null
    if (this.state.amountPurchased &&
      this.props.comparisonPoint &&
      this.props.comparisonPoint.p &&
      this.state.buyPrice) {
      investmentAtSelectedTime = Calculate.investmentAtSelectedTime(this.state.amountPurchased, this.props.comparisonPoint.p.substring(1), this.state.buyPrice)
      investmentAtSelectedTime.toFixed(2)
      console.log('AAAA: ', investmentAtSelectedTime.toFixed(2))
    }

    /* % increase or decrease in buy price vs current selected */
    let rawReturn = null
    if (this.state.amountPurchased && this.props.comparisonPoint) {
      // currentInvestmentValue
      const diff = ((parseFloat(this.props.comparisonPoint.p.substring(1)) *
      (parseFloat(this.state.amountPurchased) / parseFloat(this.state.buyPrice))) -
      // Initial value of investment
      parseFloat(this.state.amountPurchased))
      // (Increase[or decrease] ÷ Original Number) × 100
      // === (diff / this.state.amountPurchased)*100
      rawReturn = ((diff / this.state.amountPurchased) * 100).toFixed(2)
    }

    /* rawReturn - sales commission */
    let realisedROI = null
    if (this.state.amountPurchased && this.props.comparisonPoint) {
      const diff = ((parseFloat(this.props.comparisonPoint.p.substring(1)) *
      (parseFloat(this.state.amountPurchased) / parseFloat(this.state.buyPrice))) -
      parseFloat(this.state.amountPurchased))

      // realisedROI = (((diff / parseFloat(this.state.amountPurchased)) * 100) - this.SALES_COMISSION)
      realisedROI = (((diff / parseFloat(this.state.amountPurchased)) * 100) - SALES_COMISSION)
    }

    // Value of increase [or decrease] in pounds including sales commission
    let returnInGBP = null
    if (this.props.comparisonPoint && gBoughtInitally && this.state.amountPurchased) {
      // grammsBoughtInitally * newPrice = rawValue
      // rawValue - this.SALES_COMISSION[percentage] = return
      let rawIncrease = gBoughtInitally * parseFloat(this.props.comparisonPoint.p.substring(1))
      returnInGBP = (rawIncrease - (rawIncrease / 100) * SALES_COMISSION) - parseFloat(this.state.amountPurchased)
    }

    return (
      <div>
        <p>Stats here</p>
        <h3>Your price compared to the value selected in the history graph</h3>
        <p><strong>Your historic buy price:</strong> £{this.state.buyPrice}</p>
        <p><strong>Price diffrence</strong> (selected point - buy price):  £{priceComparison}</p>
        <p><strong>Break even price needed</strong> (buy price + 0.05% sell commission): £{breakEvenPrice}</p>
        <p><strong>Initial value of investment:</strong> £{valueOfInvestment}</p>
        <p><strong>Value of investment at selected point in time:</strong> £{investmentAtSelectedTime ? investmentAtSelectedTime.toFixed(2) : null}</p>
        <p><strong>Raw return on investment: </strong>{rawReturn}%</p>
        <p><strong>% ROI, (Raw return - sell sales commission): </strong>{realisedROI ? realisedROI.toFixed(2) : null}%</p>
        <p><strong>Return (£) after sales commission: </strong>£{returnInGBP ? returnInGBP.toFixed(2) : null}</p>
      </div>
    )
  }

  render () {
    return (
      <div>
        <h2>Analysis</h2>
        <button onClick={() => {
          console.log('reset clicked')
          this.setState({showForm: true, amountPurchased: null})
          this.buyPriceRef.current.value = null
          this.amountPurchasedRef.current.value = null
        }}>Reset</button>
        {this.state.showForm ? this._renderForm() : null}
        {this.state.showStats ? this._renderAnalysis() : null}
      </div>
    )
  }
}

export default Analysis