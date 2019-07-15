import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Home from '../src/components/Home'
import LoginFormContainer from '../src/components/Login/LoginFormContainer'
import SignUpFormContainer from '../src/components/SignUp/SignUpFormContainer'

function Routes(props) {
  console.log('SignUpUser', props.signUpUser)
  return (<div>


    
    {/* {!props.authenticated && */}
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/login" component={LoginFormContainer} />
      <Route path="/signup" component={SignUpFormContainer} />
    </Switch>

    {/* }  */}
    

    
  </div>)
}

const mapStateToProps = state => ({
  authenticated: !!state.authUser,
  signUpUser: state.signUpUser
})

export default withRouter(connect(mapStateToProps)(Routes))