import React, { Component } from 'react'
import {connect} from 'react-redux'
import EventList from './EventList'
import EventFormContainer from '../Form/EventFormContainer'
import { fetchEvents } from '../../actions/events'



class EventListContainer extends Component {
  componentDidMount() {
    this.props.fetchEvents() 
  }
  render() {
    return (
      <div>
        <EventList events={this.props.events}/>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  events: state.events
})

export default connect(mapStateToProps, {fetchEvents})(EventListContainer)