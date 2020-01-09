import request from 'superagent'
const baseUrl = 'http://localhost:4000'
//const baseUrl ='https://secure-dusk-52930.herokuapp.com'


///////////////////FETCH TICKETS ACTION///////////////////////////
export const TICKETS_FETCHED = 'TICKETS_FETCHED'
const ticketsFetched = (tickets) => ({
  type: TICKETS_FETCHED,
  payload: tickets
})

export const fetchTickets = (id) => (dispatch) => {
  request(`${baseUrl}/events/${id}/tickets`)
    .then(response => dispatch(ticketsFetched(response.body)))
    .catch(console.error)
}

//////////////////CREATE TICKETS ACTION/////////////////////////
export const TICKET_CREATED = 'TICKET_CREATED'
const ticketCreated = ticket => ({
  type: TICKET_CREATED,
  payload: ticket
})

export const createTicket = (id, data, jwt) => (dispatch) => {
  request
    .post(`${baseUrl}/events/${id}/tickets`)
    .send(data)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => dispatch(ticketCreated(response.body.ticket)))
    .catch(console.error)
}

