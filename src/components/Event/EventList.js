import React from 'react'
import '../component.css'
import EventForm from './EventForm'
import EventSearchForm from './EventSearchForm'

export default function EventsList(props) {
  if(!props.events) {
    return 'loading...'
  }
 
  const {events, onAdd, onChange, onSubmit, values, clickNext, clickPrevious, linkClick, logOut, logIn, onDelete, onSubmitUpdate, onUpdate, submitSearch}  = props
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
            <a  href={`/events/${event.id}/tickets`} className='buttonField eventNameLink'><h3 >{event.name}</h3></a> 
          </div>
          <div className='imageSpace'>
            <img className='imgSize'src={event.image} alt=""/>
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
          { sessionStorage.getItem("name") === event.user.name ? 
            <div className='nameButtonSpace'>
              
                <div className='buttonEvent ' onClick={()=>onDelete(event.id)}>DELETE</div> 
                <div className='buttonEvent ' onClick={()=>onUpdate(event.id)}>UPDATE</div> 
              
            </div>
            :<div className='nameButtonSpace'></div>
          }
          {id === event.id? <div className='nameButtonSpace2'>{updateForm}<h6>author: {event.user.name}</h6></div>: <div className='nameButtonSpace2'><h6>author: {event.user.name}</h6></div> }
        </div>
      </li>)
  
  
    return (
      <div className='containerSpace'>
      
        <div className='gridSpace'>
          <div className='headerSearchLogin'>
            <div className='eventLoginSearch'> 
              <a  href={`/events`} className='buttonField allEventsLink'>all events</a>
            </div>
            <div className='eventLoginSearch'> 
              <EventSearchForm onChange={onChange} onSubmit={submitSearch} values={values}/>
            </div>
            <div className='eventLoginSearch'> 
              
              <div >
                {sessionStorage.getItem("name")? 
                  <div className='eventLoginFields'>
                    <div className='loginButtonSpace buttonField ' onClick={logOut}><div className='loginText'>logout</div></div>
                    <p >Welkom {sessionStorage.getItem("name")}  </p>
                  </div>
                  : 
                  <div  className='eventLoginFields'>
                    <div className='loginButtonSpace buttonField ' onClick={logIn}><div className='loginText'>login</div></div>
                  </div>
                  
                }
              </div>
            
            </div>
          </div>
        </div>
       
        <div className='gridSpace'>
          <div className='headerSpace'>
            <h3>EVENTS</h3>
          </div>
        </div>
        {listOfEvents}
        <div className='gridSpace'>
          <div className='buttonField eventButtonSpace2' onClick={onAdd}>
            <div className='eventText' > ADD EVENT</div> 
           {/* <div className='backgroundButtons backgroundButtonEvent' ></div> */}
            </div>

          <div >
            {form}
          </div>
        </div>

        <div className='gridSpace'>
          <div className='buttonSpace'>
        
            {curOffset === 0 ? <h6>First Page</h6> :  <div className='pagesButton' onClick={clickPrevious}>{'previous page'}</div>}
            {props.events.length >= 6 ?  <div className='pagesButton'  onClick={clickNext}>{'next page'}</div> : <h6>Last Page</h6>}
          
           
          </div>
        </div>
      </div>
    )
}
