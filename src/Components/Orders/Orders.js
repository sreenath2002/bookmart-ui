import React, { useState } from 'react';
import './Orders.css'; // Import your CSS file for styling
import NavBar from '../NavBar/Navbar';
import ProductStatusPopup from '../ProductStatusPopup/ProductStatusPopup';

const Orders = () => {
    const [showStatusPopup, setShowStatusPopup] = useState(false);
  // Sample order details
  const orders = [
    {
      id: 1,
      productName: 'Book Title 1',
      price: '$19.99',
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
      status: 'Processing',
    },
    {
      id: 2,
      productName: 'Book Title 2',
      price: '$24.99',
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
      status: 'Shipped',
    },
    // Add more orders as needed
  ];
  const handleImageClick = () => {
    setShowStatusPopup(true);
  };
  const handleClosePopup = () => {
    setShowStatusPopup(false);
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [isOrderCancelled, setIsOrderCancelled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleDropdownChange = (event) => {
    setCancelReason(event.target.value);
  };

  const handleCancel = () => {
    // Perform the cancel order logic here (e.g., send cancellation request to the server)

    // Simulating an asynchronous operation with setTimeout
    setIsLoading(true);
    setTimeout(() => {
      setIsOrderCancelled(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsOrderCancelled(false);
    setSelectedOrder(null);
    setCancelReason('');
  };

  return (
    <div className="orders-container">
      <NavBar />
      {orders.map((order) => (
        <div className="order-item" key={order.id}>
          <div className="product-image" onClick={handleImageClick}>
            <img src={order.imageUrl} alt={`Book - ${order.productName}`} />
          </div>
          <div className="product-details">
            <p>
              <strong>Book Name:</strong> {order.productName}
            </p>
            <p>
              <strong>Price:</strong> {order.price}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <button onClick={() => handleCancelOrder(order)}>Cancel Order</button>
          </div>
        </div>
      ))}
      {showStatusPopup && <ProductStatusPopup onClose={handleClosePopup} />}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {!isOrderCancelled ? (
              <>
                <h2>Cancel Order</h2>
                <label>
                  Select Reason:
                  <select value={cancelReason} onChange={handleDropdownChange}>
                    <option value="">Select a reason</option>
                    <option value="Out of stock">Out of stock</option>
                    <option value="Changed mind">Changed mind</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                <button onClick={handleCancel}>Cancel Product</button>
                <button onClick={handleCloseModal}>Discard</button>
              </>
            ) : (
              <>
                <div className="success-message">
                  Order Cancelled <span>&#10003;</span>
                </div>
                <div className="loading">{isLoading && <p>Loading...</p>}</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
