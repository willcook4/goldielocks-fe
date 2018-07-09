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
import notification from '../../components/notifications/notifications'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      token: null,
      prices: [],
      message: 'Loading prices...'
    }
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount () {
    // Current User
    let _store = store.getState()

    // Check token(Session) hasn't expired
    // if (tokenExpired()) {
    //  this.props.history.push('/login')
    //  alert('Session has expired')
    // }

    // Get prices
    // let prices = Api.getFakeGoldPrice() // TESTING
    let prices = []
    Api.getGoldPrices()
      .then(resp => {
        prices = resp
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log('1', error.response.data)
          // console.log('2',error.response.status)
          // console.log('3',error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest
          // console.log('4',error.request)
          this.setState({
          message: (<span>Sorry, an error occured. <br />Try refreshing or logging out and back in again</span>) 
          }, () => console.log('happens')
          )
          notification('Unable to access the internet, check your connection')
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', '5',error.message)
        }
        console.log('config: ', error.config)
      })

    this.setState({
      user: _store.user,
      token: _store.token,
      prices: (prices.length > 0) ? prices.data.prices : []
    })
  }

  // Save the active point of hover in the graph to state
  // TODO duplicate to the state in the LivePrices component
  onChange (activePoint) {
    // console.log('onChange', activePoint)
    this.setState({activePoint: activePoint})
  }

  render () {
    console.log(this.state)
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
                <span>{this.state.message}</span>
                <svg width='6' height='6'>
                  <circle cx='5' cy='5' r='3' fill='red' />
                </svg>
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