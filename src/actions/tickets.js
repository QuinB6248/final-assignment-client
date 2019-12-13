import request from 'superagent'
const baseUrl = 'http://localhost:4000'


export const TICKETS_FETCHED = 'TICKETS_FETCHED'
const ticketsFetched = (tickets) => ({
  type: TICKETS_FETCHED,
  payload: tickets
})
export const fetchTickets = (id) => (dispatch, getState) => {
  console.log('HEy', getState().events)
  if (getState().events) return
  request(`${baseUrl}/events/${id}/tickets`)
    .then(response => {
      console.log('TICKEeeeeeTS', response.body)
      dispatch(ticketsFetched(response.body))})
    .catch(console.error)
}


export const TICKET_CREATED = 'TICKET_CREATED'
const ticketCreated = ticket => ({
  type: TICKET_CREATED,
  payload: ticket
})
export const createTicket = (id, data) => (dispatch, getState) => {
  const jwt = getState().authUser
  request
    .post(`${baseUrl}/events/${id}/tickets`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response => {
      dispatch(ticketCreated(response.body))})
    .catch(console.error)
}