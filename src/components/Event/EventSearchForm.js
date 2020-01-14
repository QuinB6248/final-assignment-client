import React from 'react'
import '../component.css'

export default function EventForm(props) {
  const { onChange, onSubmit, values} = props
  
  
  
  return (
    <div className='searchFormSpace'>
      <form name='searchform' onSubmit={onSubmit}>
        
        <div>
          <div>
            <input className='inputSearchForm' type='text' name={'eventName'} value={values.eventName} onChange={onChange} placeholder='EVENT'/>
          </div>
          <div>
            <input className='inputSearchForm' type='text' name={'userName'} value={values.userName} onChange={onChange} placeholder='AUTHOR'/>
          </div>
          
          
          <div>
            <button className='searchButton' type='submit'>search</button>
          </div>
        </div>
      </form>
    </div>
  )
}
