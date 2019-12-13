import React from 'react'
import '../component.css'
import EventForm from './EventForm'
//import {Link} from 'react-router-dom'



export default function EventsList(props) {
  if(!props.events) {
    return 'loading...'
  }
 
  const {events, onAdd, onChange, onSubmit, values, clickNext, clickPrevious, linkClick}  = props
  const {editMode} = values
  const eventForm =  <EventForm onChange={onChange} onSubmit={onSubmit} values={values}/>
  const form = editMode && eventForm
  const listOfEvents = 
  events
    .map((event, index) => 
      <li className='nobull' key={index}  onClick={linkClick}>
        <div className='eventSpace'>
          <div className='titleSpace'>
            {/* <div><Link to={`/events/${event.id}/tickets`}><h2>{event.name}</h2></Link></div> */}
            <a  href={`/events/${event.id}/tickets`}><h3 >{event.name}</h3></a> 
          </div>
          <div className='imageSpace'>
            <img className='imgSize'src={event.image}/>
          </div>
          <div className='descriptionSpace'>
            <h4>{event.description}</h4>
          </div>
          <div className='priceSpace'>
            <p>Average Price:</p>
            <h4>€{event.avg_price}</h4>
          </div>
          <div className='dateSpace'>
            <p>date:</p>
            {event.start} t/m {event.end}
          </div>
          
        </div>
        
      </li>)
  
  
    return (
      <div className='containerSpace'>
        <div className='footerSpace'>
          <div className='headerSpace'>
            <h3>EVENTS</h3>
          </div>
        </div>
        {listOfEvents}
        <div className='footerSpace'>
          <div className='eventButtonSpace'>
            <button onClick={onAdd}>ADD AN EVENT</button>
          </div>
          <div >
            {form}
            </div>
        </div>
        <div className='footerSpace'>
          <div className='buttonSpace'>
            <button onClick={clickPrevious}>{'<--prev'}</button>
            <button onClick={clickNext}>{'next-->'}</button>
          </div>
        </div>
      </div>
    )
}
