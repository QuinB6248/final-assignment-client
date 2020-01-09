import { TICKET_FETCHED, COMMENT_CREATED, TICKET_UPDATED, TICKET_DELETED  } from '../actions/ticket'

  

const reducer = (state = null, action) => {
  switch(action.type) {
    case TICKET_FETCHED :
      return action.payload
    case COMMENT_CREATED:
      return {...state, comments: [...state.comments, action.payload]}
    case TICKET_UPDATED :
      return {...state, comments: state.comments, ticket:action.payload}
    // case  TICKET_DELETED: 
    //  return state
    default: 
      return state
  }
}

export default reducer