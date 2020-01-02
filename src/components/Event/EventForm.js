import React from 'react'
import '../component.css'

export default function EventForm(props) {
  const { onChange, onSubmit, values} = props
  
  const {requiredFormFields} = values
  const {validation} = values
  const {startDateValidation} = values
  const {endDateValidation} = values
  const {priceValidation} = values
  
  const warningDate =  <p style={{color: "red"}}>Write day as yyyy-mm-dd</p>
  const warningEnd =  <p style={{color: "red"}}> Date is older then today</p>
  const warningPrice =  <p style={{color: "red"}}>Fill in price as a whole number</p>
  
  const validEnd = !validation && warningEnd
  const validDateStart = !startDateValidation && warningDate
  const validDateEnd = !endDateValidation && warningDate
  const validPrice = !priceValidation && warningPrice
  
  return (
    <div className='formSpace'>
      <form onSubmit={onSubmit}>
        <div>
          <label>name</label>
          { requiredFormFields  ? 
            <input name={'name'} value={values.name} onChange={onChange} placeholder='name' required/>:
            <input name={'name'} value={values.name} onChange={onChange} placeholder='name' />
          }
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
            {validPrice}
            { requiredFormFields  ? 
              <input name={'avg_price'} value={values.avg_price} onChange={onChange} placeholder='price' required/>:
              <input name={'avg_price'} value={values.avg_price} onChange={onChange} placeholder='price'/>
            }           
          </div>
          <div>
            <label>start date</label>
            {validDateStart}
            { requiredFormFields  ? 
              <input name={'start'} value={values.start} onChange={onChange} placeholder='yyyy-mm-dd' required/>:
              <input name={'start'} value={values.start} onChange={onChange} placeholder='yyyy-mm-dd'/>
            } 
          </div>
          <div>
            <label>end date</label>
            {validEnd}
            {validDateEnd}
            { requiredFormFields  ? 
              <input name={'end'} value={values.end} onChange={onChange} placeholder='yyyy-mm-dd' required/>:
              <input name={'end'} value={values.end} onChange={onChange} placeholder='yyyy-mm-dd' />
            }
          </div>
          <div>
            <button type='submit'>ADD</button>
          </div>
        </div>
      </form>
    </div>
  )
}
