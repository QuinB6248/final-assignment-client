import React from 'react'
import './ticketDetails.css'
import CommentForm from './CommentForm'
import TicketForm from '../Ticket/TicketForm'

export default function TicketDetails(props) {
  if(!props.ticket) {
    return 'loading...'
  }
 
  const { ticket, onAdd, onEdit, onChange, onSubmit, onSubmitComment, values, onDelete, goBack, logIn, logOut} = props
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
            <h6>author: {comment.user.name}</h6>
          </div>
        </div>
      </li>)
  
  return (
    <div className='containerTicketDetails'>
      
      <div className='homeSpace'>
        <div className='linkButtons'>
          <a  href={`/events`} className='buttonField allEventsLink'>events</a>
          <div onClick={goBack}  className='buttonField goBackButton'>tickets</div>
        </div>
        {sessionStorage.getItem("name")? 
          <div className='eventLoginFields'>
            <div className='loginButtonSpace buttonField ' onClick={logOut}><div className='loginText'>logout</div></div>
              <p >Welkom {sessionStorage.getItem("name")}  </p>
          </div> : 
          <div className='eventLoginFields'>
             <div className='loginButtonSpace buttonField ' onClick={logIn}><div className='loginText'>login</div></div>
          </div>
        }
           
        
        
      </div>

      <div className='ticketDetailsSpace'> 
        <div className='ticketDetailsNameSpace'>
          <h2>{ticket.event.name}</h2>
        </div>
        <div className='imageBigSpace' style={{background: "radial-gradient(rgba(236,240,241,0.7), rgba(236,240,241,4)), url(" + ticket.ticket.image  + ")", backgroundSize: "cover", backgroundRepeat:"no-repeat", backgroundPosition:'center'}}>
          <img className='imgBigSize' src={ticket.ticket.image} alt=""/>
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
        { sessionStorage.getItem("name") === ticket.userDetails.name ? 
          <div className='detailButtonSpace'>
            <div className='nameButtonSpace'>
              <div  className='buttonEvent' onClick={onDelete}>DELETE </div >
              <div className='buttonEvent' onClick={onEdit}>EDIT </div >
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

      <div className='commentOverallSpace'>
        <div className='buttonField addCommentSpace'>
          <div onClick={onAdd} className='eventText'>ADD COMMENT</div>
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

      
    
    </div>
  )
}