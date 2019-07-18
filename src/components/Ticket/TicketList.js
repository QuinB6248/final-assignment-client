import React from 'react'
import { Link } from 'react-router-dom'
import '../component.css'
import TicketForm from './TicketForm'


export default function TicketsList(props) {
  if(!props.tickets) {
    return 'loading...'
    }
  const { tickets, onAdd, onChange, onSubmit, values }  = props
  
  const {editMode} = values
  const ticketForm =  <TicketForm onChange={onChange} onSubmit={onSubmit} values={values}/>
  const form = editMode && ticketForm
  
 
  
  const listOfTickets = 
  tickets
    .map(ticket => 
      <li className='nobull' key={ticket.id}>
        <div className='headerSpace'>
          <Link to={`events/${ticket.event.id}/tickets/${ticket.id}`}>
            <div >
              <h2>{ticket.event.name}</h2>
            </div>
          </Link>
        </div >
        <div className='eventSpace'>
          <div className='imageSpace'>
            <img className='imgSize'src={ticket.image}/>
          </div>
          <div>
            <h4>{ticket.description}</h4>
          </div>
          <div>
            <h4>€{ticket.price}</h4>
          </div>
        </div>
        
      </li>)
  
  
    return (
    <div>
     
     {listOfTickets}
    
     {form}
     <div className='headerSpace'>
     <button onClick={onAdd}>ADD A TICKET</button>
      </div>
      
    </div>
  )
}