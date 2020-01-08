import React from 'react'
import TicketForm from './TicketForm'
import './tickets.css'

export default function TicketsList(props) {
  if(!props.tickets) {
    return 'loading...'
    }

  const { tickets, eventName, onAdd, onChange, onSubmit, values }  = props
  const {editMode} = values
  const ticketForm =  <TicketForm onChange={onChange} onSubmit={onSubmit} values={values}/>
  const form = editMode && ticketForm
  
  const ticketDetails = 
    <div className='ticketsFormSpace'>
      <div className='ticketButtonSpace'>
        <button onClick={onAdd}>ADD A TICKET</button>
      </div>
      <div>
        {form}
      </div>
    </div>  


  let listOfTickets;
  tickets.length === 0 ? listOfTickets = [] : 
  listOfTickets = 
    tickets
      .map(ticket => 
        <a href={`tickets/${ticket.id}`} key={ticket.id}>
          <li className='nobull'>
            <div className='ticketContainer'>
              <div className='ticketImageSpace' style={{background: "radial-gradient(rgba(255,255,255,1.2), rgba(255,255,255,0.7)), url(" + ticket.image  + ")"}}>
                <img className='ticketImage'src={ticket.image} alt=""/>
              </div>
              <div className='ticketInfoSpace'>
                <div className='ticketDescriptionSpace'>
                  <p>{ticket.description}</p>
                </div>
                <div className='ticketPriceSpace'>
                  <div className='ticketPrice'>
                    <h3>ticketprice: €{ticket.price}</h3>
                  </div>
                  <div className='riskfield'>
                    { ticket.risk < 15 ? 
                      <div className='green color'><p className='risk'>risk</p></div> : 
                      ticket.risk > 70 ? 
                      <div className='red color'><p className='risk'>risk</p></div> : 
                      <div className='yellow color'><p className='risk'>risk</p></div>
                    }
                  </div>
                </div>
              </div>
            </div >
          </li>  
        </a>)
  
  return (
    <div>
      <div>
        <a href={`/events`}>EVENTS</a>
      </div>
      <div className='containerTicketsSpace'>
        <div className='ticketTitleSpace'>
          <h3> {eventName} TICKETS</h3>
        </div>
        { tickets.length === 0 ? listOfTickets = ticketDetails: 
          <div>
            {ticketDetails}
            {listOfTickets}
          </div>
        }
      </div>
    </div>
  )
}