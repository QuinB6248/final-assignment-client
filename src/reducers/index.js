import {combineReducers} from 'redux'
import authUser from './authUser'
import signUpUser from './signUpUser'

export default combineReducers({
  authUser,
  signUpUser
})