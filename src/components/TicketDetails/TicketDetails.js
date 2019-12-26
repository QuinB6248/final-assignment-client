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
    .map(comment => {
      
     return  <li className='nobull' key={comment.id}>
         <div className='commentSpace'>
           <div className='comment'>
           <p>{comment.comment}</p>
           </div>
         
          <div className='authorCommentSpace'>
           <h5>author: {comment.user.name}</h5>
         </div>
       
       
         
        </div>
      </li>})
  
  return (
    <div className='containerTicketDetails'>
      <div className='homeSpace'>
        <a href={`/events`}>HOME</a>
      </div>
      <div className='ticketDetailsSpace'> 
        <div className='ticketDetailsNameSpace'>
          <h1>{ticket.event.name}</h1>
        </div>
        <div className='imageBigSpace' style={{background: "radial-gradient(rgba(236,240,241,0.7), rgba(236,240,241,4)), url(" + ticket.ticket.image  + ")", backgroundSize: "cover", backgroundRepeat:"no-repeat", backgroundPosition:'center'}}>
          <img className='imgBigSize' src={ticket.ticket.image}/>
        </div>
        <div className='ticketDetailsDescription'>
          <div className='descriptionBox'>
            <p>{ticket.ticket.description}</p>  
          </div>
        </div>
        <div className='ticketPriceRisk'>
          <div className="color" ></div>
          <div className='ticketDetailsPrice'>
            <h3>price €{ticket.ticket.price},-</h3>
          </div>
          <div className='ticketDetailsRisk'>
            { ticket.ticket.risk < 15 ? 
              <div className='green color'><p className='risk'>{ticket.ticket.risk}%</p></div> : 
              ticket.ticket.risk > 70 ? 
              <div className='red color'><p className='risk'>{ticket.ticket.risk}%</p></div> : 
              <div className='yellow color'><p className='risk'>{ticket.ticket.risk}%</p></div>
            }
          </div>
        </div>
        {sessionStorage.getItem("name") === ticket.userDetails.name ? 
           <div className='detailButtonSpace'>
        
           <button onClick={onEdit}>EDIT TICKET</button>
         </div>:
          <div className='authorSpace'>
          <h5>author: {ticket.userDetails.name}</h5>
        </div>}
       
       
        {edform}
      </div>

      <div className='commentHeader'>
        <h4>COMMENTS</h4>
        <div >
          {commentList}
        </div>
      </div> 
      {comform} 
      <div className='eventButtonSpace'>
        <button onClick={onAdd}>ADD COMMENT</button>
      </div>
     
    </div>
  )
}