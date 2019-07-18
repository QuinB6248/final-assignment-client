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
  const {editMode, editCommentMode} = values
  const commentForm =  <CommentForm onChange={onChange} onSubmit={onSubmitComment} values={values}/>
  const editForm = <TicketForm onChange={onChange} onSubmit={onSubmit} values={values}/>
  const commentform = editCommentMode && commentForm
  const editform = editMode && editForm


  


  const commentList = ticket.comments.map(comment => 
    <li className='nobull' key={comment.id}>
      <div >
        <p>comment made by {comment.user.name}: {comment.comment}</p>
      </div>
    </li>)
  
  return (
    <div>
      <div className='headerSpace'>
        <Link to= "/events">HOME</Link>
      </div>
      <div className='eventSpace'> 
        <h1>{ticket.event.name}</h1>
        <p>{ticket.ticket.description}</p>
        <div className='imageSpace'>
          <img className='imgSize' src={ticket.ticket.image}/>

        </div>
        
        <p>€{ticket.ticket.price}</p>
      </div>
      <div className='headerSpace'>
        <button onClick={onEdit}>EDIT TICKET</button>
      </div>
      {editform}
      <div >
        <h4>COMMENTS</h4>
        <div >
          {commentList}
        </div>
      </div> 
      <div  className='headerSpace'>
        <button onClick={onAdd}>ADD COMMENT</button>
      </div>
      {commentform} 

    </div>
  )
}