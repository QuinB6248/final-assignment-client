import {combineReducers} from 'redux'
import authUser from './authUser'
import signUpUser from './signUpUser'
import events from './events'
import tickets from './tickets'
import ticket from './ticket'


export default combineReducers({
  authUser,
  signUpUser,
  events,
  tickets,
  ticket
})