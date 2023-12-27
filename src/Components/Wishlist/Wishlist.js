import React, { useState } from 'react';
import './Wishlist.css'; // Import your CSS file for styling
import NavBar from '../NavBar/Navbar';
import { useEffect } from 'react';
import { userWishlistDetails,removeFromWishlist ,addToCart} from '../../axios/service/userService.s';


import { useNavigate } from 'react-router-dom';



const Wishlist = () => {
  const [showRemovedMessage, setShowRemovedMessage] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const[serverError,setServerError]=useState();
  const[refresh,setRefresh]=useState(false);

//   const navigate =useNavigate()

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
      const wishlistDetails = await userWishlistDetails(jwtToken,id);
     
      console.log("--------------------------------------------------")
      console.log("-----------hai--------");
      console.log(wishlistDetails )

      if ( wishlistDetails.statuscode === '200 OK' &&  wishlistDetails.message==='Wishlist is Retrieved') {
        console.log("jfsd")
        console.log(wishlistDetails.result)
        setWishlistItems(wishlistDetails.result)
       
      
        console.log("---cart------");
      }
     
    }

  }, [refresh]);

 
 


 

 

  

  const handleRemoveFromWishlist = (id) => {
  
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
      const remove = await removeFromWishlist(jwtToken, selectedItemId)
      console.log(remove )
     
  
      if (remove.statuscode === '200 OK') {
       
        console.log("Remove from wishlist")
        setRefresh(!refresh)
        setShowRemovedMessage(true);
        setTimeout(() => {
          setShowRemovedMessage(false);
        },2000)
        setRefresh(!refresh)

        setShowPopup(false);
        setSelectedItemId(null);
      } else {
        console.log("Not removed from wishlist")
        setShowPopup(false);
        setSelectedItemId(null);
      }
  
    }
  
    catch (err) {
      console.log("error", err)
     
    }
    
  

    // Set a timeout to hide the message after a certain period
   
  };
  const handleAddToCart=async (bookId)=>{
    try {
  
      const productInfo = {
  
        userId: id,
        productId : bookId,
        quantity: 1,
      
      }
      console.log("productDetails===", productInfo)
      const addtocart = await addToCart(jwtToken, productInfo)
      console.log("lsdhgck")
      console.log("addDetails", addtocart)
  
      if (addtocart.statuscode === '200 OK') {
       
        console.log("Added to cart")
      } else {
        setServerError("Internal Server Error")
        setTimeout(()=>{
            setServerError(false)
        },2000)
        console.log("Not Added Cart")
      }
  
    }
  
    catch (err) {
        setServerError("Internal Server Error")
        setTimeout(()=>{
            setServerError(false)
        },2000)
     
    }
  
   }
 
  return (
    <div className="wishlist-container">
        <NavBar/>
    {!jwtToken ? (<div>Please Login</div>) :wishlistItems && wishlistItems.length > 0 ?(
      <>
      {/* Cart items */}
      <div className="wishlist-items">
        {wishlistItems.map((item) => (
          <div className="wishlist-item" key={item.id}>
            <img src={item.product.images[1].imageUrl} alt={`Product - ${item.product.title}`} />
            <div className="wishlist-details">
              <p className='title'>{item.product.title}</p>
              <p className='wishlistproductdetails'>{item.product.course.parentCategory.name} | {item.product.course.courseName} {item.product.subject.subjectName} | {item.product.semester.name} | {item.product.university.universityName}</p>
              <p>${item.product.discountedPrice} <s className='wishlistreal-price'>${item.product.price}</s> <span className='wishlistdiscountperscent'>{item.product.discountPresent}% OFF</span></p>
             
              <div className='wishlistbtns'>
              <button className='wishlistremove' onClick={() => handleRemoveFromWishlist(item.wishlistId)}>Remove</button>
              <button className='wishlistbuy' onClick={()=>handleAddToCart(item.product.id)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showPopup && (
        <div className="wishlistpopup">
          <span className="wishlistclose-icon" onClick={handleClosePopup}>
            &#10006;
          </span>
          <p>Are you sure you want to remove this item from the Wishlist?</p>
          <button onClick={handleConfirmRemoveItem}>Confirm</button>
        </div>
      )}
       {serverError && <div className="overlay" />}
           { serverError  && (
              <div className='serverError'><h4 className='serverError'>{serverError}</h4></div>
           )}
     <div className={`wishlistremoved-message${showRemovedMessage ? '' : ' hidden'}`}>
      <p>Item removed from the Wishlist</p>
    </div>

     
      </>
      ) : (<><div>Wishlist is Empty</div></>)}
    </div>
  );
};

export default Wishlist;
