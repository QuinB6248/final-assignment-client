import React, { Component } from 'react'
import store from './store'
import {Provider} from 'react-redux'
import Routes from './Routes'


class App extends Component {
  render() {
    return (
      //The <Provider /> makes the Redux store available to any nested components that have been wrapped in the connect() function.
      <Provider store={store}>
        <div>
          <Routes/>
        </div>
      </Provider>
    );
  }
}

export default App;