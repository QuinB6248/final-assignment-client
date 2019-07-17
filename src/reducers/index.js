import {combineReducers} from 'redux'
import authUser from './authUser'
import signUpUser from './signUpUser'
import events from './events'
import count from './count'
import tickets from './tickets'
import ticket from './ticket'
import updateTicket from './updateTicket'

export default combineReducers({
  authUser,
  signUpUser,
  events,
  count,
  tickets,
  ticket,
 
})