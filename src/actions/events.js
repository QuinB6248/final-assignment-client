import request from 'superagent'
const baseUrl = 'http://localhost:4000'

export const EVENTS_FETCHED = 'EVENTS_FETCHED'

const eventsFetched = events => ({
  type: EVENTS_FETCHED,
  payload: events
})

export const fetchEvents = () => (dispatch, getState) => {
  if (getState().events) return
  request(`${baseUrl}/events`)
    .then(response => dispatch(eventsFetched(response.body)))
    .catch(console.error)
}

export const EVENT_CREATED = 'EVENT_CREATED'
const eventCreated = event => ({
  type: EVENT_CREATED,
  payload: event
})
export const createEvent = (data) => (dispatch, getState) => {
  const jwt = getState().authUser
  request
    .post(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response => dispatch(eventCreated(response.body)))
    .catch(console.error)
}

