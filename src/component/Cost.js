import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Cost = () => {
  const baseURL = "https://my-project-fake-api.herokuapp.com/expensedata"
  const [price, setPrice] = useState()



useEffect(() => {
  const getData = async () => {
    const response = await axios.get(baseURL)
    const expenseResponse = response.data
    const sum = expenseResponse.reduce((accumulator, expense) => {
      return accumulator + Number(expense.total)
    }, 0)
    console.log(sum)
    setPrice(sum)
}
  getData()
}, [price])





  return (
    <section className='mt-5'>
       <div>
           <span className='me-3 fs-3'>Total Amount:</span>
           <span className='fs-4'>${price}</span>
       </div>
    </section>
  )
}

export default Cost