import React from 'react'
import '../component.css'

export default function CommentForm(props) {
  const { onChange, onSubmit, values} = props

  const {inputText} = values
  const warningText =  <p style={{color: "red"}}>Fill in comment!</p>
  const validText = !inputText && warningText
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <label>comment</label>
            { validText}
            <input type='text' name={'comment'} value={values.comment} onChange={onChange} placeholder='comment' />
          </div>
          <div>
            <button type='submit' className='loginButton buttonField '>ADD</button>
          </div>
        </div>
      </form>
    </div>
  )
}
