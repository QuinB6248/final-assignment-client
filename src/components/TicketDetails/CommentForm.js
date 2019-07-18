import React from 'react'
import '../component.css'

export default function CommentForm(props) {
  const { onChange, onSubmit, values} = props
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <label>comment</label>
            <input type='text' name={'comment'} value={values.comment} onChange={onChange} placeholder='comment'/>
          </div>
          <div>
            <button type='submit'>ADD</button>
          </div>
        </div>
      </form>
    </div>
  )
}
