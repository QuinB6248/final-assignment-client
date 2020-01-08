import React from 'react'
import LoginForm from './Loginform'
import {connect} from 'react-redux'
import {login } from '../../actions/auth'

class LoginFormContainer extends React.Component {
  state = {
    email: '',
    password: '',
    existingUser: true,
    validationEmail: true
  }

  onSubmit = (event) => {
    event.preventDefault()
    const emailIsValid = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const emailTrue = emailIsValid(this.state.email)
    if(emailTrue !== true) {
      return this.setState({ validationEmail: false })
  } 
    this.props.login(this.state.email, this.state.password)
    setTimeout(this.check, 400);
  }

  check = () => {
    if(this.props.authenticated) {return this.props.history.goBack()}
    return this.setState({existingUser: false})
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div>
        <div>
          <LoginForm authenticated={this.props.authenticated} onSubmit={this.onSubmit} onChange={this.onChange} values={this.state}/>
        </div>
      </div>
    )
  } 
}


const mapStateToProps = state => ({
  authenticated: state.authUser
})

export default connect(mapStateToProps, {login})(LoginFormContainer)