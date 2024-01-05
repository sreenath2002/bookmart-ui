import React, { useState } from 'react';
import { useEffect } from 'react';
import './Orders.css'; // Import your CSS file for styling
import NavBar from '../NavBar/Navbar';
import ProductStatusPopup from '../ProductStatusPopup/ProductStatusPopup';
import { cancelorder, cancelorderReasons, getShoporderId, getOrderLine, getCancelOrderResons, setCancelStatus, showStatus } from '../../axios/service/userService.s';
const Orders = () => {

  const [refresh, setRefresh] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);

  const [orders, setOrders] = useState([]);
  const [statues, setStatues] = useState([]);
  const [cancelorderreasons, setCancelOrderReasons] = useState([]);
  const [error, setError] = useState('');
  // Sample order details
  const jwtToken = localStorage.getItem("jwt");
  const id = localStorage.getItem("id");
  useEffect(() => {

    fetchData()
    console.log("fdsj")
    async function fetchData() {
      try {
        // const IdofShoporder = await getShoporderId(jwtToken, id);
        // console.log("0000000000000000")
        const orderLines = await getOrderLine(jwtToken, id);
        const cancelreasons = await getCancelOrderResons(jwtToken);

        setCancelOrderReasons(cancelreasons.result);
        if (orderLines.statuscode === '200 OK') {
          setOrders(orderLines.result);
          console.log(orderLines.result)
          setError(''); // Clear any previous errors
        } else {
          setError('Internal Server Error');
        }
      } catch (error) {
        setError('No Orders'); // Catch any unexpected errors
      }
    }

  }, [!refresh]);
  const handleImageClick = () => {
    setShowModal(true);
  };
  const handleClosePopup = () => {
    setShowStatusPopup(false);
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStatusOrderId, setShowStatusOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [isOrderCancelled, setIsOrderCancelled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [servererror, setservererror] = useState(false)


  const handleCancelOrder = (selectedCancelOrderId) => {
    setShowModal(true);
    console.log(selectedCancelOrderId)
    setSelectedOrder(selectedCancelOrderId);
    setShowModal(true);
    console.log("hai sreenath")
  };

  const handleDropdownChange = (event) => {
    setCancelReason(event.target.value);
  };



  const handleShowStatus = (orederLineId) => {

    setSelectedOrder(orederLineId)
    handleStatusVisible();
  }

  const handleStatusVisible = async (orederLineId) => {

    try {
    
      const show = await showStatus(jwtToken, orederLineId)
      console.log(show)

      if (show.statuscode === '200 OK') {
        // setIsLoading(true);
        // setTimeout(() => {
        //   setIsOrderCancelled(true);
        //   setIsLoading(false);
        //   setTimeout(() => {
        //     setIsOrderCancelled(false);
        //     setShowModal(false)
        //     setRefresh(!refresh);
        //     setIsLoading(false);
        //   }, 2000);
        // }, 2000);

        setStatues(show.result);
        setShowStatusPopup(true);
      }
      else {
        setShowModal(false)
        setIsLoading(true);
        setTimeout(() => {
          setservererror(true);
          setIsLoading(false);

          setTimeout(() => {
            setservererror(false);

          }, 2000);
        }, 2000);

      }

    }
    catch
    {
      setShowModal(false)
      setIsLoading(true);
      setTimeout(() => {
        setservererror(true);
        setIsLoading(false);
        setTimeout(() => {
          setservererror(false);

        }, 2000);
      }, 2000);
    }

  };





  const handleCancel = async () => {

    try {
      const cancelOrderDetails = {
        orderLineId: selectedOrder,
        reasonId: cancelReason

      }
      const cancel = await cancelorder(jwtToken, cancelOrderDetails)
      console.log(cancel)
      const cancelstatusset = await setCancelStatus(jwtToken, selectedOrder)
      if (cancel.statuscode === '200 OK' && cancelstatusset.statuscode === '200 OK') {
        setIsLoading(true);
        setTimeout(() => {
          setIsOrderCancelled(true);
          setIsLoading(false);
          setTimeout(() => {
            setIsOrderCancelled(false);
            setShowModal(false)
            setRefresh(!refresh);
            setIsLoading(false);
          }, 2000);
        }, 2000);
      }
      else {
        setShowModal(false)
        setIsLoading(true);
        setTimeout(() => {
          setservererror(true);
          setIsLoading(false);

          setTimeout(() => {
            setservererror(false);

          }, 2000);
        }, 2000);

      }

    }
    catch
    {
      setShowModal(false)
      setIsLoading(true);
      setTimeout(() => {
        setservererror(true);
        setIsLoading(false);
        setTimeout(() => {
          setservererror(false);

        }, 2000);
      }, 2000);
    }

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
      {orders.length > 0 ? (
        orders.map((order) => (
          <div className="order-item" key={order.id} >
            <div className="product-image" onClick={handleImageClick}>
              {order.product.images[0] && (
                <img
                  src={order.product.images[0].imageUrl}
                  alt={`Book - ${order.product.title}`}
                />
              )}
            </div>
            <div className="product-details">
              <p className='orderdetails'>
                <h6 className='titleofbook'>{order.product.title}</h6>
                {order.product.course.parentCategory.name} || {order.product.course.courseName} {order.product.subject.subjectName} || {order.product.university.universityName} <br />|| {order.product.semester.name}
                <br />
                Written By: <span>{order.product.author}</span>
                <br />
                Quantity: {order.quantity}
                <p className='orderstatusdetails' onClick={() => handleStatusVisible(order.id)}>View Status</p>
              </p>

              <p>
                $ {order.price}
              </p>

              {order.currentstatus[0] && (
                order.currentstatus[0].statusId === 5 ? (
                  <h6 className='deliveredmsg'>Delivered</h6>
                ) : order.currentstatus[0].statusId === 6 ? (
                  <h6 className='cancelledmsg'>Cancelled</h6>
                ) : (
                  <button onClick={() => handleCancelOrder(order.id)}>Cancel Order</button>
                )
              )}
            </div>
          </div>
        ))
      ) : (
        <div className='noorders' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        No Orders
      </div>
      
      )}

      {showStatusPopup && <ProductStatusPopup statuses={statues} onClose={handleClosePopup} />}
      {showModal && (
        <div className="cancelmodal">
          <div className="cancelmodal-content">
            {!isOrderCancelled ? (
              <>
                <h2>Cancel Order</h2>
                <label>
                  Select Reason:
                  <select value={cancelorderreasons.reason} onChange={(e) => { setCancelReason(e.target.value) }}>
                    {cancelorderreasons.map((reasonname) => (
                      <option key={reasonname.id} value={reasonname.id}>
                        {reasonname.reason}
                      </option>
                    ))}
                  </select>
                </label>
                <button onClick={handleCancel}>Cancel Order</button>
                <button onClick={handleCloseModal}>Discard</button>
              </>
            ) : (
              <>
                <div className="success-message">
                  Order Cancelled <span>&#10003;</span>
                </div>
                <div className="loading">{isLoading && <p>Loading...</p>}</div>
                <div className="loading">{servererror && <p>Internal Server Error</p>}</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
