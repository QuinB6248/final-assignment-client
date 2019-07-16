import request from 'superagent'
const baseUrl = 'http://localhost:4000'


export const TICKETS_FETCHED = 'TICKETS_FETCHED'
const eventsFetched = (events) => ({
  type: TICKETS_FETCHED,
  payload: events
})
export const fetchTickets = (id) => (dispatch, getState) => {
  if (getState().events) return
  request(`${baseUrl}/events/${id}/tickets`)
    .then(response => {
      console.log('RSBODY', response.body)
      dispatch(eventsFetched(response.body))})
    .catch(console.error)
}


export const TICKET_CREATED = 'EVENT_CREATED'
const ticketCreated = event => ({
  type: TICKET_CREATED,
  payload: event
})
export const createTicket = (id, data) => (dispatch, getState) => {
  const jwt = getState().authUser
  request
    .post(`${baseUrl}/events/${id}/tickets`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response => dispatch(ticketCreated(response.body)))
    .catch(console.error)
}