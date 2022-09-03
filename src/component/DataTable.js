import React, { useEffect, useState } from 'react'
import { Pencil, Plus, TrashIcon } from '../Icon'
import Form from './form/Form'
import { reducer } from './reducer'
import { useReducer } from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'
import UpdateForm from './form/UpdateForm'
import Cost from './Cost'
import Filter from './Filter'
import { filterReducer } from './filterReducer'

const DataTable = () => {
    const baseURL = "https://my-project-fake-api.herokuapp.com/expensedata"

    const [expenses, setExpenses] = useState([])

    const initialState = {
        showForm:false,
        showModal:true,
        showUpdateForm:false
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const addExpense = () => {
        dispatch({type: "ADD_EXPENSE"})
    }

    

    const closeForm = () => {
        dispatch ({type:"CLOSE_FORM"})
    }

    const updateForm = () => {
        dispatch ({type:"UPDATE_FORM"})
    }

    const closeUpdateForm = () => {
        dispatch ({type:"CLOSE_UPDATE_FORM"})
    }

    const getExpenses = async () => {
        const response = await axios.get(baseURL)
        setExpenses(response.data)
    }

    useEffect(() => {
     getExpenses()
    }, [])

    const addData = async(data) => {
        const request = {
            id:nanoid(),
            ...data
        }

        const response = await axios.post(baseURL,request )
        setExpenses([...expenses, response.data])
    }

    const removeData = async (id) => {
        await axios.delete(`${baseURL}/${id}`)
        const newData = expenses.filter((expense) => {
            return expense.id !== id;
        })
        setExpenses(newData)
    }

    const setDataToStorage = (expense) =>{
        localStorage.setItem("expense" , JSON.stringify(expense))
        updateForm()
    } 


    const [expenseState, expenseDispatch] = useReducer(filterReducer, {
        newExpenses:expenses,
        isNew:false,
        isCompleted:false,
        isInprogress:false,
        searchQuery:"",
        minimumPrice:"",
        maximumPrice:"",
        fromDate:"",
        toDate:"",
        merchant:""
    })

    const transformedExpenses = () => {
        let sortedExpenses= expenses

        if(expenseState.isNew){
            sortedExpenses = sortedExpenses.filter((expense) => expense.status === "New")
        }
        else if (expenseState.isCompleted){
            sortedExpenses = sortedExpenses.filter((expense) => expense.status === "Completed")
        }

        else if(expenseState.isInprogress){
            sortedExpenses =sortedExpenses.filter((expense) => expense.status === "Inprogress")
        }
        else if(expenseState.searchQuery){
            const keys = ['date', 'merchant', 'total' , 'status' , 'comment']
            sortedExpenses = sortedExpenses.filter((expense) =>
            keys.some((key) =>expense[key].toLowerCase().includes(expenseState.searchQuery.toLowerCase())) 
            )
        }
        else if(expenseState.merchant){
            sortedExpenses = sortedExpenses.filter((expense) => expense.merchant === expenseState.merchant )
        } 
       
        else if (expenseState.fromDate){
            sortedExpenses = sortedExpenses.filter((expense) => {
                return new Date(expense.date).getTime() >= new Date(expenseState.fromDate).getTime()
            })
        }
        else if (expenseState.toDate){
            sortedExpenses = sortedExpenses.filter((expense) => {
                return new Date(expense.date).getTime() >= new Date(expenseState.toDate).getTime()
            })
        }

         else if (expenseState.fromDate && expenseState.toDate){
            sortedExpenses = sortedExpenses.filter((expense) => {
                return  new Date(expense.date).getTime() >= new Date(expenseState.fromDate).getTime() &&
                new Date(expense.date).getTime() <=  new Date(expenseState.toDate).getTime()
            })
        }
        else if (expenseState.minimumPrice ){
            sortedExpenses = sortedExpenses.filter((expense) => {
                return Number(expense.total) >= expenseState.minimumPrice
            })
        }

        else if (expenseState.maximumPrice ){
            sortedExpenses = sortedExpenses.filter((expense) => {
                return Number(expense.total) <= expenseState.maximumPrice
            })
        }

        else if (expenseState.minimumPrice && expenseState.maximumPrice){
            sortedExpenses = sortedExpenses.filter((expense) => {
                return Number(expense.total) > expenseState.minimumPrice &&
                Number(expense.total) < expenseState.maximumPrice
            })
        }

        else{
            <div>No Record found</div>
        }

        return sortedExpenses
    }

  return (
    <div className='wrapper'>
        {state.showForm && <Form closeForm = {closeForm} addData ={addData} />}
        {state.showUpdateForm &&  <UpdateForm 
         closeUpdateForm={closeUpdateForm}
         expenses ={expenses} 
         setExpenses ={setExpenses }
         /> }
         <div>
             <Filter
              expenses={expenses}
              expenseState={expenseState} 
              expenseDispatch={expenseDispatch} 
              />
         </div>

         <section className='containerWrapper table-responsive pe-3 ps-3 mt-5 mb-5'>

            <div className='mt-3 ps-3 mb-2'>
                <input
                className='search'
                type={`search`}
                placeholder="Search expenses"
                onChange={ (e) => 
                    expenseDispatch({
                      type:"FILTER_SEARCH",
                      payload:e.target.value
                    })
                    }
                />
            </div>

            <div className='tableContainer'>
                <div className='addBtnWrapper'>
                    <button 
                    onClick={() => addExpense()}
                    className='addBtn'>
                        <Plus />
                    </button>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr id="tr">
                        <th scope="col">Date</th>
                        <th scope="col">Merchant</th>
                        <th scope="col">Total</th>
                        <th scope="col">Status</th>
                        <th scope="col">Comment</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transformedExpenses().reverse().map((expense) => {
                                return(
                                    <tr key={nanoid()}>
                                    <td>{expense.date}</td>
                                    <td>{expense.merchant}</td>
                                    <td>${expense.total}</td>
                                    <td>{expense.status}</td>
                                    <td>{expense.comment}</td>
                                    <td>
                                        <span className='me-4'>
                                            <button 
                                            className='deleteBtn'
                                            onClick={() => removeData (expense.id)}
                                                >
                                                    <TrashIcon />
                                            </button>
                                        </span>
                                        <span>
                                            <button className='updateBtn' onClick={() => setDataToStorage(expense)}><Pencil /></button>
                                        </span>
                                    </td>
                                    </tr>
                                )
                            })
                        }
                        

                    </tbody>
                </table>
            </div>
            {!expenses?.length >0 && <div className='text-center fs-3' >Your Record is Empty</div>}
            <div className='ps-3 pb-5'>
                <Cost  expenses={expenses} setExpenses={setExpenses}/>
            </div>      
        </section>
    
    </div>
  )
}

export default DataTable