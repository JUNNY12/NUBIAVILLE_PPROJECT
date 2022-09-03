import axios from "axios";
import { useContext, useReducer, useEffect, createContext } from "react";
import { expenseReducer } from "../Reducers/expenseReducer";


const baseURL = "https://my-project-fake-api.herokuapp.com/expensedata"
const Expense = createContext()


const Context = ({children}) => {
    const initialState = {
        expense:[],
    }
    const [state, dispatch] = useReducer(expenseReducer, initialState)
    useEffect(() => {
        const getExpenses = async () => {
            try {
                const response = await axios.get(baseURL)
                dispatch({type:"FETCH_SUCCESS", payload:response.data})
            } catch (error) {
                dispatch({type:"FETCH_ERROR"})
                console.log(error)
            }
        }
        getExpenses()
    }, [])
    return (
        <Expense.Provider value={{state, dispatch}}>
            {children}
        </Expense.Provider>
    )
}

export default Context

export const ExpenseState = () => {
    return useContext(Expense)
}