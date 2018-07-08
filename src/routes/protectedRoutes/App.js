import React, { Component } from 'react'
import AppRouter from './AppRouter'
// import { ToastContainer } from 'react-toastify'

class App extends Component {
  render () {
    return (
      <div>
        <AppRouter url={this.props.match.url} />
      </div>
    )
  }
}

export default App