import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='navWrapper'>
        <div className='logoName'>Expense Manager</div>
        <div className='profileLogout'>
           <Link to={`/profile`}>
                <button className='profile'>Profile</button>
           </Link>
            <Link to={`/`}> 
                <button className='logout'>Logout</button>
            </Link>
        </div>

    </nav>
  )
}

export default Nav