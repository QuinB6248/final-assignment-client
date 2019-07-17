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
      console.log('RSBODY', response.body)
      dispatch(ticketFetched(response.body))})
    .catch(console.error)
}