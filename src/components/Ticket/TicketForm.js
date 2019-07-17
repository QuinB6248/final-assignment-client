import React from 'react'

export default function TicketForm(props) {
  const { onChange, onSubmit, values} = props
  
  return (
    <div>
      
      <form onSubmit={onSubmit}>
        
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
            <input name={'price'} value={values.price} onChange={onChange} placeholder='price'/>
          </div>
          
          <div>
            <button type='submit'>ADD</button>
          </div>
        
        </div>
        
      </form>
      
    </div>
  )
}
