import React, { Component } from 'react'
import {connect} from 'react-redux'
import EventList from './EventList'
import { fetchEvents } from '../../actions/events'



class EventListContainer extends Component {
  state = {
    currentPage: 1,
    totalItems: 10,
    itemsPerPage: 3
  }
  
  componentDidMount() {
    this.props.fetchEvents(3)
  }
  
  render() {
  
    const events = this.props.events
    
    return (
      <div>
        <EventList events={events}  />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  events: state.events,
  
})

export default connect(mapStateToProps, {fetchEvents})(EventListContainer)