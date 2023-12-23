// OrderedProductDetails.js
import React, { useState } from 'react';
import './OrderedProductDetails.css'; // Your CSS file for styling

const OrderedProductDetails = ({ order }) => {
  const [showStatus, setShowStatus] = useState(false);

  const toggleShowStatus = () => {
    setShowStatus(!showStatus);
  };

  return (
    <div className="ordered-product-details" onClick={toggleShowStatus}>
      {/* Display the product image, name, and price */}
      <div className="product-details">
      
        <div className="info">
          <p>
            <strong>Product Name:</strong> 
          </p>
          <p>
            <strong>Price:</strong> 
          </p>
        </div>
      </div>
      
      {/* Show/hide the status details when clicked */}
      {showStatus && (
        <div className="status-details">
          <p>
            <strong>Status:</strong> 
          </p>
          {/* Display delivery address details */}
          <div className="delivery-address">
            <h3>Delivery Address</h3>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderedProductDetails;
