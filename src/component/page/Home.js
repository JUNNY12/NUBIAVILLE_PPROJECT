import React from 'react'
import DataTable from '../DataTable'
import Nav from "../Nav"


const Home = () => {

  return (
    <>
       <Nav />
      <div className='homeContainer'>
       <div>
          <DataTable />
       </div>
    </div>
    </>
  )
}

export default Home