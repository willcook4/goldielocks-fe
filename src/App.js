import React from 'react'
import './App.css'
import PublicRoutes from './router'
import store from './redux/store'
import { Provider } from 'redux-zero/react'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <Provider store={store}>
      <PublicRoutes />
        {/* <ToastContainer />
        </div> */}
    </Provider>)
}

export default App
