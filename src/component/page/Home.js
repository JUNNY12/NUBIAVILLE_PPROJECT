import React from 'react'
import DataTable from '../DataTable'
import Cost from "../Cost"
import Nav from "../Nav"


const Home = () => {

  return (
    <>
       <Nav />
      <div className='homeContainer'>
       <div className='tableResponsive pe-4 ps-5 mt-5 mb-5'>
          <DataTable />
       </div>
        <Cost />
    </div>
    </>
  )
}

export default Home