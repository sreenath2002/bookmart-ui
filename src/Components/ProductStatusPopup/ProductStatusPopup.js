// ProductStatusPopup.js
import React from 'react';
import './ProductStatusPopup.css'; // Import CSS file for styling

const ProductStatusPopup = ({ onClose }) => {
  // Sample status details
  const statusDetails = [
    { status: 'Item Packed', date: 'Dec 20, 2023', time: '10:00 AM' },
    { status: 'Item Shipped', date: 'Dec 21, 2023', time: '9:30 AM' },
    { status: 'Out for Delivery', date: 'Dec 23, 2023', time: '8:45 AM' },
    { status: 'Delivered', date: 'Dec 24, 2023', time: '11:15 AM' },
  ];

  return (
    <div className="product-status-popup">
      <div className="popup-header">
        <h2>Status Details</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="status-list">
        {statusDetails.map((detail, index) => (
          <div key={index} className="status-item">
            <div className="status-icon">&#x2713;</div>
            <div className="status-info">
              <p>{detail.status}</p>
              <p>Date: {detail.date}</p>
              <p>Time: {detail.time}</p>
            </div>
            {index !== statusDetails.length - 1 && <div className="line"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductStatusPopup;
