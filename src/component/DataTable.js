import React, { useEffect, useState } from 'react'
import { Pencil, Plus, TrashIcon } from '../Icon'
import Form from './form/Form'
import { reducer } from './reducer'
import { useReducer } from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'
import UpdateForm from './form/UpdateForm'
import Cost from './Cost'

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
        console.log(data)
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

    const [query, setQuery] = useState('')
    const keys = ['date', 'merchant', 'total' , 'status' , 'comment']
        const newSearch = expenses?.filter((expense) =>
        keys.some((key) =>expense[key].toLowerCase().includes(query)) 
        )

    const setDataToStorage = (expense) =>{
        localStorage.setItem("expense" , JSON.stringify(expense))
        updateForm()
    } 
    
  return (
    <>
        {state.showForm && <Form closeForm = {closeForm} addData ={addData} />}
        {state.showUpdateForm &&  <UpdateForm 
         closeUpdateForm={closeUpdateForm}
         expenses ={expenses} 
         setExpenses ={setExpenses }
         /> }
         <section className='containerWrapper'>

            <div className='addBtnWrapper'>
                <button 
                onClick={() => addExpense()}
                className='addBtn'>
                    <Plus />
                </button>
            </div>
            <Cost  expenses={expenses} setExpenses={setExpenses}/>

                <table className="table table-hover">
                    <caption>
                        <div className='mt-5 ps-5 mb-2'>
                            <input
                            className='search'
                            type={`search`}
                            placeholder="Search"
                            onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                    </caption>
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
                            newSearch?.reverse().map((expense) => {
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
                 {!expenses?.length >0 && <div className='text-center fs-3' >Your Record is Empty</div>}

</section>
    
    </>
  )
}

export default DataTable