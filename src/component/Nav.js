import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='navWrapper'>
        <div className='logoName'>Expense Manager</div>
        <div className='profileLogout'>
           <Link to={`/profile`}>
                <button className='profile' role={`button`}>Profile</button>
           </Link>
            <Link to={`/`}> 
                <button className='logout' role={`button`}>Logout</button>
            </Link>
        </div>

    </nav>
  )
}

export default Nav