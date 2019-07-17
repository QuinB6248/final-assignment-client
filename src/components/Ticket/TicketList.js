import React from 'react'
import { Link } from 'react-router-dom'
import '../component.css'
import TicketForm from './TicketForm'
import {Route} from 'react-router-dom'
import {withRouter} from 'react-router'
import TicketDetailsContainer from '../TicketDetails/TicketDetailsContainer'

export default function TicketsList(props) {
  if(!props.tickets) {
    return 'loading...'
    }
  const { tickets, onDelete, onEdit, onAdd, onChange, onSubmit, values, authenticated }  = props
  
  const {editMode} = values
  const ticketForm =  <TicketForm onChange={onChange} onSubmit={onSubmit} values={values}/>
  const form = editMode && ticketForm
  console.log('AUTH', authenticated)
 
  
  const listOfTickets = 
  tickets
    .map(ticket => 
      <li className='nobull' key={ticket.id}>
        <Link to={`/tickets/${ticket.id}`}>
          <div>
            <div>
              <h2>{ticket.event.name}</h2>
              <h4>{ticket.description}€{ticket.avg_price}</h4>
              <p>start:{ticket.start}</p><p>end:{ticket.end}</p>
            </div>
          </div>
        </Link>
      </li>)
  
  
    return (
    <div>
     
     {listOfTickets}
     {/* <Route path="/events/:id/tickets/:ticketId" exact component={TicketDetailsContainer} /> */}
     {form}
      <button onClick={onDelete}>DELETE</button>
      <button onClick={onEdit}>EDIT</button>
      <button onClick={onAdd}>ADD</button>
    </div>
  )
}