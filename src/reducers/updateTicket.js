import { TICKET_UPDATED  } from '../actions/ticket'
  

const reducer = (state = null, action) => {
  switch(action.type) {
    
    case TICKET_UPDATED :
      return action.payload
    
   
    
    default: 
      return state
    
  }
}

export default reducer