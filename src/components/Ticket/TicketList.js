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
          
            <div >
              <a  href={`events/${ticket.eventId}/tickets/${ticket.id}`}><h2>{ticket.name}</h2></a>
              
            </div>
        
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
          {ticket.risk < 15 ? 
          <div className='green'></div> : 
          ticket.risk > 70 ? 
          <div className='red'></div> : 
          <div className='yellow'></div>
          }
        </div>
      </li>)
  
    return (
      <div>
        <div className='headerSpace'>
        <a  href={`/events`}>HOME</a>
        </div>
        {listOfTickets}
        {form}
        <div className='headerSpace'>
          <button onClick={onAdd}>ADD A TICKET</button>
        </div>
      </div>
  )
}