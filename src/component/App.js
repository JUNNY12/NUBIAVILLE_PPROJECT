import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import Home from "./page/Home"
import { Routes, Route } from 'react-router-dom';
import Login from "./form/Login";
import Profile from "./page/Profile"
import { ExpenseProvider } from './context/ExpenseContext';

const App = () => {
  return (
    <>
     <ExpenseProvider >
      <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element ={<Home />} />
          <Route path='/profile' element= {<Profile />} />
        </Routes>  
     </ExpenseProvider>
    </>
  )
}

export default App