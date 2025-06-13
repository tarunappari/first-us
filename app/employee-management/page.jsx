import Sidebar from '@/components/sidebar/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Sidebar />
      <div style={{marginLeft:'300px',padding:'3rem'}}>
        <h1>Employer Management</h1>
      </div>
    </div>
  )
}

export default page