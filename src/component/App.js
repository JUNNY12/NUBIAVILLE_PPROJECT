import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import Home from "./page/Home"
import { Routes, Route } from 'react-router-dom';
import Login from "./form/Login";
import Profile from "./page/Profile"

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element ={<Home />} />
        <Route path='/profile' element= {<Profile />} />
      </Routes>  
    </>
  )
}

export default App