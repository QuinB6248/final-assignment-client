import React from 'react'
import '../component.css'
import EventForm from './EventForm'
import EventSearchForm from './EventSearchForm'

export default function EventsList(props) {
  if(!props.events) {
    return 'loading...'
  }
 
  const {events, onAdd, removeForm, onChange, onSubmit, values, clickNext, clickPrevious, linkClick, logOut, logIn, onDelete, onSubmitUpdate, onUpdate, submitSearch}  = props
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
            <a  href={`/events/${event.id}/tickets`} >
            <div className='imageSpace' style={{ 
              backgroundImage: `url(${event.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100%'}}>
              <div className='eventNameLink'>{event.name}</div>
            </div>
            </a> 
          <div className='dateSpace'>
            {event.start} t/m {event.end}
          </div>
          <div className='descriptionSpace'>
            <p>{event.description}</p>
          </div>
          <div className='priceSpace'>
            <p>Average Price:  €{event.avg_price}</p>
          </div>
          {<div className='nameButtonSpaceContainer'>
          { sessionStorage.getItem("name") === event.user.name ? 
            <div className='nameButtonSpace'>
                <div className='buttonEvent ' onClick={()=>onDelete(event.id)}>
                  <span className="material-icons">clear</span>
                </div> 
                <div className='buttonEvent ' onClick={()=>onUpdate(event.id)}>
                  <span className="material-icons">edit</span>
                </div> 
            </div>:<div className='nameButtonSpace'></div>
          }
          {id === event.id? 
            <div className='nameButtonSpace2'>{updateForm}
              <div className='authorSpace'>author: {event.user.name}</div>
              {editModeUpdate === true? <div onClick={removeForm} className= 'removeForm' >X Close form</div>: <div></div>}
            </div>: 
            <div className='nameButtonSpace2'>author: {event.user.name}</div> 
          }
          </div>
        }
        </div>
      </li>)
  
  
    return (
      <div className='containerSpace'>
        <div className='gridSpace'>
          <div className='headerSearchLogin'>
            <div className='eventLoginSearch'> 
              <a  href={`/events`} className='buttonField2 allEventsLink'>
                <span className="material-icons">castle</span>
              </a>
            </div>
            <div className='eventLoginSearch'> 
              <div>
                {sessionStorage.getItem("name")? 
                  <div className='eventLoginFields'>
                    <div className='loginButtonSpace' onClick={logOut}><div className='loginText'>logout</div></div>
                    <p >Welkom {sessionStorage.getItem("name")}  </p>
                  </div>
                  : 
                  <div  className='eventLoginFields'>
                    <div className='loginButtonSpace ' onClick={logIn}><div className='loginText'>login</div></div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
       
        <div className='gridSpace'>
          <div className='headerSpace'>
            <div className='eventsHeader'>
              Creepy festivals
              <div className='eventsSubHeader'>
                Buy and sell tickets for the best Halloween Festivals at your own risk!
              </div>
            </div>
        
           
          </div>
         
          <div className=' eventButtonSpace2' >
            <div className='buttonField2' >
              <div className='eventText' onClick={onAdd}> ADD EVENT</div> 
            </div>
            <EventSearchForm onChange={onChange} onSubmit={submitSearch} values={values}/>
          </div>
          <div >
            {form}
          </div>
          {editMode === true? <div onClick={removeForm} className= 'removeForm' >X Close form</div>: <div></div>}
        </div>
        {listOfEvents}
        <div className='gridSpace'></div>

        <div className='gridSpace'>
          <div className='buttonSpace'>
            {curOffset === 0 ? <p>First Page</p> :  <div className='pagesButton' onClick={clickPrevious}>{'previous page'}</div>}
            {props.events.length >= 6 ?  <div className='pagesButton'  onClick={clickNext}>{'next page'}</div> : <p>Last Page</p>}
          </div>
        </div>
      </div>
    )
}
