import request from 'superagent'
const baseUrl = 'http://localhost:4000'
//const baseUrl ='https://secure-dusk-52930.herokuapp.com'


//////////////////FETCH EVENTS ACTION//////////////////
export const EVENTS_FETCHED = 'EVENTS_FETCHED'
const eventsFetched = (events, jwt) => ({
  type: EVENTS_FETCHED,
  payload: {events, jwt}
})
export const fetchEvents = (limit, offset) => (dispatch, getState) => {
  const jwt = getState().authUser
  request(`${baseUrl}/events?limit=${limit}&offset=${offset}`)
    .then(response => dispatch(eventsFetched(response.body.events, jwt)))
    .catch(console.error)
}

//////////////////SEARCH EVENT ACTION////////////////
export const searchEvents = (name, user) => (dispatch) => {
  request(`${baseUrl}/events?name=${name}&user=${user}`)
    .then(response => dispatch(eventsFetched(response.body.events)))
    .catch(console.error)
}

//////////////////CREATE EVENTS ACTION//////////////////
export const EVENT_CREATED = 'EVENT_CREATED'
const eventCreated = (event) => ({
  type: EVENT_CREATED,
  payload: event
})

export const createEvent = (data, jwt) => (dispatch) => {
  request
    .post(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response =>dispatch(eventCreated(response.body)))
    .catch(console.error)
}

//////////////////UPDATE EVENTS ACTION//////////////////
export const EVENT_UPDATED = 'EVENT_UPDATED'
const eventUpdated = event => ({
  type: EVENT_UPDATED,
  payload: event
})

export const updateEvent = (id, data, jwt) => (dispatch) => {
  request
    .patch(`${baseUrl}/events/${id}`)
    .send(data)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => dispatch(eventUpdated(response.body)))
    .catch(console.error)
}

//////////////////DELETE EVENTS ACTION//////////////////
export const EVENT_DELETED = 'EVENT_DELETED'
const eventDeleted = id => ({
  type: EVENT_DELETED,
  payload: id
})

export const deleteEvent = (id, jwt) => (dispatch) => {
  request
    .delete(`${baseUrl}/events/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(() => dispatch(eventDeleted(id)))
    .catch(console.error)
}

//////////////////COUNT EVENTS ACTION//////////////////
export const EVENTS_COUNT = 'EVENTS_COUNT'
const eventsCount = (total, numOfPages) => ({
  type: EVENTS_COUNT,
  payload: [total, numOfPages]
})

export const countEvents = () => (dispatch) => {
  request(`${baseUrl}/events`)
    .then(response => dispatch(eventsCount(response.body.total, response.body.numOfPages)))
    .catch(console.error)
}