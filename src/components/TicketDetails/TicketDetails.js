import React from 'react'
import './ticketDetails.css'
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
  const comform = editCommentMode && commentForm
  const edform = editMode && editForm
  const commentList = 
  ticket.comments
    .map(comment => 
      <li className='nobull' key={comment.id}>
        <div className='commentSpace'>
          <p>{comment.comment}</p>
        </div>
      </li>)
  
  return (
    <div className='containerTicketDetails'>
      
      <div className='homeSpace'>
        <a href={`/events`}>HOME</a>
      </div>
     
      <div className='ticketDetailsSpace'> 
        <div className='ticketDetailsNameSpace'>
          <h1>{ticket.event.name}</h1>
        </div>
       
        
        <div className='imageBigSpace' style={{background: "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,-1.5)), url(" + ticket.ticket.image  + ")", backgroundSize: "cover", backgroundRepeat:"no-repeat", backgroundPosition:'center'}}>
          <img className='imgBigSize' src={ticket.ticket.image}/>
        </div>
        <div className='ticketDetailsDescription'>
         <p>{ticket.ticket.description}</p>
         
        </div>
        <div className='ticketDetailsPrice'>
         <h3>price €{ticket.ticket.price},-</h3>
         

        </div>
        <div className='ticketDetailsRisk'>
        <h4> risk: {ticket.ticket.risk} %</h4>
        </div>

        
       
        
      </div>

      <div className='detailButtonSpace'>
        <button onClick={onEdit}>EDIT TICKET</button>
      </div>
      {edform}
      
      <div className='commentHeader'>
        <h4>COMMENTS</h4>
        <div >
          {commentList}
        </div>
      </div> 
      <div className='eventButtonSpace'>
        <button onClick={onAdd}>ADD COMMENT</button>
      </div>
      {comform} 
    </div>
  )
}