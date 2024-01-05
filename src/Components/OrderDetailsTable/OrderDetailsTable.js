import { useState } from 'react';
import { Image, Button } from 'react-bootstrap';
import { FaEye, FaEdit } from 'react-icons/fa';
import './OrderDetailsTable.css';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import { statuschange, getOrders, getAllstatusNames,getStatusOfTheProduct } from '../../axios/service/adminServices';
import { useNavigate } from 'react-router-dom';
import { gettheorderStatus } from '../../axios/service/userService.s';
import { useEffect } from 'react';
const OrderDetailsTable = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrderId, setSelectedOrder] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [orderDetails, setorderDetails] = useState([]);
  const [statuesNames, setStatusNames] = useState([]);
  const [statusName, setStatusname] = useState('');
  const [totalamt, setTotalAmt] = useState();
  const [refresh, setRefresh] = useState(false);
  const [date, setDate] = useState();
  const [place, setPlace] = useState();
  const [timeReached, setTimeReached] = useState();
  const [statusId, setstatusId] = useState();
  const [IdofOrder, setIdofOrder] = useState();
  const [statuschangemsg, setStatusChangeMsg] = useState();
  const [errormsg, setErrormsg] = useState();
  const jwtToken = localStorage.getItem("jwt");
  const[detailsStatus,setStatusDetails]=useState([]);
  const [showbutton, setShowButton] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {

    if(!jwtToken)
    {
      navigate('/AdminLogin')
    }

    featchData()
    console.log("fdsj")
    async function featchData() {
      console.log("-------fist start-------")
      const allorders = await getOrders(jwtToken);
      const namesofStatus = await getAllstatusNames(jwtToken);
      setStatusNames(namesofStatus.result);
      console.log("--------------------------------------------------")
      console.log("-----------hai--------");
       

      if (allorders.statuscode === '200 OK') {

        setorderDetails(allorders.result)
        console.log(allorders.result)

        console.log("---cart------");
      }
      if(orderDetails.length>0)
      {
        return(<div>
          No Orders
        </div>)
      }

    }

  }, [!refresh]);

  const openDetails = (order, qty, pri) => {
   
    setTotalAmt(qty * pri);
    setSelectedOrder(order);

    console.log(order);
    setShowDetails(true);
  };
  const openEdit = (order) => {
    setIdofOrder(order);
    setEditMode(true);
  };

  const handlegetstatus = async () => {
    try {
      const allstatuses = await getStatusOfTheProduct(jwtToken, selectedOrderId);
      if (allstatuses.statuscode === '200 OK') {
        console.log("++++++????????")
         console.log(allstatuses.result)
         setStatusDetails(allstatuses.result)
        
        setStatusname(allstatuses.result[0].status);
        
      }
      else {
        setStatusname("Unable to fetch Status")
      }

    }
    catch {
      setStatusname("Unable to fetch Status")
    }
  }

  const closeDetails = () => {
    setShowDetails(false);
  };
  const closePopup = () => {
    setShowDetails(false);
    setRefresh(!refresh);
    setEditMode(false);
  };

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {
      console.log("/????/???")
      const changeStatusDetails = {
        orderLineId: IdofOrder,
        statusId: statusId,
        reachedDate: date,
        reachedTime: timeReached,
        location: place
      }

      const changethestatus = await statuschange(jwtToken, changeStatusDetails);
      console.log("9999999")
      if (changethestatus.statuscode === '200 OK') {
        setStatusChangeMsg(true);
        setTimeout(() => {
          setStatusChangeMsg(false);

        }, 3000)

      }

      else {
        console.log("988888888888888888888888888888888888")
        setErrormsg(true)
        setTimeout(() => {
          setErrormsg(false)
          closePopup();
        }, 3000)
      }


    }
    catch {
      setErrormsg(true)
      setTimeout(() => {
        setErrormsg(false)
        closePopup();
      }, 3000)
    }

  };

  return (
    <div>
      <AdminNavbar />
      {
  orderDetails && orderDetails.length > 0 ? (
    <div className='ordercontainertable'>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Details</th>
            <th>Ordered User Name</th>
            <th>Actions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((order) => (
            <tr key={order.id}>
              <td>
                {order.product.images[0] && order.product.images[0].imageUrl && (
                  <img src={order.product.images[0].imageUrl} alt="Product" />
                )}
              </td>
              <td>
                <p className='headingpara'>{order.product.title}</p>
                <p className='descriptionpara'>
                  {order.product.parentCategory && order.product.parentCategory.name} | {order.product.course && order.product.course.courseName} {order.product.subject && order.product.subject.subjectName} | {order.product.university && order.product.university.universityName} | {order.product.semester && order.product.semester.name}
                </p>
              </td>
              <td>
                <p>{order.user}</p>
              </td>
              <td>
                <div className='actions'>
                  <FaEye onClick={() => openDetails(order.id, order.quantity, order.price)} />
                 {order.currentstatus[0].statusId !=6 && (<FaEdit onClick={() => openEdit(order.id)} />) }
                </div>
              </td>
              <td>
              <p className='status'> <span className={order.currentstatus[0].status === 'Order Cancelled'  ? 'sta red' : 'sta green'}>{order.currentstatus[0].status}</span></p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className='noorders' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        No Orders
      </div>
  )
}

     

      {showDetails && (
        <div className='custom-modal'>
          <div className='modal-content'>
            <span className='close-btn' onClick={closeDetails}>&times;</span>
            {/* Assuming orderId represents the ID of the specific order */}
            {orderDetails
              .filter((selectedOrder) => selectedOrder.id === selectedOrderId)
              .map((selectedOrder) => (
                <div key={selectedOrder.id}>
                  <div className='maininfo'>

                    <Image className='selectproductimg' src={selectedOrder.product.images[0].imageUrl} alt="Product" thumbnail />
                    <div className='des'>
                      <h5> {selectedOrder.product.title}</h5>
                      <p className='descriptionpara'>{selectedOrder.product.parentCategory.name} | {selectedOrder.product.course.courseName} {selectedOrder.product.subject.subjectName} | {selectedOrder.product.university.universityName} |
                        {selectedOrder.product.semester.name}</p>
                      <h4>$ {selectedOrder.product.discountedPrice} <span className='rel'><s>$ {selectedOrder.product.price}</s></span> <span className='dis'>{selectedOrder.product.discountPresent} % OFF</span></h4>
                      <p>Qty : {selectedOrder.quantity} </p>
                    </div>
                  </div>
                  <div className='delivery'>
                    <h5>Delivery Address</h5><p className='deliveryinfo'> {selectedOrder.address.firstName} {selectedOrder.address.lastName} <br />
                      {selectedOrder.address.buildingnumber} , {selectedOrder.address.streetAddress} ,
                      {selectedOrder.address.landmark} {selectedOrder.address.city} , {selectedOrder.address.state} ,
                      {selectedOrder.address.country} , {selectedOrder.address.zipCode}
                      <br />Ph: {selectedOrder.address.mobile}</p>
                  </div>


                  <div className='payinfo'>
                    <h5>Payment Details</h5>
                    <p className='methodname'> Payment Method : <span className='sta'>{selectedOrder.paymentType.typeName}</span> </p>
                    {/* <p className='methodname'>Total amount : ${totalamt}</p> */}
                  </div>
                  <p className='status'>Order Status: <span className={selectedOrder.currentstatus[0].status === 'Order Cancelled' || selectedOrder.currentstatus[0].status=== 'Unable to fetch Status' ? 'sta red' : 'sta green'}>{selectedOrder.currentstatus[0].status}</span></p>
                </div>
              ))}
          </div>
        </div>
      )}


      {editMode && (
        <div className='custom-modal2'>
          <div className='modal-content2'>
            <span className='close-btn2' onClick={closePopup}>&times;</span>
            {/* Edit Form */}
            <h2>Change Status</h2>
            {statuschangemsg && <p className='updatestatussuccess'>Status Updated</p>}
            {errormsg && <p className='statuserror'>Internal Server Error</p>}
            <form>
              <label htmlFor='location'>Location:</label>
              <input type='text' id='location' name='location' onChange={(e) => { setPlace(e.target.value) }} />

              <label htmlFor='reachedDate'>Reached Date:</label>
              <input type='date' id='reachedDate' name='reachedDate' onChange={(e) => { setDate(e.target.value) }} />

              <label htmlFor='reachedTime'>Reached Time:</label>
              <input type='time' id='reachedTime' name='reachedTime' step='1' onChange={(e) => { setTimeReached(e.target.value) }} />


              <label htmlFor='status'>Status:</label>
              <select id='status' name='status' defaultValue="selectStatus" onChange={(e) => { setstatusId(e.target.value) }}>
                {statuesNames.length > 0 ? (
                  <option value="selectStatus" disabled>Select Status</option>
                ) : (
                  <option value="selectStatus" disabled style={{ color: 'red' }}>Unable To Fetch Status</option>
                )}
                {statuesNames.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>




              <div>
                <button variant='primary' onClick={handleUpdate}>Update</button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsTable;
