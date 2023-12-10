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
        <img src={order.imageUrl} alt={`Product - ${order.productName}`} />
        <div className="info">
          <p>
            <strong>Product Name:</strong> {order.productName}
          </p>
          <p>
            <strong>Price:</strong> {order.price}
          </p>
        </div>
      </div>
      
      {/* Show/hide the status details when clicked */}
      {showStatus && (
        <div className="status-details">
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          {/* Display delivery address details */}
          <div className="delivery-address">
            <h3>Delivery Address</h3>
            <p>{order.deliveryAddress}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderedProductDetails;
