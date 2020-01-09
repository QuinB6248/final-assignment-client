import React, { Component } from 'react'
import {connect} from 'react-redux'
import TicketDetails from './TicketDetails'
import { fetchTicket, createComment, updateTicket, deleteTicket } from '../../actions/ticket'
import { checkToken, logout } from '../../actions/auth'



class TicketDetailsContainer extends Component {
//////////////////////COMPONENT STATE///////////////////////
  state = {
    editMode: false,
    editCommentMode: false,
    priceValidation: true,
    requiredFormFields: false,
    inputText: true,
   
  }

//////////////////////COMPONENT MOUNT///////////////////////
  componentDidMount() {
    const id = Number(this.props.match.params.id)
    const nameCookie = this.props.authenticated
    if (nameCookie === undefined || nameCookie === null || nameCookie === false){
      this.props.checkToken(false)
    }else {
      this.props.checkToken(nameCookie)
    }
    
    this.props.fetchTicket(id, this.props.match.params.ticketId)
  }
  
//////////////LOGIN  LOGOUT////////////////////////
  logIn = () => {
    return this.props.history.push('/login')
  }

  logOut = () => {
    this.props.logout(this.props.authenticated.id)
    this.componentDidMount()
    this.setState({ editMode: false })
  }

//////////////////UPDATE TICKET ADD COMMENT////////////////////////
  onChange = (event) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [event.target.name]: event.target.value
      }
    })
  }

//////////////////UPDATE TICKET////////////////////////
  onEdit = () => {
    if(!this.props.authenticated) {
      return this.props.history.push('/login')
    }
    
    if(this.state.editMode === false){
      return this.setState({editMode: true})
    }

    if(this.state.editMode === true){
      return this.setState({editMode: false})
    }
  }

  onSubmit = (event) => {
    event.preventDefault()

    const id = this.props.ticket.event.id
    const ticketId = this.props.ticket.ticket.id
   
    if( this.state.formValues.price && isNaN(this.state.formValues.price) === true) {
      return this.setState({priceValidation: false})
    } 
    this.setState({
      editMode: false,
      editCommentMode: false
    })
    this.props.updateTicket(id, ticketId, this.state.formValues, this.props.authenticated.token)
  }

//////////////////ADD COMMENT////////////////////////
  onAdd = () => {
    if (this.state.formValues){
      this.setState({ formValues:  undefined })
    }
    if(!this.props.authenticated) {
      return this.props.history.push('/login')
    }
    this.setState({ editMode: false })

    if(this.state.editCommentMode === false){
      return this.setState({ editCommentMode: true})
    }
    if(this.state.editCommentMode === true){
      return this.setState({editCommentMode: false})
    }
  }

  onSubmitComment = (event) => {
    event.preventDefault()
    
    const id = this.props.ticket.event.id
    const ticketId = this.props.ticket.ticket.id
    
    if (this.state.formValues === undefined){
      return this.setState({inputText: false})
    }
    this.setState({
      editMode: false,
      editCommentMode: false,
      inputText: true
    })
    this.props.createComment(id, ticketId, this.state.formValues, this.props.authenticated.token)
  }
 
 
//////////////////DELETE TICKET////////////////////////
  onDelete = () => {
    const id = this.props.ticket.event.id
    const ticketId = this.props.ticket.ticket.id
    this.props.deleteTicket(id, ticketId, this.props.authenticated.token)
    setTimeout(()=>this.props.history.goBack(), 600)
  }

//////////////////GO BACK TO TICKETS////////////////////////
  goBackTickets = () => {
    setTimeout(()=> this.props.history.goBack(), 200)
  }

//////////////////////RENDER///////////////////////
  render() {
    if(!this.props.ticket) {
      return 'loading...'
    }

    return (
      <div>
        <TicketDetails
          ticket={this.props.ticket}
          onAdd={this.onAdd} 
          onEdit={this.onEdit}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onSubmitComment={this.onSubmitComment}
          values={this.state} 
          onDelete={this.onDelete} 
          goBack = {this.goBackTickets}
          logOut={this.logOut}
          logIn={this.logIn}
        />
      </div>
    )
  }
}

//////////////////////MAP STATE TO PROPS///////////////////////
const mapStateToProps = state => ({
  ticket: state.ticket,
  tickets: state.tickets,
  authenticated: state.authUser
  
})

export default connect(mapStateToProps, {fetchTicket, createComment, updateTicket, checkToken, deleteTicket, logout})(TicketDetailsContainer)