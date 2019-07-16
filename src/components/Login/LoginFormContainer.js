import React from 'react'
import LoginForm from './Loginform'
import {connect} from 'react-redux'
import {login} from '../../actions/auth'
//import {Switch, Route, Redirect} from 'react-router-dom'

class LoginFormContainer extends React.Component {
state = {
    email: '',
    password: ''
  }

onSubmit = (event) => {
 event.preventDefault()
 this.props.login(this.state.email, this.state.password)
 this.props.history.push()
}
onChange = (event) => {
 this.setState({
   [event.target.name]: event.target.value
 })
}
render() {
 return (
  <div>
     <div>
        <LoginForm onSubmit={this.onSubmit} onChange={this.onChange} values={this.state}/>
     </div>
  </div>
  )
 }
}


const mapStateToProps = state => ({
  authenticated: !!state.authUser
})

export default connect(mapStateToProps, {login})(LoginFormContainer)