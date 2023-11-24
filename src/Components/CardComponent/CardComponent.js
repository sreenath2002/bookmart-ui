import React from 'react';
import './CardComponent.css'; // Import your CSS file for styling

const CardComponent = () => {
  return (
    <div className="card-container">
      <div className="row">
        <div className="small-card">
          <img src="Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg" alt="Small Image 1" className="card-image" />
          <p>Users: 5</p>
        </div>
        <div className="small-card">
          <img src="Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg" alt="Small Image 2" className="card-image" />
          <p>Users: 5</p>
        </div>
      </div>
      <div className="row">
        <div className="small-card">
          <img src="Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg" alt="Small Image 1" className="card-image" />
          <p>Users: 5</p>
        </div>
        <div className="small-card">
          <img src="Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg" alt="Small Image 2" className="card-image" />
          <p>Users: 5</p>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
