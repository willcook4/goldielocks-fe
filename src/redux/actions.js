let moment = require('moment')
const actions = (store) => ({
  // Save the User to localstorage
  storeUser: (state, user) => () => {
    window.localStorage.setItem('user', JSON.stringify(user))
    state.user = user
    return state
  },
  // Save the token expiry
  storeTokenExpiry: (state, tokenExpiry) => () => {
    window.localStorage.setItem('tokenExpiry', JSON.stringify(moment.utc().add(58, 'minutes')))
    state.tokenExpiry = tokenExpiry
    return state
  },
  // Return the current User from localstorage
  fetchUser: (state) => () => {
    let user = window.localStorage.getItem('user')
    state.user = user
    return state
  },
  /**
   * Log a user out
   */
  signout: (state) => () => {
    window.localStorage.clear()
    state = {}
    state.isLoggedIn = false
    window.location.href = '/'
  },
  /**
   * When a user logs in save their token
   */
  login: (state, token) => () => {
    window.localStorage.setItem('token', token)
    state.token = token
    state.isLoggedIn = (token !== null)
    return state
  }
})

export default actions
