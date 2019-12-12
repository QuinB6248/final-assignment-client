import React from 'react'
import TicketForm from './TicketForm'
import './tickets.css'

export default function TicketsList(props) {
  if(!props.tickets) {
    return 'loading...'
    }

  const { tickets, onAdd, onChange, onSubmit, values }  = props
  const {editMode} = values
  const ticketForm =  <TicketForm onChange={onChange} onSubmit={onSubmit} values={values}/>
  const form = editMode && ticketForm
  const eventMap=tickets.map(ticket=> ticket.event)
  const eventName=eventMap[0]
  
  const listOfTickets = 
  tickets
    .map(ticket => 
      <a href={`tickets/${ticket.id}`}>
        <li className='nobull' key={ticket.id}>
          <div className='ticketContainer'>
            <div className='ticketImageSpace' style={{background: "linear-gradient(rgba(255,255,255,1.2), rgba(255,255,255,-0.5)), url(" + ticket.image  + ")"}}>
              <img className='ticketImage'src={ticket.image}/>
            </div>
            <div className='ticketInfoSpace'>
              <div className='ticketDescriptionSpace'>
                <p>{ticket.description}</p>
              </div>
              <div className='ticketPriceSpace'>
                <div className='ticketPrice'>
                  <h3>ticketprice: €{ticket.price}</h3>
                </div>
                { ticket.risk < 15 ? 
                  <div className='green'><p className='risk'>risk</p></div> : 
                  ticket.risk > 70 ? 
                  <div className='red'><p className='risk'>risk</p></div> : 
                  <div className='yellow'><p className='risk'>risk</p></div>
                }
              </div>
            </div>
          </div >
        </li>  
      </a>)
  
    return (
      <div className='containerTicketsSpace'>
        <div className='homeSpace'>
          <a  href={`/events`}>EVENTS</a>
        </div>
        <div className='ticketTitleSpace'>
          <h3>{tickets[0].event.name} TICKETS</h3>
        </div>
        <div className='ticketsFormSpace'>
          <div className='ticketButtonSpace'>
            <button onClick={onAdd}>ADD A TICKET</button>
          </div>
          <div>
            {form}
          </div>
        </div>
        {listOfTickets}
      </div>
  )
}