import { TICKET_FETCHED, COMMENT_CREATED, TICKET_UPDATED  } from '../actions/ticket'
  

const reducer = (state = null, action) => {
  switch(action.type) {
    case TICKET_FETCHED :
      return action.payload
    case COMMENT_CREATED:
        console.log('ActionCOMM', state)
      return {...state, comments: [...state.comments, action.payload]}
    case TICKET_UPDATED :
      console.log('Action', state.comments)
      return {...state, comments: state.comments, ticket:action.payload}
    default: 
      return state
  }
}

export default reducer