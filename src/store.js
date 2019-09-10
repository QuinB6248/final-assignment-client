import { createStore,  applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import ReduxThunk from 'redux-thunk'

//uses redux-thunk and supports the redux devtools if available:

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
  applyMiddleware(ReduxThunk)
)
//redux.createStore(reducer) creates a new store, with as argument the reducer that will initiate and update the state
const store = createStore(reducer, enhancer)


export default store