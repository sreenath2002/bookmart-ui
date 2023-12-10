import React, { useState } from 'react';
import './Checkout.css'; // Import your CSS file for styling

const Checkout = () => {
  // Sample data for address details
  const [addressDetails, setAddressDetails] = useState({
    fullName: 'John Doe',
    addressLine: '123 Main Street',
    city: 'City',
    state: 'State',
    postalCode: '12345',
    country: 'Country',
  });
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const handleShowAddressPopup = () => {
    setShowAddressPopup(true);
  };

  const handleCloseAddressPopup = () => {
    setShowAddressPopup(false);
  };

  const handleAddressChange = (e) => {
    // Implement logic to update the address details
    // You can use e.target.name and e.target.value to get the updated values
    // Update the addressDetails state accordingly
  };
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      realPrice: 25.99,
      price: 20.99,
      discountPercentage: 20,
      quantity: 1,
      imageUrl: 'https://via.placeholder.com/150',
    },
    // Add more products as needed
  ]);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const handleShowRemovePopup = (id) => {
    setSelectedProductId(id);
    setShowRemovePopup(true);
  };

  const handleCloseRemovePopup = () => {
    setShowRemovePopup(false);
  };
  const handleConfirmRemove = () => {
    const updatedProducts = products.filter((product) => product.id !== selectedProductId);
    setProducts(updatedProducts);
    setShowRemovePopup(false);
    // Show a confirmation message after removing the product if needed
  };


  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const handleShowPaymentPopup = () => {
    setShowPaymentPopup(true);
  };

  const handleClosePaymentPopup = () => {
    setShowPaymentPopup(false);
  };
  // Sample data for payment options
  const [paymentOptions] = useState(['Cash on Delivery', 'GPay', 'Credit Card', 'PayPal']);

  // Calculate subtotal, total quantity, and total price
  const subtotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);
  const total = subtotal;

  const handleRemoveItem = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleIncreaseQuantity = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    );
    setProducts(updatedProducts);
  };

  const handleDecreaseQuantity = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
    );
    setProducts(updatedProducts);
  };


  return (
    <div className='checkout-container' >
      {/* Address details section */}
      <div className='all-details'>
      <div className="address-details">
        <h2>Delivery Address</h2>
        <p>{addressDetails.fullName}{addressDetails.addressLine}{addressDetails.city}, {addressDetails.state} {addressDetails.country} {addressDetails.postalCode}</p>
              
      
        <button onClick={handleShowAddressPopup}>Change</button>
      </div>
      {showAddressPopup && <div className="overlay" />}
      {showAddressPopup && (
        <div className="address-change-popup">
          <h2>Change Address</h2>
          {/* Input fields for changing address */}
          <input type="text" placeholder="Full Name" name="fullName" onChange={handleAddressChange} />
          <input type="text" placeholder="Address Line" name="addressLine" onChange={handleAddressChange} />
          <input type="text" placeholder="City" name="city" onChange={handleAddressChange} />
          <input type="text" placeholder="State" name="state" onChange={handleAddressChange} />
          <input type="text" placeholder="Postal Code" name="postalCode" onChange={handleAddressChange} />
          <input type="text" placeholder="Country" name="country" onChange={handleAddressChange} />
          {/* Add more fields as needed for address details */}
          <button onClick={handleCloseAddressPopup}>Close</button>
          {/* Implement logic to update the address */}
          {/* Add a button to confirm the address change */}
        </div>
      )}

      {/* Products details section */}
      <div className="products-details">
        <h2>Products</h2>
        {products.map((product) => (
          <div className="product-item" key={product.id}>
            <img src={product.imageUrl} alt={product.name} />
            <div>
              <p>{product.name}</p>
             <p> ${product.realPrice}
             ${product.price}
              {product.discountPercentage}% off</p>
              <div className="quantity-control">
                <button onClick={() => handleDecreaseQuantity(product.id)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(product.id)}>+</button>
              </div>
              <button onClick={() => handleShowRemovePopup(product.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      {showRemovePopup && <div className="overlay" />}
      {showRemovePopup && (
        <div className='confirmation-popup'>
          <h2>Are you sure you want to remove?</h2>
          <div className='confirmation-buttons'>
            <button onClick={handleConfirmRemove}>Yes</button>
            <button onClick={handleCloseRemovePopup}>No</button>
          </div>
        </div>
      )}
      <div className='email-enter'>
        <div>
        <input type='text' placeholder='Please Type Your Email Id'></input> </div><div><button onClick={handleShowPaymentPopup}>Continue</button></div>
      </div>

      {/* Payment options section */}
      
      </div>
      {showPaymentPopup && <div className="overlay" />}
      {showPaymentPopup && (
  <div className="payment-popup">
    <h2>Select Payment Method</h2>
    
    <div className="payment-options-text">
      <label htmlFor="cash">
        <input type="radio" id="cash" name="payment-method" value="cash" />
        Cash On Delivery
      </label>
      
      <label htmlFor="gpay">
        <input type="radio" id="gpay" name="payment-method" value="gpay" />
        GPay
      </label>
      
      <label htmlFor="paypal">
        <input type="radio" id="paypal" name="payment-method" value="paypal" />
            PayPal
      </label>
    </div>
    
    <div className="popup-buttons">
      <button onClick={handleClosePaymentPopup}>Close</button>
      <button>Place Order</button>
    </div>
  </div>
)}

      {/* Price details section */}
      <div className="price-details">
        <h2>Price Details</h2>
        <p>Number of Products: {totalQuantity}</p>
        <p>Subtotal: ${subtotal}</p>
        <p>Total: ${total}</p>
      </div>
    </div>
  );
};

export default Checkout;
