import { TICKETS_FETCHED, TICKET_CREATED  } from '../actions/tickets'
  

const reducer = (state = null, action) => {
  switch(action.type) {
    case TICKETS_FETCHED :
      return action.payload
    case TICKET_CREATED:
      return [...state, action.payload]
    default: 
      return state
  }
}

export default reducer