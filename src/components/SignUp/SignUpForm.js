import React from 'react'
import '../component.css'

export default function SignUpForm(props) {
  const { onChange, onSubmit, values} = props
  
  return (
    <div className='eventSpace'>
      <form onSubmit={onSubmit}>
      <div>
          <label>USERNAME</label>
        </div>
          <input name={'name'} onChange={onChange} value={values.name} placeholder='username'/>
        <div>
          <label>EMAIL</label>
        </div>
          <input name={'email'} onChange={onChange} value={values.email} placeholder='email'/>
        <div>
          <label>PASSWORD</label>
        </div>
          <input name={'password'} onChange={onChange} value={values.password} placeholder='password'/>
        <div>
          <button type='submit'>SIGNUP</button>
        </div>
      </form>
    </div>
  )
}