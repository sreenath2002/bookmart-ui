import React, { useState } from 'react';
import { useEffect } from 'react';
import './Orders.css'; // Import your CSS file for styling
import NavBar from '../NavBar/Navbar';
import ProductStatusPopup from '../ProductStatusPopup/ProductStatusPopup';
import { cancelorder,cancelorderReasons,getShoporderId,getOrderLine } from '../../axios/service/userService.s';
const Orders = () => {

  const[refresh,setRefresh]=useState(false);
    const [showStatusPopup, setShowStatusPopup] = useState(false);

    const[orders,setOrders]=useState([]);
    const [error, setError] = useState('');
  // Sample order details
  const jwtToken = localStorage.getItem("jwt");
  const id = localStorage.getItem("id");
  useEffect(() => {

    fetchData()
    console.log("fdsj")
    async function fetchData() {
      try {
        const IdofShoporder = await getShoporderId(jwtToken, id);
        const orderLines = await getOrderLine(jwtToken, IdofShoporder.result);
  
        if (IdofShoporder.statuscode === '200 OK' && orderLines.statuscode === '200 OK') {
          setOrders(orderLines.result);
          setError(''); // Clear any previous errors
        } else {
          setError('Internal Server Error');
        }
      } catch (error) {
        setError('Error fetching data'); // Catch any unexpected errors
      }
    }

  }, [!refresh]);
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
      {error && <div>{error}</div>}
      {orders.map((order) => (
        <div className="order-item" key={order.id}>
          <div className="product-image" onClick={handleImageClick}>
            <img src={order.product.images[0].imageUrl} alt={`Book - ${order.product.title}`} />
          </div>
          <div className="product-details">
            <p>
              <strong>Book Name:</strong> {order.product.title}
            </p>
            <p>
              <strong>Price:</strong> {order.price}
            </p>
            <p>
              <strong>Status:</strong> {order.orderStatusDetails.status.name}
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
