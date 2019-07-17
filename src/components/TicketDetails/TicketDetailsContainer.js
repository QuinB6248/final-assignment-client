import React, { Component } from 'react'
import {connect} from 'react-redux'
import TicketDetails from './TicketDetails'
import { fetchTicket } from '../../actions/ticket'



class TicketDetailsContainer extends Component {
  

  componentDidMount() {
    this.props.fetchTicket(this.props.match.params.id, this.props.match.params.ticketId)
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
  authenticated: !!state.authUser
  
})

export default connect(mapStateToProps, {fetchTicket})(TicketDetailsContainer)