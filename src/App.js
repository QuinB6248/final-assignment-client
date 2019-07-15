import React, { Component } from 'react'
import store from './store'
import {Provider} from 'react-redux'
import { Route } from 'react-router-dom'
import './App.css';
import Routes from './Routes'
//import Home from './components/Home'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          {/* <Route path="/" exact component={Home} /> */}
          <Routes/>
        </div>
      </Provider>
    );
  }
}

export default App;