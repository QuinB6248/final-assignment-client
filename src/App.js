import React, { Component } from 'react'
import store from './store'
import {Provider} from 'react-redux'
import { Route } from 'react-router-dom'
//import './App.css';
import Routes from './Routes'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Routes/>
        </div>
      </Provider>
    );
  }
}

export default App;