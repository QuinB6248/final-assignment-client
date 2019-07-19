import React, { Component } from 'react'
import {connect} from 'react-redux'
import EventList from './EventList'
import { fetchEvents, createEvent, countEvents } from '../../actions/events'


class EventListContainer extends Component {
  state = {
    editMode: false,
    allEvents: [1,2,3],
    currentPage: 1,
    eventsPerPage: 3
  }

  componentDidMount() {
    this.props.fetchEvents(this.state.eventsPerPage)
  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    })
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
      console.log('STAAAT', this.state)
      return (
        <div>
          <EventList 
            events={this.props.events}
            authenticated={this.props.authenticated}
            onAdd={this.onAdd} 
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            values={this.state}
            handleClick={this.handleClick}
          />
        </div>
      )
    }
}


const mapStateToProps = state => ({
  events: state.events,
  authenticated: !!state.authUser,
  count: state.count
})

export default connect(mapStateToProps, {fetchEvents, createEvent, countEvents})(EventListContainer)