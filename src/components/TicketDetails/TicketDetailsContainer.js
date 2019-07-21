import React, { Component } from 'react'
import {connect} from 'react-redux'
import TicketDetails from './TicketDetails'
import { fetchTicket, createComment, updateTicket } from '../../actions/ticket'



class TicketDetailsContainer extends Component {
 state = {
    editMode: false,
    editCommentMode: false,
  }

  componentDidMount() {
    const id = Number(this.props.match.params.id)
    this.props.fetchTicket(id, this.props.match.params.ticketId)
  }
  
  onAdd = () => {
    if(!this.props.authenticated) {
      return this.props.history.push('/login')
    }
    this.setState({
      editMode: false,
      editCommentMode: true,
      formValues: {
        comment: "", 
      }
    })
  }

  onEdit = () => {
    if(!this.props.authenticated) {
      return this.props.history.push('/login')
    }
    this.setState({
      editMode: true,
      formValues: {
        picture: this.props.ticket.ticket.picture, 
        price: this.props.ticket.ticket.price,
        description: this.props.ticket.ticket.description
        }
     })
  }

  onSubmitComment = (event) => {
    const id = this.props.ticket.event.id
    const ticketId = this.props.ticket.ticket.id
    event.preventDefault()
    this.setState({
      editMode: false,
      editCommentMode: false
    })
   this.props.createComment(id, ticketId, this.state.formValues)
  }

  onSubmit = (event) => {
    const id = this.props.ticket.event.id
    const ticketId = this.props.ticket.ticket.id
    event.preventDefault()
    this.setState({
      editMode: false,
      editCommentMode: false
    })
   this.props.updateTicket(id, ticketId, this.state.formValues)
  }

  onChange = (event) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [event.target.name]: event.target.value
      }
    })
    console.log('ChangeState', this.state)
  }

  render() {
    if(!this.props.ticket) {
      return 'loading...'
      }
    console.log('DETAILTICKETS', this.props.authenticated)
    
    return (
     <div>
        <TicketDetails
          authenticated={this.props.authenticated}
          ticket={this.props.ticket}
          onAdd={this.onAdd} 
          onEdit={this.onEdit}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onSubmitComment={this.onSubmitComment}
          values={this.state}  
        />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  ticket: state.ticket,
  tickets: state.tickets,
  authenticated: !!state.authUser
  
})

export default connect(mapStateToProps, {fetchTicket, createComment, updateTicket})(TicketDetailsContainer)