import React from 'react';
import './AdminNavbar.css'; // Import your CSS file for styling
 // Replace 'logo.png' with your logo file

const AdminNavbar = () => {
  const handleLogout = () => {
    // Add logout functionality here
    // For demo purposes, you can log out the user by clearing local storage or state
    console.log('Logged out');
  };

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
            <span className="profile-name">John Doe</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
