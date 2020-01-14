import React from 'react'


export default function TicketForm(props) {
  const { onChange, onSubmit, values} = props

  const {priceValidation} = values
  const {requiredFormFields} = values
  const warningPrice =  <p style={{color: "red"}}>Fill in price as a whole number</p>
  const validPrice = !priceValidation && warningPrice
  
  return (
    <div className='formSpace'>
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
            {validPrice}
            { requiredFormFields  ? 
              <input name={'price'} value={values.price} onChange={onChange} placeholder='price' required/>:
              <input name={'price'} value={values.price} onChange={onChange} placeholder='price' />
            }
          </div>
          <div>
            <button className= 'formButton' type='submit'>ADD</button>
          </div>
        </div>
      </form>
    </div>
  )
}
