import React from 'react'
import '../component.css'

export default function SignUpForm(props) {
  const { onChange, onSubmit, values} = props
  const validTrue = values.validation
  const warning =  <p style={{color: "red"}}>this is not a valid email-address</p>
  const valid = !validTrue && warning
  
  return (
    <div className='loginBox'>
      <form onSubmit={onSubmit}>
        <div className='loginSpace'>
          <div>
            <label>USERNAME</label>
          </div>
          <input name={'name'} onChange={onChange} value={values.name} placeholder='username'/>
          <div>
            <label>EMAIL</label>
            {valid}
          </div>
          <input name={'email'} onChange={onChange} value={values.email} placeholder='email'/>
          <div>
            <label>PASSWORD</label>
          </div>
          <input name={'password'} onChange={onChange} value={values.password} placeholder='password'/>
          <div>
            <button type='submit'>SIGNUP</button>
          </div>
        </div>
      </form>
    </div>
  )
}