import { EVENTS_FETCHED, EVENTS_COUNT, EVENT_CREATED, EVENT_UPDATED, EVENT_DELETED } from '../actions/events'



const reducer = (state = null, action) => {
  switch(action.type) {
    case EVENTS_FETCHED :
      return action.payload.events
    case EVENTS_COUNT:
      return action.payload
    case EVENT_CREATED: 
      return [...state, action.payload]
    case EVENT_UPDATED:
      return state.map(event => event.id === action.payload.id ? event = action.payload : event)
    case EVENT_DELETED:
     return state.filter(event => event.id !== action.payload)
    default: 
      return state
  }
}

export default reducer