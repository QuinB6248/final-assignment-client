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