import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css';
import axios from 'axios'; // Import your CSS file for styling
 // Replace 'logo.png' with your logo file
import { useSelector } from 'react-redux/es/hooks/useSelector';
const AdminNavbar = () => {
  const firstName=useSelector((state)=>state.user.firstName)
  const lastName=useSelector((state)=>state.user.lastName)
  const jwtToken = localStorage.getItem("jwt");
   const navigate=useNavigate();
   
  const handleLogout = async () => {
   
    
    try {

      if(jwtToken)
      {
        
       await  axios.post("http://localhost:8084/api/auth/logout",{},{
          
       headers: {
        Authorization: `Bearer ${jwtToken}` // Include the token in the headers
      }
         
        }).then((res)=>{
          
          console.log("rfghjk")
         
          if(res.data.statuscode=='200 OK'){
            localStorage.removeItem('jwt');
            navigate('/AdminLogin');
          }
      
        }).catch((error)=>{

          console.error(error)
        })
      }
     
      
    } catch (error) {
     
      console.error(error);
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="app-name">
          <img src="Images/text-1696662701871.png" alt="App Logo" className="app-logo" />
          <span>App Name</span>
        </div>
        <div className="profile-section">
          <div className="profile-info">
            <img src="profile-picture.jpg" alt="Profile" className="profile-image" />
           <span className="user-name">{firstName}{lastName}</span>:<span className="user-name">Welcome Admin</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
