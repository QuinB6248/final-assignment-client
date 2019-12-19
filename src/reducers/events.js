import { EVENTS_FETCHED, EVENTS_COUNT, EVENT_CREATED } from '../actions/events'

  

const reducer = (state = null, action) => {
  switch(action.type) {
    case EVENTS_FETCHED :
      return action.payload
    case EVENTS_COUNT:
      return action.payload
    case EVENT_CREATED: 
      return [...state, action.payload]
    default: 
      return state
  }
}

export default reducer