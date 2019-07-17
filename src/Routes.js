import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'


import LoginFormContainer from './components/Login/LoginFormContainer'
import SignUpFormContainer from './components/SignUp/SignUpFormContainer'
import EventListContainer from './components/Event/EventListContainer'

import TicketListContainer from './components/Ticket/TicketListContainer'
import TicketDetailsContainer from './components/TicketDetails/TicketDetailsContainer'


function Routes(props) {
  console.log('AuthUser', props.authenticated)
  return (<div>
{/* 
{!props.authenticated && */}
  <Switch>
    <Route path="/tickets/:ticketId" exact component={TicketDetailsContainer} />
    <Route path="/events/:id/tickets" exact component={TicketListContainer} />  
    <Route path="/events" exact component={EventListContainer} />
    <Route path="/login" exact component={LoginFormContainer} />
    <Route path="/signup" exact component={SignUpFormContainer} />
    
    
    
    
   
    {/* <Route path="/login" component={LoginFormContainer}/>
    <Route path="" render={() => <Redirect to="/login"/>}/> */}
  </Switch> 
{/* } */}
  
  {/* {props.authenticated &&
  <Switch>
    <Route path="/events" exact component={EventListContainer} />
  
    <Route path="/events/:id/tickets" component={TicketListContainer} />
    <Route path="/events/:id/tickets/:ticketId" component={TicketDetailsContainer} /> */}
    {/* <Route path="/events/:id" component={EventDetailsContainer} /> */}
    {/* <Route path="" render={() => <Redirect to="/events" />} /> */}
  {/* </Switch>} */}


    
  </div>)
}

const mapStateToProps = state => ({
  authenticated: !!state.authUser,
  signUpUser: state.signUpUser
})

export default withRouter(connect(mapStateToProps)(Routes))