import React from 'react'
import '../component.css'
import EventForm from './EventForm'
import EventSearchForm from './EventSearchForm'

export default function EventsList(props) {
  if(!props.events) {
    return 'loading...'
  }
 
  const {events, onAdd, onChange, onSubmit, values, clickNext, clickPrevious, linkClick, logOut, logIn, authenticated, onDelete, onSubmitUpdate, onUpdate, submitSearch}  = props
  const {curOffset} = values
  const {editMode} = values
  const {editModeUpdate} = values
  const {id} = values

  const eventForm =  <EventForm onChange={onChange} onSubmit={onSubmit} values={values}/>
  const eventFormUpdate =  <EventForm onChange={onChange} onSubmit={onSubmitUpdate} values={values}/>
  const form = editMode && eventForm
  const updateForm = editModeUpdate && eventFormUpdate
  const listOfEvents = 
  events
    .map((event, index) => 
      <li className='nobull' key={index}  onClick={linkClick}>
        <div className='eventSpace'>
          <div className='titleSpace'>
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
          { document.cookie.split('=')[1] === event.user.name ? 
            <div className='nameButtonSpace'>
              <div>
                <button onClick={()=>onDelete(event.id)}>DELETE</button> 
                <button onClick={()=>onUpdate(event.id)}>UPDATE</button> 
              </div>
            </div>
            :<div className='nameButtonSpace'></div>
          }
          {id === event.id? <div className='nameButtonSpace2'>{updateForm}<h6>author: {event.user.name}</h6></div>: <div className='nameButtonSpace2'><h6>author: {event.user.name}</h6></div> }
        </div>
      </li>)
  
  
    return (
      <div className='containerSpace'>
      
        <div className='footerSpace'>
          <div className='loginButtons'>
          <div className='eventLoginSearch'> 
            <a href={`/events`}>EVENTS</a>
            </div>
            <div className='eventLoginSearch'> 
              <EventSearchForm onChange={onChange} onSubmit={submitSearch} values={values}/>
            </div>
            <div className='eventLoginSearch'> 
            {authenticated? <div className='eventLoginFields'><button onClick={logOut}>logout</button><p>Welkom {document.cookie.split('=')[1]}  </p></div>: <div className='eventLoginFields'><button onClick={logIn}>login</button></div>}
            </div>
          </div>
        </div>
       
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
        
            {curOffset === 0 ? <h6>First Page</h6> :  <button onClick={clickPrevious}>{'<--prev'}</button>}
            {props.events.length >= 6 ?  <button onClick={clickNext}>{'next-->'}</button> : <h6>Last Page</h6>}
          
           
          </div>
        </div>
      </div>
    )
}
