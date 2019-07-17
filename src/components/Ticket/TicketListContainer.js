import React, { Component } from 'react'
import {connect} from 'react-redux'
import TicketList from './TicketList'
import { fetchTickets, createTicket, updateTicket, deleteTicket } from '../../actions/tickets'



class EventListContainer extends Component {
  state = {
    editMode: false
    
  }

  componentDidMount() {
    this.props.fetchTickets(this.props.match.params.id)
  }
  onDelete = () => {
    this.props.deleteEvent(this.props.event.id)
    this.props.history.push('/tickets')
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
  onAdd = () => {
    if(!this.props.authenticated) {
      return this.props.history.push('/login')
 
    } 
    this.setState({
      editMode: true,
      formValues: {
        picture: "", 
        price: "",
        description: ""
        }
    })
    console.log('THISSTATE', this.props.tickets)
   }

   

   onSubmit = (event) => {
    event.preventDefault()
    this.setState({
      editMode: false
    })
   
    this.props.createTicket(Number(this.props.match.params.id), this.state.formValues)
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
    
    
    return (
     <div>
        <TicketList 
          authenticated={this.props.authenticated}
          tickets={this.props.tickets}
          onDelete={this.onDelete}
          onEdit={this.onEdit}
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
  tickets: state.tickets,
  authenticated: !!state.authUser
  
})

export default connect(mapStateToProps, {fetchTickets, createTicket})(EventListContainer)