import request from 'superagent'
const baseUrl = 'http://localhost:4000'


export const TICKET_FETCHED = 'TICKET_FETCHED'
const ticketFetched = (ticket) => ({
  type: TICKET_FETCHED,
  payload: ticket
})
export const fetchTicket = (id, ticketId) => (dispatch, getState) => {
  if (getState().events) return
  request(`${baseUrl}/events/${id}/tickets/${ticketId}/comments`)
    .then(response => {
      dispatch(ticketFetched(response.body))})
    .catch(console.error)
}


export const COMMENT_CREATED = 'COMMENT_CREATED'
const commentCreated = comment => ({
  type: COMMENT_CREATED,
  payload: comment
})
export const createComment = (id, ticketId, data) => (dispatch, getState) => {
  //const jwt = getState().authUser
  const jwt = sessionStorage.getItem("token")
  request
    .post(`${baseUrl}/events/${id}/tickets/${ticketId}/comments`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response => {
      dispatch(commentCreated(response.body))})
    .catch(console.error)
}


export const TICKET_UPDATED = 'TICKET_UPDATED'
const ticketUpdated = ticket => ({
  type: TICKET_UPDATED,
  payload: ticket
})
export const updateTicket = (id, ticketId, data) => (dispatch, getState) => {
  //const jwt = getState().authUser
  const jwt = sessionStorage.getItem("token")
  request
    .patch(`${baseUrl}/events/${id}/tickets/${ticketId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response => {
      dispatch(ticketUpdated(response.body))
    })
    .catch(console.error)
}
