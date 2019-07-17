import { TICKET_FETCHED, COMMENT_CREATED, TICKET_UPDATED  } from '../actions/ticket'
  

const reducer = (state = null, action) => {
  switch(action.type) {
    case TICKET_FETCHED :
      return action.payload
    // case TICKET_UPDATED :
    //   console.log('Action', state.ticket)
    //   return {...state, ...state.ticket.event, ticket: action.payload}
    case COMMENT_CREATED:
        console.log('ActionCOMM', action.payload)
      return [...state, action.payload]
   
    
    default: 
      return state
    
  }
}

export default reducer