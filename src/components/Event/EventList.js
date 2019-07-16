import React from 'react'
import { Link } from 'react-router-dom'
import '../component.css'

export default function EventsList(props) {
  if(!props.events) {
    return 'loading...'
    }
  const events  = props.events
  
  const listOfEvents = 
  events
    .map(event => 
      <li className='nobull' key={event.id}>
        <Link to={`/events/${event.id}`}>
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
    </div>
  )
}
