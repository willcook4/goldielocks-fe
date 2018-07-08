import * as createStore from 'redux-zero'
import { applyMiddleware } from 'redux-zero/middleware'
import { connect } from 'redux-zero/devtools'

let existingToken = window.localStorage.getItem('token')
let user = window.localStorage.getItem('user')

const initialState = {
  user: (user) ? JSON.parse(user) : null,
  token: existingToken,
  isLoggedIn: existingToken !== null
}

const middlewares = connect ? applyMiddleware(connect(initialState)) : []

const store = createStore(initialState, middlewares)

export default store