import { TICKETS_FETCHED, TICKET_CREATED  } from '../actions/tickets'
import { TICKET_DELETED  } from '../actions/ticket'
  

const reducer = (state = null, action) => {
  switch(action.type) {
   
    case TICKETS_FETCHED :
      return action.payload
    case TICKET_CREATED:
      return  {...state, tickets: [...state.tickets, action.payload]}
    case TICKET_DELETED:
      return state.tickets.filter(ticket => ticket.id !== action.payload)
    default: 
      return state
  }
}

export default reducer