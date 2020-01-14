import React, { Component } from 'react'
import {connect} from 'react-redux'
import EventList from './EventList'
import { fetchEvents, createEvent, countEvents, deleteEvent, updateEvent, searchEvents } from '../../actions/events'
import { checkToken , logout} from '../../actions/auth'


class EventListContainer extends Component {
///////////////COMPONENT STATE/////////////////////
  state = {
    editMode: false,
    editModeUpdate: false,
    eventsPerPage: 6,
    curOffset:0,
    startDateValidation: true,
    endDateValidation: true,
    validation: true,
    priceValidation: true,
    requiredFormFields: true,
  }

//////////////////COMPONENT MOUNT///////////////////
  componentDidMount() {
    const nameCookie = this.props.authenticated
    if (nameCookie === undefined || nameCookie === null || nameCookie === false){
      this.props.checkToken(false)
    }else {
      this.props.checkToken(nameCookie)
    }
    this.props.fetchEvents(this.state.eventsPerPage, this.state.curOffset)
   
  }
  
///////////////SEARCH EVENT/////////////////////////
  submitSearch = (event) => {
    event.preventDefault()

    if(this.state.formValues === undefined){
      return this.setState({
        formValues: { eventName: 'false',userName: 'false'}
      })
    }
    if(this.state.formValues.eventName === undefined){
      return this.props.searchEvents('false', this.state.formValues.userName)
    }
    if(this.state.formValues.userName === undefined){
      return this.props.searchEvents(this.state.formValues.eventName, 'false')
    }
    this.props.searchEvents(this.state.formValues.eventName, this.state.formValues.userName)
  }

//////////////LOG IN AND OUT////////////////////////
  logIn = () => {
    return this.props.history.push('/login')
  }

  logOut = () => {
    this.props.logout(this.props.authenticated)
    this.componentDidMount()
    this.setState({ editMode: false })
  }
  
///////////////////ADD UPDATE DELETE EVENT///////////////////
  onChange = (event) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [event.target.name]: event.target.value
      }
    })
  }

////////////////ADD EVENT////////////////
  onAdd = () => {
    if(!this.props.authenticated) {
      return this.props.history.push('/login')
    } 
    this.setState({editModeUpdate: false, requiredFormFields: true})
    
    if(this.state.editMode === false){
      return this.setState({editMode: true})
    }
    if(this.state.editMode === true){
      return this.setState({editMode: false})
    }
  }
  
  onSubmit = (event) => {
    event.preventDefault()
    const createSubmit = () => this.props.createEvent(this.state.formValues, this.props.authenticated.token)
    this.submitValidation(createSubmit)
    setTimeout(()=>this.componentDidMount(), 400)
    
  }

////////////////SUBMIT ADD & UPDATE///////////////
  submitValidation = (submitCreateOrUpdate) => {
    
    const dateIsValid = date => /(\d{4})-(\d{2})-(\d{2})/.test(date)
    const curDate = new Date().toISOString().split('T')[0]
    
    const startDateTrue = dateIsValid(this.state.formValues.start)
    const endDateTrue = dateIsValid(this.state.formValues.end)
    
    if( this.state.formValues.avg_price && isNaN(this.state.formValues.avg_price) === true) {
      return this.setState({priceValidation: false})
    } 
    this.setState({ priceValidation: true })
    
    if(this.state.formValues.start && startDateTrue !== true ) {
      return this.setState({ startDateValidation: false})
    } 
    this.setState({ startDateValidation: true })

    if(this.state.formValues.end && endDateTrue !== true) {
      return this.setState({ endDateValidation: false})
    } 
    this.setState({ endDateValidation: true })

    if(this.state.formValues.end && curDate > this.state.formValues.end) {
      return this.setState({validation: false})
    }
    this.setState({
      editMode: false,
      validation: true,
      editModeUpdate: false,
      requiredFormFields: true
    }) 

    submitCreateOrUpdate()
   
  }

////////////////UPDATE EVENT//////////////////
  onUpdate = (id) => {
    if(!this.props.authenticated) {
      return this.props.history.push('/login')
    } 
    this.setState({editMode: false, formValues: undefined})

    if(this.state.editModeUpdate === false){
      return this.setState({editModeUpdate: true, id:id, requiredFormFields: false})
    }
    if(this.state.editModeUpdate === true){
      return this.setState({editModeUpdate: false, requiredFormFields: true})
    }
  }

  onSubmitUpdate = (event) => {
    event.preventDefault()
    if (this.state.formValues === undefined){return this.setState({editModeUpdate: false})}
    const updateSubmit = () => this.props.updateEvent(this.state.id, this.state.formValues, this.props.authenticated.token)
    this.submitValidation(updateSubmit)
   
  }

///////////////////DELETE EVENT///////////////////
  onDelete = (id) => {
    if(!this.props.authenticated) {
      return this.props.history.push('/login')
    }
    this.props.deleteEvent(id, this.props.authenticated.token)
    setTimeout(()=>this.componentDidMount(), 400)
  }

////////////PAGINATION NEXT AND PREVIOUS//////////////
  clickNext = () => {
    this.setState({ curOffset: this.state.curOffset+=6 })
    this.props.fetchEvents(this.state.eventsPerPage, this.state.curOffset)
  }
  clickPrevious = () => {
    this.setState({ curOffset: this.state.curOffset-=6 })
    this.props.fetchEvents(this.state.eventsPerPage, this.state.curOffset)
  }

/////////////RENDER////////////////////////////////
  render() {
    if(!this.props.events) {
      return 'loading...'
    }
    return (
      <div>
        <EventList 
          
          events={this.props.events}
          values={this.state}
          
          logOut={this.logOut}
          logIn={this.logIn}
          onAdd={this.onAdd} 
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onSubmitUpdate={this.onSubmitUpdate}
          submitSearch={this.submitSearch}
          onDelete={this.onDelete}
          linkClick={this.linkClick}
          
          clickNext={this.clickNext}
          clickPrevious={this.clickPrevious}
        />
      </div>
    )
  }
}

//////////////////////MAP STATE TO PROPS///////////////////////
const mapStateToProps = state => ({
  events: state.events,
  //!!state.authUser gives a boolean false or true
  authenticated: state.authUser,
  
})

export default connect(mapStateToProps, {fetchEvents, createEvent, countEvents, checkToken, logout, updateEvent, deleteEvent, searchEvents})(EventListContainer)