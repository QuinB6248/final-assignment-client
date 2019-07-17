import React from 'react'
import '../component.css'
import { Link } from 'react-router-dom'

export default function TicketDetails(props) {
  if(!props.ticket) {
    return 'loading...'
    }
  const { ticket, onDelete, onEdit, onChange, onSubmit, values } = props

  // const {editMode} = values
  // const eventForm =  <EventForm onChange={onChange} onSubmit={onSubmit} values={values}/>
  // const form = editMode && eventForm
  console.log('TICKETSSS', ticket.ticket.event.name)

  const commentList = ticket.comments.map(comment => 
    <li className='nobull' key={comment.id}>
       
          <div>
            <div>
              
              <p>comment made by {comment.user.name}: {comment.comment}</p>
            
            </div>
          </div>
      
      </li>)
  
  return (
    <div>
      <Link to= "/events">HOME</Link>
      <h1>{ticket.ticket.event.name}</h1>
      <p>{ticket.ticket.description}</p>
      <img src={ticket.ticket.image}/>
      <p>€{ticket.ticket.price}</p>

      <h4>COMMENTS</h4>
      <div>
       {commentList}
      </div>
      <button onClick={onDelete}>DELETE</button>
      <button onClick={onEdit}>EDIT</button>
      {/* {form} */}

    </div>
  )
}