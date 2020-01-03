import { LOGIN_SUCCES, NAME_LOG } from '../actions/auth'
  

const reducer = (state = null, action) => {
  switch(action.type) {
    case LOGIN_SUCCES:
      return action.payload
    default: 
      return state
  }
}

export default reducer