import React, { Component } from 'react'
import {connect} from 'react-redux'
import TicketDetails from './TicketDetails'
import { fetchTicket, createComment, updateTicket } from '../../actions/ticket'



class TicketDetailsContainer extends Component {
 
  state = {
    editMode: false
  }

  componentDidMount() {
    const id = this.props.tickets.map(ticket=> ticket.eventId)[0]
    this.props.fetchTicket(id, this.props.match.params.ticketId)
  }
  
  onAdd = () => {
    if(!this.props.authenticated) {
      return this.props.history.push('/login')
    }
    this.setState({
      editMode: true,
      formValues: {
        comment: "", 
      }
    })
  }
  onEdit = () => {
    this.setState({
      editMode: true,
      formValues: {
        picture: this.props.ticket.picture, 
        price: this.props.ticket.price,
        description: this.props.ticket.description
        }
     })
  }
  onSubmit = (event) => {
    const id = this.props.tickets.map(ticket=> ticket.eventId)[0]
    const ticketId = this.props.ticket.ticket.id
    event.preventDefault()
    this.setState({
      editMode: false
    })
   this.props.createComment(id, ticketId, this.state.formValues)
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
    
    
    console.log('DETAILTICKETS', this.props.ticket.ticket.id)
    return (
     <div>
        <TicketDetails
          authenticated={this.props.authenticated}
          ticket={this.props.ticket}
          onAdd={this.onAdd} 
          onChange={this.onChange}
          onSubmit={this.onSubmit}
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