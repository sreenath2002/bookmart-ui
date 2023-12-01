import React from 'react';
import './CardComponent.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';
const CardComponent = () => {

  const navigate=useNavigate();
  return (
    <div className="card-container">
      <div className="row">
        <div className="small-card" onClick={()=>{navigate('/UserDetails')}}>
          <img src="Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg" alt="Small Image 1" className="card-image" />
          <p>Users</p>
        </div>
        <div className="small-card"onClick={()=>{navigate('/ProductTable')}} >
          <img src="Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg" alt="Small Image 2" className="card-image" />
          <p>Produts</p>
        </div>
      </div>
      <div className="row">
        <div className="small-card" onClick={navigate('/')}>
          <img src="Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg" alt="Small Image 1" className="card-image" />
          <p>Category</p>
        </div>
        <div className="small-card">
          <img src="Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg" alt="Small Image 2" className="card-image" />
          <p>Revenew</p>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
