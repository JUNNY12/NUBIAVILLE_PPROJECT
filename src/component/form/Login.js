import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const demoUsername = "JohnDoe"
    const demoPassword = "Password"

    const[user, setUser] = useState({
        userName:demoUsername,
        password:demoPassword
    })

    const handleChange = (e) => {
        e.preventDefault()

        const {name, value} = e.target

        setUser (prevData => {
            return{
                ...prevData,
                [name]:value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (demoPassword === user.password && demoUsername === user.userName){
           navigate("/home")
        }
        else{
            alert("Incorrect Password")
        }
        console.log(user)
    }


  return (
    <div className='loginWrapper'>
        <h1 className='header text-center mb-5'>Welcome to Expense Manager</h1>
        <form onSubmit={handleSubmit}>

           <div className='mb-3'>
               <label>UserName</label> <br />
               <input
               className='loginInput'
               name='userName'
               value={user.userName}
               onChange={handleChange}
               type={`text`}
               />
           </div>

           <div className='mb-4'>
               <label>Password</label> <br />
               <input 
                className='loginInput'
                name='password'
                value={user.password}
                onChange={handleChange}
                type={`password`}
               />
           </div>

            <button className='loginBtn'>Login</button>
        </form>
        <div className='mt-4 fs-6 fw-bold'>
            <p>Dont Have an account yet? <span className='signUp'> Sign Up</span></p>
        </div>
    </div>
  )
}

export default Login