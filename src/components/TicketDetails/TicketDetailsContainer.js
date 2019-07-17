import React, { Component } from 'react'
import {connect} from 'react-redux'
import TicketDetails from './TicketDetails'
import { fetchTicket } from '../../actions/ticket'



class TicketDetailsContainer extends Component {
  

  componentDidMount() {
    this.props.fetchTicket(this.props.tickets.map(ticket=> ticket.eventId)[0],this.props.match.params.ticketId)
  }



  render() {
    console.log('DETAILTICKETS', this.props.ticket)
    
    return (
     <div>
        <TicketDetails
          authenticated={this.props.authenticated}
          ticket={this.props.ticket}
          
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

export default connect(mapStateToProps, {fetchTicket})(TicketDetailsContainer)