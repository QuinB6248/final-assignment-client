import React from 'react'
import { Link } from 'react-router-dom'
import '../component.css'

export default function LoginForm(props) {
  const { onChange, onSubmit, values} = props
  const existingUser = values.existingUser
  const warning =  <p style={{color: "red"}}>No Account</p>
  const valid = !existingUser && warning
  
  return (
    <div className='loginBox'>
      <form onSubmit={onSubmit}>
        <div className='loginSpace'>
          <div>
            <label>EMAIL</label>
          </div>
          <input name={'email'} onChange={onChange} value={values.email} placeholder='email'/>
          <div>
            <label>PASSWORD</label>
          </div>
          <input name={'password'} onChange={onChange} value={values.password} placeholder='password'/>
          <div style={{paddingBottom: '20px'}}>{valid}</div>
          <div>
            <button type='submit'>LOGIN</button>
          </div>
        </div>
      </form>
      <div className='signUpAccount'>
        <h4>No account yet? First Sign Up:    </h4>
      </div>
      <div className='signUpLink'>
        <Link to={`/signup`}>SIGN UP</Link>
      </div>
    </div>
  )
}

