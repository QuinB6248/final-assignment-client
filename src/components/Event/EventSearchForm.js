import React from 'react'
import '../component.css'

export default function EventForm(props) {
  const { onChange, onSubmit, values} = props
  
  return (
    <div className='searchFormSpace'>
      <form name='searchform' onSubmit={onSubmit}>
        <input className='inputSearchForm' type='text' name={'eventName'} value={values.eventName} onChange={onChange} placeholder='event'/>
        <button className='searchButton ' type='submit'> 
          <span className="material-icons">search</span>
        </button>
        {/* <div>
            <input className='inputSearchForm' type='text' name={'userName'} value={values.userName} onChange={onChange} placeholder='AUTHOR'/>
          </div> */}
      </form>
    </div>
  )
}
