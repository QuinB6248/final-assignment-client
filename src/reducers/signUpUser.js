import { SIGNUP_SUCCES} from '../actions/auth'
  

const reducer = (state = null, action) => {
  switch(action.type) {
    case SIGNUP_SUCCES:
      return action.payload
    default: 
      return state
  }
}

export default reducer