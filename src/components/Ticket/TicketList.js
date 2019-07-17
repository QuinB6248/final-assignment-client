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
        <Link to={`/tickets/${ticket.id}`}>
          <div>
            <div>
              <h2>{ticket.event.name}</h2>
              <h4>{ticket.description}€{ticket.price}</h4>
             
            </div>
          </div>
        </Link>
      </li>)
  
  
    return (
    <div>
     
     {listOfTickets}
    
     {form}
      <button onClick={onAdd}>ADD</button>
    </div>
  )
}