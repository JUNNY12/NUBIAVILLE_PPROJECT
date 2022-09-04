import React from 'react'
import {useState} from "react"
import {BiDownArrow} from "react-icons/bi"
import { useEffect } from 'react'

const Filter = ({expenseState, expenseDispatch , expenses}) => {

    const [show, setShow] = useState(false)
    const [filter, setFilter] = useState([])


    
    useEffect(() => {
        console.log(expenses)
      expenses.forEach((expense) => {
          console.log(expense.merchant)
        if(!filter.includes(expense.merchant)) {
            setFilter((prevState) => [...prevState, expense.merchant])
            console.log(expense.merchant)
         }
      })
    }, [expenses])
    
  return (
    <div className='filter px-3 py-3'>
        <div className='topFilter mb-2'>
            <h1 className='fs-5'>Filter expenses</h1>
            <div className='showButton fs-3' >
                <button
                onClick={() => setShow(prev => !prev)}
                ><BiDownArrow /></button>
            </div>
        </div>
        <div className={show?"filterContainer": "hideFilterContainer"}>
           <form className=''>
              <div>
                   <input 
                   type={`radio`}
                   name="status"
                   className='me-3'
                   onChange ={ () => 
                       expenseDispatch({
                           type:"FILTER_STATUS",
                           payload:"Completed"
                       })
                       }
                   />
                   <label>Completed</label>
              </div>

              <div>
                   <input
                   className='me-3' 
                   type={`radio`}
                   name="status"
                   onChange ={ () => 
                       expenseDispatch({
                           type:"FILTER_STATUS",
                           payload:"Inprogress"
                       })
                       }
                   />
                   <label>Inprogress</label>
              </div>

                <div>
                   <input 
                   className='me-3'
                   name="status"
                   type={`radio`}
                   onChange ={ () => 
                       expenseDispatch({
                           type:"FILTER_STATUS",
                           payload:"New"
                       })
                       }
                   />
                   <label>New</label>
              </div>

              <div className='minMax d-flex'>

                  <div>
                      <label>Min</label><br />
                      <input 
                      className='min'
                      type={`number`}
                      onChange={ (e) => 
                       expenseDispatch({
                         type:"FILTER_MINIMUM",
                         payload:e.target.value
                       })
                       }
                      
                      />
                  </div>
                   <div className='dash'></div>
                  <div>
                      <label>Max</label><br />
                      <input
                       className='max'
                       type={`number`}
                       onChange={ (e) => 
                           expenseDispatch({
                             type:"FILTER_MAXIMUM",
                             payload:e.target.value
                           })
                           }
                       />
                  </div>

              </div>

              <div className='dateFilter mt-4'>
                  <div className='mb-3'>
                      <label className='me-3'>From:</label>
                      <input 
                      className='dateInput'
                      type={`date`} 
                      onChange={ (e) => 
                       expenseDispatch({
                           type:"FILTER_FROM_DATE",
                           payload:e.target.value
                       })
                       }
                      />
                       
                  </div>

                  <div>
                      <label className='me-4'>To:</label>
                      <input
                      className='ms-3 dateInput'
                      type={`date`}
                      onChange={ (e) => 
                       expenseDispatch({
                           type:"FILTER_TO_DATE",
                           payload:e.target.value
                       })
                       }
                      />
                  </div>
              </div>

              <div className="inputWrapper mt-4">
                   <label>Merchant</label> <br />
                   <select 
                   className='merchantInput'
                   type={`text`}
                   onChange={ (e) => 
                       expenseDispatch({
                           type:"FILTER_MERCHANT",
                           payload:e.target.value
                       })
                       }
                   >
                       <option selected></option>
                       {
                           filter.map((expense) => <option>{expense}</option>)
                       }
                   </select>
                </div>

              <div className='mt-5'>
                   <button 
                   className='clearFilter'
                   onClick={ (e) => {
                       e.preventDefault() 
                       expenseDispatch({
                         type:"CLEAR_FILTERS", 
                       })}
                       }
                   >Clear Filter</button>
              </div>
           </form>
        </div>
       
    </div>
  )
}

export default Filter