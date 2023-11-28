import React from 'react';
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar';
import CardComponent from '../Components/CardComponent/CardComponent';

function AdminDashBoard() {
  const jwtToken = localStorage.getItem('jwt');

  if (!jwtToken) {
    
    return <div>Please log in to access the admin dashboard.</div>;
  }

 
  return (
    <div>
      <AdminNavbar />
      <CardComponent />
    </div>
  );
}

export default AdminDashBoard;

