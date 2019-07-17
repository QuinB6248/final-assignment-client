import React, { Component } from 'react'
import {connect} from 'react-redux'
import EventList from './EventList'
import { fetchEvents, createEvent } from '../../actions/events'


class EventListContainer extends Component {
  state = {
    editMode: false
    
  }
  
  componentDidMount() {
    this.props.fetchEvents(4)
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
      return (
        <div>
          <EventList 
            events={this.props.events}
            authenticated={this.props.authenticated}
            onAdd={this.onAdd} 
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            values={this.state}    />
        </div>
      )
    }
}


const mapStateToProps = state => ({
  events: state.events,
  authenticated: !!state.authUser
})

export default connect(mapStateToProps, {fetchEvents, createEvent})(EventListContainer)