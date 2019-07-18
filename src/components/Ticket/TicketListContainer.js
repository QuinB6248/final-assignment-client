import React, { Component } from 'react'
import {connect} from 'react-redux'
import TicketList from './TicketList'
import { fetchTickets, createTicket} from '../../actions/tickets'


class EventListContainer extends Component {
  state = {
    editMode: false
    
  }
  
  componentWillMount() {
    this.props.fetchTickets(Number(this.props.match.params.id))
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
  }
  

  render() {
    return (
      <div>
        <TicketList 
          tickets={this.props.tickets}
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