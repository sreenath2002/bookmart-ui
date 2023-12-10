import React, { useState } from 'react';
import './Cart.css'; // Import your CSS file for styling
import NavBar from '../NavBar/Navbar';

const Cart = () => {
  const [showRemovedMessage, setShowRemovedMessage] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      productName: 'Product 1',
      price: 20.99,
      quantity: 1,
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    {
      id: 2,
      productName: 'Product 2',
      price: 15.49,
      quantity: 2,
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    {
      id: 5,
      productName: 'Product 2',
      price: 15.49,
      quantity: 2,
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    {
      id: 6,
      productName: 'Product 2',
      price: 15.49,
      quantity: 2,
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    
    // Add more items to the cart as needed
  ]);

  const [discount, setDiscount] = useState(0);
  const [gst, setGst] = useState(0);

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const total = subtotal - discount + gst;

  const handleIncreaseQuantity = (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
  };

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

  const handleConfirmRemoveItem = () => {
    const updatedCartItems = cartItems.filter((item) => item.id !== selectedItemId);
    setCartItems(updatedCartItems);
    setShowRemovedMessage(true);

    // Set a timeout to hide the message after a certain period
    setTimeout(() => {
      setShowRemovedMessage(false);
    },2000)
    setShowPopup(false);
    setSelectedItemId(null);
  };

  return (
    <div className="cart-container">
     
      {/* Cart items */}
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.imageUrl} alt={`Product - ${item.productName}`} />
            <div className="item-details">
              <p>{item.productName}</p>
              <p>${item.price}</p>
              <div className="quantity-control">
                <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
              </div>
              <div className='btns'>
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
              <button>Buy Only This</button>
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
        <p>Discount: ${discount}</p>
        <p>GST: ${gst}</p>
        <p>Subtotal: ${subtotal}</p>
        <p>Total: ${total}</p>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
