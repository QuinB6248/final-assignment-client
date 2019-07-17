import React from 'react'
import { Link } from 'react-router-dom'
import '../component.css'
import EventForm from './EventForm'

export default function EventsList(props) {
  if(!props.events) {
    return 'loading...'
    }
 
  const { events, onAdd, onChange, onSubmit, values, authenticated }  = props
  
  const {editMode} = values
  const eventForm =  <EventForm onChange={onChange} onSubmit={onSubmit} values={values}/>
  const form = editMode && eventForm
  const listOfEvents = 
  events
    .map(event => 
      <li className='nobull' key={event.id}>
        <Link to={`/events/${event.id}/tickets`}>
          <div>
            <div>
              <h2>{event.name}</h2>
              <h4>{event.description}€{event.avg_price}</h4>
              <p>start:{event.start}</p><p>end:{event.end}</p>
            </div>
          </div>
        </Link>
      </li>)
  
  
    return (
    <div>
      {listOfEvents}
      <div>
        {form}
      </div>
      <div>
        <button onClick={onAdd}>ADD AN EVENT</button>
      </div>
      
     
    </div>
  )
}
