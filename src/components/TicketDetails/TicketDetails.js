import React from 'react'
import '../component.css'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'

export default function TicketDetails(props) {
  if(!props.ticket) {
    return 'loading...'
    }
  const { ticket, onAdd, onChange, onSubmit, values } = props
  const {editMode} = values
  const commentForm =  <CommentForm onChange={onChange} onSubmit={onSubmit} values={values}/>
  const form = editMode && commentForm

  


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

      <h4>COMMENTS</h4>
      <div>
       {commentList}
      </div>
      <button onClick={onAdd}>ADD COMMENT</button>
      {form} 

    </div>
  )
}