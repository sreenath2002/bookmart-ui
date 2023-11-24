import React from 'react';
import './UpdateUser.css'; // Import your CSS file for styling

const UpdateUser = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (update user details)
    // For demonstration, you can log form data
    const formData = new FormData(e.target);
    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    console.log('Form Data:', formDataObj);
  };

  return (
    <div className="update-user-form-container">
      <form onSubmit={handleSubmit} className="update-user-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="update-btn">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
