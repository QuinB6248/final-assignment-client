import React from 'react'
import { Link } from 'react-router-dom'
import '../component.css'
import EventForm from './EventForm'


export default function EventsList(props) {
  if(!props.events) {
    return 'loading...'
    }
 
  const { events, onAdd, onChange, onSubmit, values, clickNext, clickPrevious, linkClick}  = props
  const {editMode} = values
  const eventForm =  <EventForm onChange={onChange} onSubmit={onSubmit} values={values}/>
  const form = editMode && eventForm
  console.log('EVENTS', Math.ceil(events.length / values.eventsPerPage))
  
  const listOfEvents = 
  events
    .map((event, index) => 
      <li className='nobull' key={index}  onClick={linkClick}>
        <div className='headerSpace'>
          <div>
            <a  href={`/events/${event.id}/tickets`}><h2 >{event.name}</h2></a>
          </div>
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
        <div className='headerSpace'>
         
          <button onClick={clickPrevious}>PREVIOUS</button>
          <button onClick={clickNext}>NEXT</button>
        </div>
        
        
      </div>
    )
}
