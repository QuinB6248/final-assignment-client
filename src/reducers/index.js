import {combineReducers} from 'redux'
import authUser from './authUser'
import signUpUser from './signUpUser'
import events from './events'

export default combineReducers({
  authUser,
  signUpUser,
  events
})