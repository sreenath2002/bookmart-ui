import React, { useState } from 'react';
import NavBar from '../NavBar/Navbar';
import './UserProfile.css';

const UserProfile = () => {
  const [userImage, setUserImage] = useState(null);
  const [showProducts, setShowProducts] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showRevenue, setShowRevenue] = useState(false); // New state
  const [userName, setUserName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [editMode, setEditMode] = useState(false);
  const [addresses, setAddresses] = useState([
    '123 Main St, City, Country',
    '456 Park Ave, Town, Country',
    
   
    // Add more addresses as needed
  ]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    houseName: '',
    streetName: '',
    landmark: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  });
  const handleAddressInputChange = (event) => {
    const { name, value } = event.target;
    setNewAddress({
      ...newAddress,
      [name]: value,
    });
  };
  const handleAddAddress = () => {
    setShowAddAddress(true);
  };
  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setUserImage(image);
  };
  const handleSaveChanges = () => {
    setEditMode(false);
    // Logic to save changes (update state or send to backend)
  };
  const handleSaveAddress = () => {
    setShowAddAddress(false);
    // Logic to save the new address
    setAddresses([...addresses, newAddress]);
   
    setNewAddress({
      houseName: '',
      streetName: '',
      landmark: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
    });
  };

 

  return (
    <div className="user-profile">
      <NavBar/>
 {!editMode && !showAddAddress && <div className="left-section">
    <div className="user-image-section">
      <label htmlFor="userImage" className="upload-icon">
        <input
          type="file"
          id="userImage"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        {userImage ? (
          <img src={URL.createObjectURL(userImage)} alt="User" className="user-image" />
        ) : (
          <div className="add-image-placeholder">+</div>
        )}
      </label>
    </div>
    <div className="user-options">
      <button onClick={() => setShowProducts(!showProducts)}>Show My Products</button>
      <button onClick={() => setShowOrders(!showOrders)}>My Orders</button>
      <button onClick={() => setShowRevenue(!showRevenue)}>My Revenue</button>
    </div>
  </div>}
  <div className="right-section">
    
      {editMode ? (
        // Edit mode input fields
        <>
        <div className="edit-details">
          <label>
            Name: <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </label>
          <label>
            Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Phone: <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <button onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </>
        
      ) :showAddAddress ? (
        <>
        <div className='add-address'>
          <h2>Add Address</h2>
          
            <input
              type="text"
              name="houseName"
              placeholder='House Name'
              value={newAddress.houseName}
              onChange={handleAddressInputChange}
            />
         
          
            <input
              type="text"
              name="streetName"
              placeholder='Street name'
              value={newAddress.streetName}
              onChange={handleAddressInputChange}
            />
         
        
            <input
              type="text"
              name="landmark"
              placeholder='LandMark'
              value={newAddress.landmark}
              onChange={handleAddressInputChange}
            />
         
          
            <input type="text" name="city" placeholder='City' value={newAddress.city} onChange={handleAddressInputChange} />
         
         
            <input type="text" name="state" placeholder='State' value={newAddress.state} onChange={handleAddressInputChange} />
         
        
            <input
              type="text"
              name="country"
              placeholder='Country'
              value={newAddress.country}
              onChange={handleAddressInputChange}
            />
         
          
            <input
              type="text"
              name="pincode"
              placeholder='Pincode'
              value={newAddress.pincode}
              onChange={handleAddressInputChange}
            />
        
          <button onClick={handleSaveAddress}>Save Address</button>
          </div>
        </>
      ) : (
        <>
          {/* User Details section */}
          <div className="user-details">
            <h2>User Details</h2>
            <p>
              <strong>Name:</strong> {userName}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Phone:</strong> {phone}
            </p>
            <button onClick={handleEditProfile}>Edit Profile</button>
          </div>
          <br />
          <div className="user-details">
            {/* Addresses section */}
            <h2>Addresses</h2>
            <div className="address-container">
              {addresses.map((address, index) => (
                <div className="address-item" key={index}>
                  {address}
                </div>
              ))}
            </div>
            <button onClick={handleAddAddress}>Add Address</button>
            {showRevenue && (
              <div>
                <h2>My Revenue</h2>
                <p>Revenue details go here...</p>
              </div>
            )}
          </div>
        </>
      )}
    
  </div>
</div>

  );
};



export default UserProfile;
