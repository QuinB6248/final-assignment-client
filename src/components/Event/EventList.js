import React from 'react'
import '../component.css'
import EventForm from './EventForm'




export default function EventsList(props) {
  if(!props.events) {
    return 'loading...'
  }
 
  const {events, onAdd, onChange, onSubmit, values, clickNext, clickPrevious, linkClick, logOut, logIn, authenticated, onDelete, onSubmitUpdate, onUpdate}  = props
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
          {sessionStorage.getItem("name") === event.user.name ? 
          <h6>
            <button onClick={()=>onDelete(event.id)}>DELETE</button> 
            <button onClick={()=>onUpdate(event.id)}>UPDATE</button> 
            {id === event.id? updateForm: <br></br> }
          </h6>
             :<h6>{event.user.name}</h6>}
        </div>
          
      </li>)
  
  
    return (
      <div className='containerSpace'>
        
        <div className='footerSpace'>
        {/* <div className='homeSpace'>
          <a href={`/events`}>EVENTS</a>
        </div> */}
        
          <div className='loginButtons'>
           <a href={`/events`}>EVENTS</a>
            {authenticated? <div><p>logged in: {sessionStorage.getItem("name")}  </p><button onClick={logOut}>logout</button></div>: <div><button onClick={logIn}>login</button></div>}
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
            <button onClick={clickPrevious}>{'<--prev'}</button>
            <button onClick={clickNext}>{'next-->'}</button>
          </div>
        </div>
      </div>
    )
}
