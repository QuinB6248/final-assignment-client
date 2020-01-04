import React from 'react'
import './ticketDetails.css'
import CommentForm from './CommentForm'
import TicketForm from '../Ticket/TicketForm'

export default function TicketDetails(props) {
  if(!props.ticket) {
    return 'loading...'
  }
 
  const { ticket, onAdd, onEdit, onChange, onSubmit, onSubmitComment, values, onDelete, goBack, logIn, logOut, authenticated } = props
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
          <div className='comment'>
            <p>{comment.comment}</p>
          </div>
          <div className='authorCommentSpace'>
            <h5>author: {comment.user.name}</h5>
          </div>
        </div>
      </li>)
  
  return (
    <div className='containerTicketDetails'>
      
      <div className='homeSpace'>
        <div className='loginButtons'>
          <a href={`/events`}>EVENTS</a>
          {authenticated? <div><p>logged in: {document.cookie.split('=')[1]}  </p><button onClick={logOut}>logout</button></div>: <div><button onClick={logIn}>login</button></div>}
        </div>
        <button onClick={goBack}>Go back</button>
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
        { document.cookie.split('=')[1] === ticket.userDetails.name ? 
          <div className='detailButtonSpace'>
            <div>
              <button onClick={onEdit}>EDIT </button>
              <button onClick={onDelete}>DELETE </button>
            </div>
            <h6>author: {ticket.userDetails.name}</h6>
          </div>:
          <div className='detailButtonSpace'>
            <br></br>
            <h6>author: {ticket.userDetails.name}</h6>
          </div>
        }
        <div>
          {edform}
        </div>
      </div>

      <div className='eventButtonSpace'>
        <button onClick={onAdd}>ADD COMMENT</button>
      </div>
      <div  className='commentInputSpace'>
        {comform} 
      </div>
     
      <div className='commentHeader'>
        <h4>COMMENTS</h4>
        <div>
          {commentList}
        </div>
      </div> 
    
    </div>
  )
}