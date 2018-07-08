import axios from 'axios'
import { getToken } from '../helpers/utility'

class Api {
  /**
   * Login
   * @param {String} payload.email
   * @param {String} payload.password
   */
  signin (payload) {
    let endpoint = this._makeEndpoint('/signin')
    return this._post(endpoint, payload)
  }

  /**
   * Register
   * @param {String} payload.email
   * @param {String} payload.password
   * @param {String} payload.passwordConfirm
   */
  register (payload) {
    const endpoint = this._makeEndpoint('/register')
    return this._post(endpoint, payload)
  }

  /**
   * Get a list of the fake gold prices, dummy data
   */
  getFakeGoldPrice () {
    let endpoint = this._makeEndpoint('/api/fake-gold-prices')
    return this._get(endpoint)
  }

  /**
   * Get a list of the current gold prices.
   */
  getGoldPrices () {
    let endpoint = this._makeEndpoint(('/api/gold-prices'))
    return this._get(endpoint)
  }

  _post (endpoint, payload = {}) {
    console.log(endpoint)
    // TODO get token if we have one

    let options = {
      method: 'post'
    }
    return axios.post(endpoint, payload, options)
      .then(function (resp) {
        return resp
      })
  }

  _get (endpoint, payload = {}) {
    // get token
    const tokenMap = getToken()
    const token = tokenMap.get('token')
    if (token) {
      payload.token = token
    }

    let options = {
      method: 'get',
      headers: {
        token: token || null
      }
    }

    return axios.get(endpoint, options)
      .then(function (resp) {
        return resp
      })
  }

  _makeEndpoint (endpoint) {
    // return `${process.env.PLATFORM_API_HOST}${endpoint}`
    return `http://localhost:9010${endpoint}`
    // TODO add .env file to get PLATFORM_API_HOST
  }
}


export default new Api()
