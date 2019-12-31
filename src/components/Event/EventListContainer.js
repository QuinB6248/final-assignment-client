import React, { Component } from 'react'
import {connect} from 'react-redux'
import EventList from './EventList'
import { fetchEvents, createEvent, countEvents, deleteEvent, updateEvent } from '../../actions/events'
import { checkToken , logout} from '../../actions/auth'


class EventListContainer extends Component {
  state = {
    editMode: false,
    editModeUpdate: false,
    eventsPerPage: 6,
    curOffset:0,
  }

  componentDidMount() {
   
    const nameCookie = document.cookie.split('=')[1]
    if (nameCookie === undefined || nameCookie === "undefined"){
      this.props.checkToken(false)
    }else {
      this.props.checkToken(true)
    }
    this.props.fetchEvents(this.state.eventsPerPage, this.state.curOffset)
  }

  logOut = () => {
    document.cookie = "name=undefined"
    this.props.logout()
    this.componentDidMount()
    this.setState({
      editMode: false
    })
  }
  logIn = () => {
    return this.props.history.push('/login')
  }

  clickNext = () => {
    this.setState({ curOffset: this.state.curOffset+=6 })
    this.props.fetchEvents(this.state.eventsPerPage, this.state.curOffset)
  }
  clickPrevious = () => {
    this.setState({ curOffset: this.state.curOffset-=6 })
    this.props.fetchEvents(this.state.eventsPerPage, this.state.curOffset)
  }
  
  updateOrAdd=()=>{
    if(!this.props.authenticated) {
      return this.props.history.push('/login')
    } 
    this.setState({
      formValues: {
        name: '',
        description: '',
        image: '',
        start: '',
        end: '',
        avg_price: ''
      }
    })
  }
  
  onAdd = () => {
    this.updateOrAdd()
    this.setState({editMode: true})
  }
  onUpdate = (id) => {
    this.setState({editModeUpdate: true, id:id})
    this.updateOrAdd()
    
  }

  onDelete = (id) => {
    if(!this.props.authenticated) {
      return this.props.history.push('/login')
    }
    this.props.deleteEvent(id)
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
    this.setState({
      editMode: false
    })
    this.props.createEvent(this.state.formValues)
  }

  onSubmitUpdate = (event) => {
    event.preventDefault()
    this.setState({
      editModeUpdate: false
    })
    const formValue = this.state.formValues
    const newFormValues = {}
    const keyOfObject = Object.keys(formValue)
    keyOfObject.filter(el => {
      if(formValue[el]) {
        return newFormValues[el] = formValue[el]
      }
    })
    this.props.updateEvent(this.state.id, newFormValues)
  }
  

  render() {
    if(!this.props.events) {
      return 'loading...'
    }
   
    return (
      <div>
        <EventList 
          events={this.props.events}
          authenticated={this.props.authenticated}
          onAdd={this.onAdd} 
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          values={this.state}
          clickNext={this.clickNext}
          clickPrevious={this.clickPrevious}
          linkClick={this.linkClick}
          logOut={this.logOut}
          logIn={this.logIn}
          onDelete={this.onDelete}
          onSubmitUpdate={this.onSubmitUpdate}
        />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  events: state.events,
  //!!state.authUser gives a boolean false or true
  authenticated: !!state.authUser,
  
})

export default connect(mapStateToProps, {fetchEvents, createEvent, countEvents, checkToken, logout, updateEvent, deleteEvent})(EventListContainer)