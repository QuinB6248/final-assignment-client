import React from 'react'
import '../component.css'

export default function EventForm(props) {
  const { onChange, onSubmit, values} = props
  
  return (
    <div className='formSpace'>
      <form onSubmit={onSubmit}>
        <div>
          <label>name</label>
          <input name={'name'} value={values.name} onChange={onChange} placeholder='name'/>
        </div>
        <div>
          <div>
            <label>image</label>
            <input type='text' name={'image'} value={values.image} onChange={onChange} placeholder='image'/>
          </div>
          <div>
            <label>description</label>
            <input type='text' name={'description'} value={values.description} onChange={onChange} placeholder='description'/>
          </div>
          <div>
            <label>price</label>
            <input name={'avg_price'} value={values.avg_price} onChange={onChange} placeholder='price'/>
          </div>
          <div>
            <label>start date</label>
            <input name={'start'} value={values.start} onChange={onChange} placeholder='yyyy-mm-dd'/>
          </div>
          <div>
            <label>end date</label>
            <input name={'end'} value={values.end} onChange={onChange} placeholder='yyyy-mm-dd'/>
          </div>
          <div>
            <button type='submit'>ADD</button>
          </div>
        </div>
      </form>
    </div>
  )
}
