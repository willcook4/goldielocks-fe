import React from 'react'
import './App.css'
import PublicRoutes from './router'
import store from './redux/store'
import { Provider } from 'redux-zero/react'

const App = () => {
  return (
    <Provider store={store}>
      <PublicRoutes />
    </Provider>)
}

export default App
