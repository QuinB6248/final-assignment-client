import React from 'react'
import '../component.css'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import TicketForm from '../Ticket/TicketForm'

export default function TicketDetails(props) {
  if(!props.ticket) {
    return 'loading...'
    }
  const { ticket, onAdd, onEdit, onChange, onSubmit, onSubmitComment, values } = props
  const {editMode} = values
  const commentForm =  <CommentForm onChange={onChange} onSubmit={onSubmitComment} values={values}/>
  const editForm = <TicketForm onChange={onChange} onSubmit={onSubmit} values={values}/>
  const commentform = editMode && commentForm
  const editform = editMode && editForm


  


  const commentList = ticket.comments.map(comment => 
    <li className='nobull' key={comment.id}>
      <div>
        <p>comment made by {comment.user.name}: {comment.comment}</p>
      </div>
    </li>)
  
  return (
    <div>
      <Link to= "/events">HOME</Link>
      <h1>{ticket.ticket.event.name}</h1>
      <p>{ticket.ticket.description}</p>
      <img src={ticket.ticket.image}/>
      <p>€{ticket.ticket.price}</p>

      <button onClick={onEdit}>EDIT TICKET</button>
      {editform} 

      <h4>COMMENTS</h4>
      <div>
       {commentList}
      </div>
      <button onClick={onAdd}>ADD COMMENT</button>
      {commentform} 

    </div>
  )
}