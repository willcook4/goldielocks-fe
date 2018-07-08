class Calculate {
  /**
   * Amount in gramms of the initial investment
   * @param {String/Number} amountPurchased e.g. 250.00 (pound amount)
   * @param {Sting/Number} buyPrice  e.g. 31.30 (price per gram)
   */
  gBoughtInitally (amountPurchased, buyPrice) {
    let _gBoughtInitally = null
    if (amountPurchased && buyPrice) {
      _gBoughtInitally = parseFloat(amountPurchased) / parseFloat(buyPrice)
    }
    return _gBoughtInitally
  }

  /**
   * breakEvenPrice = price + (commission fee)
   * @param {String/Number} buyPrice e.g. 31.30 (price per gram)
   * @param {String/Number} salesComission e.g. 0.05%
   */
  breakEvenPrice (buyPrice, salesComission) {
    let _breakEvenPrice = null
    if (buyPrice && salesComission) {
      _breakEvenPrice = ((
        (parseFloat(buyPrice) / 100) * salesComission) + parseFloat(buyPrice))
    }
    return _breakEvenPrice
  }

  /**
   * selectedPrice - originalBuyPrice
   * @param {String/Number} selectedPrice e.g. 31.30 (price per gram)
   * @param {String/Number} buyPrice e.g. 31.10 (price per gram)
   */
  priceComparison (selectedPrice, buyPrice) {
    let _priceComparison = null
    if (selectedPrice && buyPrice) {
      _priceComparison = parseFloat(selectedPrice) - parseFloat(buyPrice)
    }
    return _priceComparison
  }

  /**
   * Investment value at selected price point
   * priceComparison x number of grams of initial investment
   * === priceComparison x (amountPurchased / buyPrice)
   */
  investmentAtSelectedTime (amountPurchased, selectedPrice, buyPrice) {
    console.log('bbb: ', amountPurchased)
    let _investmentAtSelectedTime = null
    if (selectedPrice && buyPrice && amountPurchased) {
      _investmentAtSelectedTime = this.priceComparison(selectedPrice, buyPrice) * this.gBoughtInitally(amountPurchased, buyPrice)
      _investmentAtSelectedTime += parseFloat(amountPurchased)
    }
    return _investmentAtSelectedTime
  }
}

export default new Calculate()
