import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginForm(props) {
  const { onChange, onSubmit, values} = props
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>EMAIL</label>
        </div>
          <input name={'email'} onChange={onChange} value={values.email} placeholder='email'/>
        <div>
          <label>PASSWORD</label>
        </div>
          <input name={'password'} onChange={onChange} value={values.password} placeholder='password'/>
        <div>
          <button type='submit'>LOGIN</button>
        </div>
          
      </form>
      <h4>No account yet? Please Sign Up:</h4>
      <Link to={`/signup`}>SIGN UP</Link>
    </div>
  )
}