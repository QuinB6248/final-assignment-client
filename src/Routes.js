import React from 'react'
import {withRouter} from 'react-router-dom'
import {Switch, Route} from 'react-router-dom'
//The connect() function connects a React component to a Redux store.
import {connect} from 'react-redux'
//You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component. withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.



import LoginFormContainer from './components/Login/LoginFormContainer'
import SignUpFormContainer from './components/SignUp/SignUpFormContainer'
import EventListContainer from './components/Event/EventListContainer'
import TicketListContainer from './components/Ticket/TicketListContainer'
import TicketDetailsContainer from './components/TicketDetails/TicketDetailsContainer'


function Routes() {
 
  return (<div>
    <Switch>
      <Route path="/events" exact component={EventListContainer} />
      <Route path="/events/:id/tickets" exact component={TicketListContainer} />  
      <Route path="/events/:id/events/:id/tickets/:ticketId" exact component={TicketDetailsContainer} />
      <Route path="/login" exact component={LoginFormContainer} />
      <Route path="/signup" exact component={SignUpFormContainer} />
      {/* <Route path="" render={() => <Redirect to="/events" />} /> */}
    </Switch> 
  </div>)
}

const mapStateToProps = state => ({
  authenticated: !!state.authUser,
  signUpUser: state.signUpUser
})

//As the first argument passed in to connect, mapStateToProps is used for selecting the part of the data from the store that the connected component needs. 
export default withRouter(connect(mapStateToProps)(Routes))