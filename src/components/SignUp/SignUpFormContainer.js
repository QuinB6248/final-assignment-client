import React from 'react'
import SignUpForm from './SignUpForm'
import {connect} from 'react-redux'
import {signup} from '../../actions/auth'

class SignUpFormContainer extends React.Component {
state = {
    name: '',
    email: '',
    password: ''
  }

onSubmit = (event) => {
 event.preventDefault()
 this.props.signup(this.state.name, this.state.email, this.state.password)
 this.props.history.push('/events')
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
        <SignUpForm onSubmit={this.onSubmit} onChange={this.onChange} values={this.state}/>
     </div>
     
    </div>
  )
 }
}

export default connect(null, {signup})(SignUpFormContainer)