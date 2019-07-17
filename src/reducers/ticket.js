import { TICKET_FETCHED  } from '../actions/ticket'
  

const reducer = (state = null, action) => {
  switch(action.type) {
    case TICKET_FETCHED :
      return action.payload
   
    
    default: 
      return state
    
  }
}

export default reducer