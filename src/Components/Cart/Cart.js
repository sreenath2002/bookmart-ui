import React, { useState } from 'react';
import './Cart.css'; // Import your CSS file for styling
import NavBar from '../NavBar/Navbar';
import { useEffect } from 'react';
import { userCartDetails,incrementQuantity,decrementQuantity } from '../../axios/service/userService.s';
import { useSelector } from 'react-redux';
import Checkout from '../CheckoutPage/Checkout';
import { useNavigate } from 'react-router-dom';

import { removeFromCart, } from '../../axios/service/userService.s';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [showRemovedMessage, setShowRemovedMessage] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const[refresh,setRefresh]=useState(false);
 
  // const [itemQuantity,setItemQuantity]=useState(1);
  const navigate =useNavigate()
  const [discount, setDiscount] = useState(0);
  const [gst, setGst] = useState(0);

  const id=localStorage.getItem("id")
  const jwtToken = localStorage.getItem("jwt");

  useEffect(() => {

    featchData()
    console.log("fdsj")
    async function featchData() {

      if(!jwtToken)
      {
        return(<div>Please Login</div>)
      }
      console.log("-------fist start-------")
      const cartDetails = await userCartDetails(jwtToken,id);
 
      console.log("--------------------------------------------------")
      console.log("-----------hai--------");
      console.log(cartDetails )

      if (cartDetails.statuscode === '200 OK' && cartDetails.message==='Cart is Retrieved') {
        console.log("jfsd")
        console.log(cartDetails.result)
        setCartItems(cartDetails.result)
       
      
        console.log("---cart------");
      }
     
    }

  }, [refresh]);

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.product.discountedPrice * item.quantity, 0);
  };
 


  const subtotal = calculateSubtotal();
  const total = subtotal - discount + gst;

  const handleIncreaseQuantity = async (id) => {
    console.log("--------------")
    try {

      console.log(id)
   
      const increment = await incrementQuantity(jwtToken, id)
      
      console.log(increment  )
     
  
      if (increment.statuscode === '200 OK') {
        const updatedCartItems = cartItems.map((item) =>
        item.shoppingCartId === id && item.quantity > 1 ? { ...item, quantity: item.quantity+1 } : item
      );
      setCartItems(updatedCartItems);
      console.log(cartItems);
       
      
      
      } else {
        console.log("Not incremenet")
       
      }
  
    }
  
    catch (err) {
      console.log("error", err)
     
    }
  };

  const handleDecreaseQuantity = async (id) => {
    try {

      console.log(selectedItemId)
      const decrement = await decrementQuantity(jwtToken, id)
      console.log(decrement )
     
  
      if (decrement.statuscode === '200 OK') {
        const updatedCartItems = cartItems.map((item) =>
        item.shoppingCartId === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartItems(updatedCartItems);
      console.log(cartItems);
       
      
      
      } else {
        console.log("Not decrement")
       
      }
  
    }
  
    catch (err) {
      console.log("error", err)
     
    }

 
  }

  const handleRemoveFromCart = (id) => {
  
    setSelectedItemId(id);
    setShowPopup(true);
  };
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);



  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedItemId(null);
  };

  const handleConfirmRemoveItem = async () => {
    try {

      console.log(selectedItemId)
      console.log("//////////")
      const remove = await removeFromCart(jwtToken, selectedItemId)
      console.log(remove )
     
  
      if (remove .statuscode === '200 OK') {
       
        console.log("Remove from Cart")
        setRefresh(!refresh)
        setShowRemovedMessage(true);
        setTimeout(() => {
          setShowRemovedMessage(false);
        },2000)
        setRefresh(!refresh)

        setShowPopup(false);
        setSelectedItemId(null);
      } else {
        console.log("Not removed from Cart Cart")
        setShowPopup(false);
        setSelectedItemId(null);
      }
  
    }
  
    catch (err) {
      console.log("error", err)
     
    }
    
  

    // Set a timeout to hide the message after a certain period
   
  };
  const handlesShopOnlythis=(cartid)=>{
    navigate(`/checkout/${cartid}`);
  }
  if(!jwtToken)
  {
    return(<div>
      Please Login
    </div>)
  }

  return (
    <div className="cart-container">
    { !jwtToken? (<><div>Please Login</div></>) :cartItems && cartItems.length > 0 ?(
      <>
      {/* Cart items */}
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.product.images[1].imageUrl} alt={`Product - ${item.product.title}`} />
            <div className="item-details">
              <p className='title'>{item.product.title}</p>
              <p className='productdetails'>{item.product.course.parentCategory.name} | {item.product.course.courseName} {item.product.subject.subjectName} | {item.product.semester.name} | {item.product.university.universityName}</p>
              <p>${item.product.discountedPrice} <s className='real-price'>${item.product.price}</s> <span className='discountperscent'>{item.product.discountPresent}% OFF</span></p>
              
              <div className="quantity-control">
                <button onClick={() => handleDecreaseQuantity(item.shoppingCartId)}><span className='btn1'>-</span></button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(item.shoppingCartId)}><span className='btn1'>+</span></button>
              </div>
              <div className='btns'>
              <button className='remove' onClick={() => handleRemoveFromCart(item.shoppingCartId)}>Remove</button>
              <button className='buy' onClick={()=>handlesShopOnlythis(item.shoppingCartId)}>Buy Only This</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showPopup && (
        <div className="popup">
          <span className="close-icon" onClick={handleClosePopup}>
            &#10006;
          </span>
          <p>Are you sure you want to remove this item from the cart?</p>
          <button onClick={handleConfirmRemoveItem}>Confirm</button>
        </div>
      )}
     <div className={`removed-message${showRemovedMessage ? '' : ' hidden'}`}>
      <p>Item removed from the cart</p>
    </div>

      {/* Cart summary */}
      <div className="cart-summary">
  <h2>Cart Summary</h2>
  <div className='summary-line'>
  <p >Discount: </p>
  <span> ${discount}</span>
  </div>
  <div className='summary-line'>
  <p >GST:</p><span> ${gst}</span>
  </div>
  <div className='summary-line'>
  <p >Subtotal: </p><span> ${subtotal}</span>
  </div>
  
  <p>____________________</p>
  <div className='summary-line'>
  <p >Total: </p><span>${total}</span>
  </div>
  
        <Link
    to={{
        pathname: '/checkout/all',
        state: { cartItems: cartItems }
    }}
>
    <button>Checkout</button>
</Link>
      </div>
      </>
      )  : (<><div className='emptycart'>Cart is Empty</div></>)}
    </div>
  );
};

export default Cart;
