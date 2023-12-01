import React from 'react'
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar'
import UserTable from '../Components/UserDetails/UserTable'

function UserDetails() {
  const jwtToken = localStorage.getItem('jwt');
  if (!jwtToken) {
    
    return <div>Please log in to access the admin dashboard.</div>;
  }
  return (
    <div className='userdetails'>
      <br></br>
      <br></br>
      <br></br>

      {/* <AdminNavbar/> */}
       <UserTable/>
    </div>
  )
}

export default UserDetails
