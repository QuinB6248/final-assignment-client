import React, { Component } from 'react'
import {connect} from 'react-redux'
import EventList from './EventList'
import { fetchEvents, createEvent, countEvents } from '../../actions/events'


class EventListContainer extends Component {
  state = {
    editMode: false,
    eventsPerPage: 3,
    curOffset:0
  }

  componentDidMount() {
    this.props.fetchEvents(this.state.eventsPerPage, this.state.curOffset)
  }

  clickNext = (event) => {
    this.setState({
      curOffset: this.state.curOffset+=3,
    })
    this.props.fetchEvents(this.state.eventsPerPage, this.state.curOffset)
  }

  clickPrevious = (event) => {
    this.setState({
      curOffset: this.state.curOffset-=3,
    })
    this.props.fetchEvents(this.state.eventsPerPage, this.state.curOffset)
  }
  
  onAdd = () => {
    if(!this.props.authenticated) {
      return this.props.history.push('/login')
    } 
    this.setState({
      editMode: true,
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

  onSubmit = (event) => {
    event.preventDefault()
    this.setState({
      editMode: false
    })
    this.props.createEvent(this.state.formValues)
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
    if(!this.props.events) {
      return 'loading...'
    }
    return (
      <div>
        <EventList 
          events={this.props.events}
          authenticated={this.props.authenticated}
          onAdd={this.onAdd} 
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          values={this.state}
          clickNext={this.clickNext}
          clickPrevious={this.clickPrevious}
          linkClick={this.linkClick}
        />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  events: state.events,
  //!!state.authUser gives a boolean false or true
  authenticated: !!state.authUser,
  count: state.count
})

export default connect(mapStateToProps, {fetchEvents, createEvent, countEvents})(EventListContainer)