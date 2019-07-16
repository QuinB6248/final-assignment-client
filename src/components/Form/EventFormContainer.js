import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createEvent} from '../../actions/events'
import EventForm from './EventForm'

class EventFormContainer extends Component {
  state = {
    name: '',
    description: '',
    image: '',
    start: '',
    end: '',
    avg_price: ''


  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value //(inputfieldsname same as propertyname) state gives as value input
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.createEvent(this.state)
    this.setState({
      name: '',
      description: '',
      image: '',
      start: '',
      end: '',
      avg_price: ''
    })
    this.props.history.push('/events')
  }

  render() {
    return (
      <div>
        <EventForm
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          values={this.state}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events
})

export default connect(mapStateToProps, {createEvent}) (EventFormContainer)