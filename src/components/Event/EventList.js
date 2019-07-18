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
        <div className='headerSpace'>
        <Link to={`/events/${event.id}/tickets`}>
          <div >
            <h2>{event.name}</h2>
          </div>
        </Link>
        </div>
        <div className='eventSpace'>
          <div className='imageSpace'>
            <img className='imgSize'src={event.image}/>
          </div>
          <div className='descriptionSpace'>
            <h4>{event.description}</h4>
          </div>
          <div className='priceSpace'>
            <h4>€{event.avg_price}</h4>
          </div>
          <div className='dateSpace'>
            <p>start:{event.start}</p>
          </div>
          <div className='dateSpace'>
            <p>end:{event.end}</p>
          </div>
        </div>
       
      </li>)
  
  
    return (
    <div>
      {listOfEvents}
      
      <div>
        {form}
      </div>
      <div className='headerSpace'>
        <button onClick={onAdd}>ADD AN EVENT</button>
      </div>
      
     
    </div>
  )
}
