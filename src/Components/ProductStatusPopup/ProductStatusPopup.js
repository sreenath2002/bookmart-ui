// ProductStatusPopup.js
import React from 'react';
import './ProductStatusPopup.css'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faTruck, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { MdErrorOutline } from 'react-icons/md';
import { RiTruckLine } from 'react-icons/ri';
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io';

const ProductStatusPopup = ({ statuses, onClose }) => {
  const statusIcons = [
    { status: 'Order Placed', icon: <FontAwesomeIcon icon={faCheckCircle} /> },
    { id: 'Item Packed', icon: <FontAwesomeIcon icon={faCheckCircle} /> },
    { status: 'Item Shipped', icon: <FontAwesomeIcon icon={faBox} /> },
    { status: 'Item Shipped', icon: <FontAwesomeIcon icon={faTruck} /> },
    { status: 'Out for Delivery', icon: <RiTruckLine /> },
    { status: 'Delivered', icon: <IoIosCheckmarkCircleOutline /> },
    { status: 'Order Cancelled', icon: <IoIosCloseCircleOutline /> },
    { status: 'Unable to Fetch', icon: <MdErrorOutline /> },
    // Add more statuses and corresponding icons if needed
  ];
  // Sample status details

  const formatTime = (timeString) => {
    const time = new Date(`1970-01-01T${timeString}Z`);
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };
  return (
    <div className="product-status-popup">
      <div className="popup-header">
        <h2>Status Details</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="status-list">
        {statuses.map((detail) => (
          <div key={detail.id} className="status-item">
            <div className="status-info">
              <p className={detail.status.id === 6 ? 'nameofStatus red-text' : 'nameofStatus'}>
                {detail.status.name}
              </p>
              <div className='statusinformation'>
                <p>Date: <span className='detailinfo'>{detail.reacheddate.split('T')[0]}</span></p>
                {detail.status.id !== 1 && (
                  <>
                    <p>Time: <span className='detailinfo'>{formatTime(detail.reachedtime)}</span></p>
                    <p>Location: <span className='detailinfo'>{detail.location}</span></p>
                  </>
                )}
              </div>
            </div>
            {/* Display status icon based on detail.status.id */}
            <div className="status-icon">{statusIcons[detail.status.id].icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductStatusPopup;
