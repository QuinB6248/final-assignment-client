import request from 'superagent'
//const baseUrl = 'http://localhost:4000'
const baseUrl ='https://pure-hamlet-15394.herokuapp.com'


//////////////////FETCH EVENTS ACTION//////////////////
export const EVENTS_FETCHED = 'EVENTS_FETCHED'
const eventsFetched = (events) => ({
  type: EVENTS_FETCHED,
  payload: events
})
export const fetchEvents = (limit, offset) => (dispatch) => {
  request(`${baseUrl}/events?limit=${limit}&offset=${offset}`)
    .then(response => dispatch(eventsFetched(response.body.events)))
    .catch(console.error)
}

//////////////////SEARCH EVENT ACTION////////////////
export const searchEvents = (name, user) => (dispatch) => {
  console.log('SEARCH', user)
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

export const createEvent = (data) => (dispatch) => {
  //const jwt = getState().authUser
  //const jwt = sessionStorage.getItem("token")
  request
    .post(`${baseUrl}/events`)
    //.set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .withCredentials()
    .then(response =>dispatch(eventCreated(response.body)))
    .catch(console.error)
}

//////////////////UPDATE EVENTS ACTION//////////////////
export const EVENT_UPDATED = 'EVENT_UPDATED'
const eventUpdated = event => ({
  type: EVENT_UPDATED,
  payload: event
})

export const updateEvent = (id, data) => (dispatch) => {
  request
    .patch(`${baseUrl}/events/${id}`)
    .send(data)
    .withCredentials()
    .then(response => dispatch(eventUpdated(response.body)))
    .catch(console.error)
}

//////////////////DELETE EVENTS ACTION//////////////////
export const EVENT_DELETED = 'EVENT_DELETED'
const eventDeleted = id => ({
  type: EVENT_DELETED,
  payload: id
})

export const deleteEvent = (id) => (dispatch) => {
  request
    .delete(`${baseUrl}/events/${id}`)
    .withCredentials()
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