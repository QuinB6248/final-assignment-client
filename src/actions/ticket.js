import request from 'superagent'
const baseUrl = 'http://localhost:4000'
//const baseUrl ='https://pure-hamlet-15394.herokuapp.com'


/////////////////////FETCH TICKET ACTION/////////////////
export const TICKET_FETCHED = 'TICKET_FETCHED'
const ticketFetched = (ticket) => ({
  type: TICKET_FETCHED,
  payload: ticket
})

export const fetchTicket = (id, ticketId) => (dispatch) => {
  request(`${baseUrl}/events/${id}/tickets/${ticketId}/comments`)
    .then(response => dispatch(ticketFetched(response.body)))
    .catch(console.error)
}

//////////////////////CREATE COMMENT ACTION///////////////////
export const COMMENT_CREATED = 'COMMENT_CREATED'
const commentCreated = comment => ({
  type: COMMENT_CREATED,
  payload: comment
})

export const createComment = (id, ticketId, data) => (dispatch, getState) => {
  request
    .post(`${baseUrl}/events/${id}/tickets/${ticketId}/comments`)
    .send(data)
    .withCredentials()
    .then(response => dispatch(commentCreated(response.body)))
    .catch(console.error)
}

/////////////////////UPDATE TICKET ACTION////////////////////////
export const TICKET_UPDATED = 'TICKET_UPDATED'
const ticketUpdated = ticket => ({
  type: TICKET_UPDATED,
  payload: ticket
})

export const updateTicket = (id, ticketId, data) => (dispatch, getState) => {
  request
    .patch(`${baseUrl}/events/${id}/tickets/${ticketId}`)
    .send(data)
    .withCredentials()
    .then(response => dispatch(ticketUpdated(response.body)))
    .catch(console.error)
}

//////////////////DELETE TICKET ACTION//////////////////
export const TICKET_DELETED = 'TICKET_DELETED'
const ticketDeleted = id => ({
  type: TICKET_DELETED,
  payload: id
})

export const deleteTicket = (id, ticketId) => (dispatch) => {
  request
    .delete(`${baseUrl}/events/${id}/tickets/${ticketId}`)
    .withCredentials()
    .then(() => dispatch(ticketDeleted(ticketId)))
    .catch(console.error)
}