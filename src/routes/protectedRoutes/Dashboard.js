import React, { Component } from 'react'
import actions from '../../redux/actions'
import store from '../../redux/store'
import { withRouter } from 'react-router'
import { connect } from 'redux-zero/react'
import Api from '../../lib/api'
import LivePrices from '../../components/dashboard/LivePrices'
import Analysis from '../../components/analysis'
// import { tokenExpired } from '../../helpers/utility'
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'
import Aside from '../../components/Aside'
import Footer from '../../components/Footer'
import Wrapper from './Dashboard.style'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      token: null,
      prices: null
    }
    this.onChange = this.onChange.bind(this)
  }

  async componentDidMount () {
    // Current User
    let _store = store.getState()

    // Check token(Session) hasn't expired
    // if (tokenExpired()) {
    //  this.props.history.push('/login')
    //  alert('Session has expired')
    // }

    // Get prices
    // let prices = await Api.getFakeGoldPrice() // TESTING
    let prices = await Api.getGoldPrices()

    this.setState({
      user: _store.user,
      token: _store.token,
      prices: prices.data.prices || null
    })
  }

  // Save the active point of hover in the graph to state
  // TODO duplicate to the state in the LivePrices component
  onChange (activePoint) {
    // console.log('onChange', activePoint)
    this.setState({activePoint: activePoint})
  }

  render () {
    return (
      <Wrapper className='container'>
        <Header pageTitle='Dashboard' />
        <Navigation actions={this.props} />
        <div className='main'>
          {(this.state.prices && this.state.prices.length > 1) ?
            (<div>
              <h4 style={{display: 'inline-grid'}}>Prices loaded</h4>
              <svg width='10' height='10'>
                <circle cx='5' cy='5' r='3' fill='green' />
              </svg>
              <LivePrices data={this.state.prices} onChange={this.onChange} />
              <Analysis comparisonPoint={this.state.activePoint} />
            </div>) : (
              <div>
                <h4>Prices</h4>
                <h4>Prices loading...</h4>
                <svg width='6' height='6'>
                  <circle cx='5' cy='5' r='3' fill='red' />
                </svg>
                <span>Loading prices...</span>
              </div>)}
        </div>
        <Aside />
        <Footer />
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ isLoggedIn }) => ({
  isLoggedIn
})

export default withRouter(
  connect(mapStateToProps, actions)(Dashboard)
)