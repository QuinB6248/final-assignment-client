import React from 'react'

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
    </div>
  )
}