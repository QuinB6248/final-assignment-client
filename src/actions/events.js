import request from 'superagent'
//const baseUrl = 'http://localhost:4000'
const baseUrl ='https://pure-hamlet-15394.herokuapp.com'


export const EVENTS_FETCHED = 'EVENTS_FETCHED'
const eventsFetched = (events) => ({
  type: EVENTS_FETCHED,
  payload: events
})
export const fetchEvents = (limit, offset) => (dispatch, getState) => {
  if (getState().nameLogin) return
  request(`${baseUrl}/events?limit=${limit}&offset=${offset}`)
    .then(response => {
      console.log('REEEEEEE', response.body.events)
      dispatch(eventsFetched(response.body.events))
    })
    .catch(console.error)
}


export const EVENTS_COUNT = 'EVENTS_COUNT'
const eventsCount = (total, numOfPages) => ({
  type: EVENTS_COUNT,
  payload: [total, numOfPages]
})
export const countEvents = () => (dispatch) => {
  request(`${baseUrl}/events`)
    .then(response => {
      dispatch(eventsCount(response.body.total, response.body.numOfPages))})
    .catch(console.error)
}


export const EVENT_CREATED = 'EVENT_CREATED'
const eventCreated = (event) => ({
  type: EVENT_CREATED,
  payload: event
})
export const createEvent = (data) => (dispatch, getState) => {
  //const jwt = getState().authUser
  const jwt = sessionStorage.getItem("token")
  request
    .post(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response =>{ 
      dispatch(eventCreated(response.body))})
    .catch(console.error)
}

export const EVENT_UPDATED = 'EVENT_UPDATED'
const eventUpdated = event => ({
  type: EVENT_UPDATED,
  payload: event
})
export const updateEvent = (id, data) => (dispatch, getState) => {
  //const jwt = getState().authUser
  
  const jwt = sessionStorage.getItem("token")
  
  request
    .patch(`${baseUrl}/events/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response => {
    
      dispatch(eventUpdated(response.body))
    })
    .catch(console.error)
}

export const EVENT_DELETED = 'EVENT_DELETED'
const eventDeleted = id => ({
  type: EVENT_DELETED,
  payload: id
})

export const deleteEvent = (id) => (dispatch) => {
  
  const jwt = sessionStorage.getItem("token")
  request
    .delete(`${baseUrl}/events/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(() => dispatch(eventDeleted(id)))
    .catch(console.error)
}