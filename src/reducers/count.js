import { EVENTS_COUNT } from '../actions/events'
  

const reducer = (state = null, action) => {
  switch(action.type) {
    case EVENTS_COUNT:
      return action.payload
    default: 
      return state
  }
}

export default reducer