import { createContext, useEffect,useState } from "react";
import axios from "axios";

const ExpenseContext = createContext()

export function ExpenseProvider({children}){
    const [data, setData] =useState(null)
    const [totalSum, setTotalSum] = useState()
    const baseURL = "https://my-project-fake-api.herokuapp.com/expensedata"

    useEffect(() => {
        const getExpenses = async () => {
            const response = await axios.get(baseURL)
            const expenseResponse = response.data
            setData(expenseResponse)
            console.log(expenseResponse)
        }

        getExpenses()
    }, [data])

    useEffect(() => {
  const getData = async () => {
    const response = await axios.get(baseURL)
    const expenseResponse = response.data
    const sum = expenseResponse.reduce((accumulator, expense) => {
      return accumulator + Number(expense.total)
    }, 0)
    
    setTotalSum(sum)
}
  getData()
}, [data])

    
        return(
            <ExpenseContext.Provider value={{data, totalSum}}>
                {children}
            </ExpenseContext.Provider>
        )
    
}

export default ExpenseContext