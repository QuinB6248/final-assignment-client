import React from 'react'
import SignUpForm from './SignUpForm'
import {connect} from 'react-redux'
import {signup} from '../../actions/auth'
import '../component.css'

class SignUpFormContainer extends React.Component {
state = {
    name: '',
    email: '',
    password: '',
    validation: true
  }

onSubmit = (event) => {
 event.preventDefault()
 const emailIsValid = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
 const emailTrue = emailIsValid(this.state.email)
 if(emailTrue !== true) {
  return this.setState({
    validation: false
  })
 } 
 this.setState({
  validation: true
})
this.props.signup(this.state.name, this.state.email, this.state.password)
this.props.history.goBack()
}

onChange = (event) => {
  //event.target = <input name="name, email, password" placeholder="" value="typing">
 this.setState({
   [event.target.name]: event.target.value
 })
}

render() {
 return (
  <div>
    <div>
      <SignUpForm onSubmit={this.onSubmit} onChange={this.onChange} values={this.state}/>
    </div>
  </div>
  )
 }
}

export default connect(null, {signup})(SignUpFormContainer)