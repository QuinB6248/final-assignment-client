import React, { Component } from 'react'
import {connect} from 'react-redux'
import TicketList from './TicketList'
import { fetchTickets, createTicket} from '../../actions/tickets'
import { checkToken } from '../../actions/auth'


class TicketListContainer extends Component {
///////////////COMPONENT STATE/////////////////////
  state = {
    editMode: false,
    priceValidation: true,
    requiredFormFields: true,
    login: true    

  }
  
///////////////COMPONENT MOUNT////////////////////
  componentDidMount() {
    const nameCookie = this.props.authenticated
    if (nameCookie === undefined || nameCookie === null || nameCookie === false){
      this.props.checkToken(false)
    }else {
      this.props.checkToken(nameCookie)
    }
    setTimeout(()=>this.props.fetchTickets(Number(this.props.match.params.id)), 200)
  }

///////////////ADD TICKET/////////////////////
  onAdd = () => {
    if(!this.props.authenticated) {
      return this.props.history.push('/login')
    } 
    this.setState({
      editMode: true,
      formValues: {
        image: "", 
        price: "",
        description: ""
        }
    })
  }
  
  onChange = (event) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [event.target.name]: event.target.value
      }
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    if( isNaN(this.state.formValues.price) === true) {
      return this.setState({priceValidation: false})
    } 
    
    this.setState({
      priceValidation: true,
      editMode: false
    })
    this.props.createTicket(Number(this.props.match.params.id), this.state.formValues, this.props.authenticated.token)
    
  }

///////////////RENDER/////////////////////
  render() {
    if(!this.props.tickets) {
      return 'loading'
    }
   
    return (
      <div>
        <TicketList 
          tickets={this.props.tickets.tickets}
          eventName={this.props.tickets.eventName}
          onAdd={this.onAdd} 
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          values={this.state}  
        />
      </div>
    )
  }
}

//////////////////////MAP STATE TO PROPS///////////////////////
const mapStateToProps = state => ({
  events: state.events,
  tickets: state.tickets,
  authenticated: state.authUser
})

export default connect(mapStateToProps, {fetchTickets, createTicket, checkToken})(TicketListContainer)