import React from 'react'
import { Link } from 'react-router-dom'
import '../component.css'
import EventForm from './EventForm'


export default function EventsList(props) {
  if(!props.events) {
    return 'loading...'
    }
 
  const { events, onAdd, onChange, onSubmit, values, handleClick}  = props
  const {editMode} = values
  const eventForm =  <EventForm onChange={onChange} onSubmit={onSubmit} values={values}/>
  const form = editMode && eventForm
  
  const indexOfLastEvent = values.currentPage * values.eventsPerPage
  const indexOfFirstEvent = values.indexOfLastEvent - values.eventsPerPage
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent)
  const pageNumbers = []
    for (let i = 1; i <= Math.ceil(events.length / values.eventsPerPage); i++) {
      pageNumbers.push(i);
    }
  const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
        > {number}
        </li>
      );
    });
  
  
  const listOfEvents = 
  currentEvents
    .map((event, index) => 
      <li className='nobull' key={index}>
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
        <div className='page-numbers'>
          {renderPageNumbers}
        </div>
        
      </div>
    )
}
