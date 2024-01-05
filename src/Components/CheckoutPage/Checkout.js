import React, { useState } from 'react';
import './Checkout.css'; // Import your CSS file for styling
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import Razorpay from 'razorpay';
import { useEffect } from 'react';
import Loader from '../LoaderIcon/Loader';
import { useParams } from 'react-router-dom';
import { Checkmark } from 'react-checkmark'
import { getAllCountries ,getAllCities,getAllStates} from '../../axios/service/AddresDetails';
import { addNewOrder,sendorderplacedemail } from '../../axios/service/orderService';
import { addressValidation } from '../../validation/validation';
import { userCartDetails, allAddress, removeFromCart, addAddress,getAllPaymentMethods,payMentRequest,shopOrderRequest,getspecificCart,getcoupondiscount,getcouponslist,getvalidcouponslist} from '../../axios/service/userService.s';
const Checkout = () => {
  // const id = useSelector((state) => state.user.id)
  const {cartid}  = useParams();
  console.log({cartid})
  const jwtToken = localStorage.getItem("jwt");
  const id = localStorage.getItem("id");
  const mailId=localStorage.getItem("email");
  const name1=localStorage.getItem("firstName");
  const name2=localStorage.getItem("lastName");
  const ph=localStorage.getItem("phone");
  const location = useLocation();
  const navigate=useNavigate();
  const cartItems = location.state?.cartItems || null

 
  // Sample data for address details
  const [addressDetails, setAddressDetails] = useState([]);
  const[paymentTypes,setPaymentTypes]=useState([]);
  const[validacouponoptions,setvalidcouponoptions]=useState([]);
  const [products, setProducts] = useState([]);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [showPayemntSucces,setShowPaymentSuccesFullPopup]=useState(false);
  const[showPayemntFiled ,setshowPayemntFiled]=useState(false);
  const [loading,setLoading]=useState(false)
  const[showLoader,setShowLoader]=useState(false)
  const[orderPlaced,setOrderPlacedMessage]=useState(false);
  const[orderPlacedFiled,setorderPlacedFiled]=useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedAddresId, setSelectedAddresId] = useState(''); // Initialize with null or default ID
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [refresh, setRefresh] = useState(false)
  const [addresAddedSucces, setAddresAddedSucces] = useState();
  const [addresNotAddedMEssage, setAddresNotAddedMessage] = useState();
  const [errorMessage2, seterrorMessage2] = useState('')
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [secondName, setSecondName] = useState('');
  const [secondNameError2, setSecondNameError2] = useState('');

  const [buildingNumber, setBuildingNumber] = useState('');
  const [buildingNumberError, setBuildingNumberError] = useState('');

  const [streetAddress, setStreetAddress] = useState('');
  const [streetAddressError, setStreetAddressError] = useState('');

  const [landMark, setLandMark] = useState('');
  const [landMarkError, setLandMarkError] = useState('');

  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState('');

  const [state, setState] = useState('');
  const [stateError, setStateError] = useState('');

  const [country, setCountry] = useState('');
  const [countryError, setCountryError] = useState('');

  const [zipcode, setZipcode] = useState('');
  const [zipcodeError, setZipcodeError] = useState('');

  const [phonenumber, setPhoneNumber] = useState('');
  const [phonenumberError, setPhoneNumberError] = useState('');
  const[countries,setCountries]=useState([]);
  const[citiesOptions,setCitiesOptions]=useState([]);

  const[stateOptions,setStateOptions]=useState([]);

  const[emailError,setMessageSentEmailError]=useState(null);
  const[addresSelectError,setAddresSelectError]=useState(null);
  const[messageSentEmail,setMessageSentEmail]=useState(null);
  const [selectedCoupondiscount,setSelectedCoupondiscount]=useState();
  const[couponerror,setCouponError]=useState();

  useEffect(() => {

    featchData(jwtToken)
    console.log("fdsj==========")
    console.log(cartItems);
    async function featchData(token) {
     try{
      let  cartDetails;
      const cartIdValue = parseInt(cartid, 10)

      console.log("+_=_=_=_=_")

        if (cartIdValue) {
          console.log("+_=_=_=_=_+++++++++")
          console.log(cartIdValue)
          cartDetails = await getspecificCart(token,  cartIdValue);
         
        } else {
          console.log("{}{}{}{]{}{}{]")
          cartDetails = await userCartDetails(token, id);
          
        }
     
      


      const address = await allAddress(token, id);
      const paymentMethods= await getAllPaymentMethods(token);
      const validcoupons=await getvalidcouponslist(token);
    
      const countries=await getAllCountries();

      console.log(address)
      console.log("--------------------------------------------------")
      console.log("-----------hai--------");
      console.log(cartDetails.result)
      console.log(cartDetails.statuscode)
      console.log(cartDetails)
      console.log(cartDetails.result)

      if (cartDetails.statuscode === '200 OK') {
        console.log("jfsd")
      
        console.log(cartDetails.result)
        setProducts(cartDetails.result)


        console.log("---car-");
      }
      if (address.statuscode === '200 OK' &&  address.result.length > 0) {
        setAddressDetails(address.result);
        console.log(addressDetails)
      }
      if (validcoupons.statuscode === '200 OK' &&  validcoupons.result.length > 0) {
        setvalidcouponoptions(validcoupons.result);

      }
      if (paymentMethods.statuscode === '200 OK' && paymentMethods.result.length > 0) {
       setPaymentTypes(paymentMethods.result);
        console.log(paymentTypes);
      }
      if(countries.msg==="countries and cities retrieved")
        {
          setCountries(countries.data);
          console.log(countries.data)
        }
    }
    catch{
      console.log("error=================================================")
    }
  }
 

  }, [refresh]);

  const handleGetStates= async(selectedCountry) =>{
    setCountry(selectedCountry)
    console.log(selectedCountry)
   const countynameDetails = {
    country: selectedCountry
   }

    const sta = await getAllStates(countynameDetails)
    console.log("Hiiii")
    console.log(sta)
    if (sta.msg === `states in ${selectedCountry} retrieved`) {
       console.log("haiiiiiiiiiiiiiiiiiiiiiii") 
      console.log(sta.data)
      setStateOptions(sta.data.states);
    }


  } 
  const handleAllCities= async(selectedState) =>{
    setState(selectedState)
    console.log(selectedState)
   const countrystateDetails = {
    country: country,
    state:selectedState
   }

    const cit = await getAllCities(countrystateDetails)
    console.log("Hiiii")
    console.log(cit)
    if (cit.msg === `cities in state ${selectedState} of country ${country} retrieved`) {
       console.log("haiiiiiiiiiiiiiiiiiiiiiii") 
      console.log(cit.data)
      setCitiesOptions(cit.data);
    }


  }

  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const handleShowAddressPopup = () => {
    setShowAddressPopup(true);
    setName('');
    setSecondName('');
    setBuildingNumber('');
    setStreetAddress('')
    setLandMark('')
    setCountry('')
    setState('')
    setCity('')
    setZipcode('');
    setPhoneNumber('');
   
  };

  const handleCloseAddressPopup = () => {
    
    setShowAddressPopup(false);
  };
  
  

  // const handlePay = ()=>{
   
  //   {
  //     var options = {
  //       key: 'rrzp_test_yr1CZZY1d8rgVY',
  //       key_secret:"dwW4zFWOOECsvtIyxrZNLnAJ",
  //       amount: total,
  //       currency:"INR",
  //       name:"BookMart",
  //       description:"for testing purpose",
  //       handler: function(response){
  //         alert(response.razorpay_payment_id);
  //       },
  //       prefill: {
  //         name:"Velmurugan",
  //         email:"mvel1620r@gmail.com",
  //         contact:"7904425033"
  //       },
  //       notes:{
  //         address:"Razorpay Corporate office"
  //       },
  //       theme: {
  //         color:"#3399cc"
  //       }
  //     };
  //     var pay = new window.Razorpay(options);
  //     pay.open();
  //   }
  // }
  
   
 
  
 
  
  const handleAddressChange = (e) => {
    // Implement logic to update the address details
    // You can use e.target.name and e.target.value to get the updated values
    // Update the addressDetails state accordingly
  };

  const handleShowRemovePopup = (id) => {
    setSelectedProductId(id);
    setShowRemovePopup(true);

  };

  const handleCloseRemovePopup = () => {
    setShowRemovePopup(false);
  };
  const handleConfirmRemove = () => {
    const updatedProducts = products.filter((product) => product.shoppingCartId !== selectedProductId);
    setProducts(updatedProducts);
    setShowRemovePopup(false);
    // Show a confirmation message after removing the product if needed
  };


  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showCouponPopup, setShowCouponPopup] = useState(false);
  const handleShowPaymentPopup = () => {
    if(validateForm()){
      setShowPaymentPopup(true);
    }
    
  };

  const handleClosePaymentPopup = () => {
    setShowPaymentPopup(false);
  };
  // Sample data for payment options
  const [paymentOptions] = useState(['Cash on Delivery', 'GPay', 'Credit Card', 'PayPal']);

  // Calculate subtotal, total quantity, and total price

  const subtotal = Array.isArray(products) && products.length > 0
    ? products.reduce((acc, product) => acc + product.product.discountedPrice * product.quantity, 0)
    : 0;

  const totalQuantity = Array.isArray(products) && products.length > 0
    ?products.length 
    : 0;

    const totaldiscountedprice=selectedCoupondiscount ? (selectedCoupondiscount)/100  :0 ;

  const total = totaldiscountedprice==0? subtotal : subtotal-(subtotal*totaldiscountedprice);



  const handleRemoveItem = (id) => {
    const updatedProducts = products.filter((product) => product.shoppingCartId !== id);
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
  const handlePay = async () => {
    try {
      // Replace 'total' with your actual value for the amount calculation
      // Replace this with your total amount logic
  
      const options = {
        key: "rzp_test_q5IKCKLn5zzuYl",
        key_secret: "MZ9c4j6NuME7Ti7v1xTWO6i1",
        amount: total * 100, // Multiplying by 100 to convert to the smallest currency unit (e.g., paisa for INR)
        currency: "INR",
        name: "BookMart",
        description: "for testing purpose",
        handler: function (response) {
          setShowPaymentPopup(false)
          console.log(response);
          alert(response.razorpay_payment_id);
          setTimeout(()=>{
            setLoading(false)
          
            setLoading("Loading.......")
 
 
            setTimeout(() => {
            
               setLoading(false)
             
             
               handleShopOrder(payamt.result);
            
         
           }, 3000);
       },3000)
        },
        prefill: {
          name: name1,
          email: mailId,
          contact: ph,
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      // Initialize Razorpay
      const pay = new window.Razorpay(options);
      pay.open();
  
      const payMentDetails = {
        paymentId: selectedPaymentId, // Replace this with your payment ID logic
        amount: total, // Replace this with the actual amount logic
      };
  
      // Replace payMentRequest with your actual function for payment request
      const payamt = await payMentRequest(jwtToken, id, payMentDetails);
  
      if (payamt.statuscode != '200 OK') {
        pay.close();
        setShowPaymentPopup(false)
        setshowPayemntFiled("Internal Server Error");
        setTimeout(() => {
          setshowPayemntFiled(false);
        }, 2000);
      }
    } catch (error) {
     
        setShowPaymentPopup(false)
        setshowPayemntFiled("Internal Server Error");
        setTimeout(() => {
          setshowPayemntFiled(false);
        }, 2000);
    }
  };
  const handleOrderLine =async (orderId)=>{
    try{
      const half = selectedCoupondiscount ? selectedCoupondiscount / 2 : 0;
       
      console.log("helooooooo")
      const productIdList = products.map(book => book.product.id);
      const qty = products.map(book => book.quantity);
      const price = products.map(book =>{
        const discountedPrice = book.product.discountedPrice;
        const discountedAmount = (discountedPrice * half) / 100;
        return (discountedPrice - discountedAmount)*qty;
      });
      const orderDetails = {
        productIdList: productIdList,
        orderId: orderId,
        qty: qty,
        price: price,
        userId:id
      };
      const orderPlacedDetails={
        productIdList: productIdList,
        qty: qty,
        price: price,
        enteredemail:messageSentEmail

      }
      console.log(orderDetails)
      const orderLine=await addNewOrder(jwtToken,orderDetails)
      {
        console.log("helooooooo2323232342423")
        if(orderLine.statuscode === '200 OK')
        {
          console.log("helooooooo11111")
          setLoading(false)
          setOrderPlacedMessage("Your Order Placed")
          const emailsent=await sendorderplacedemail(jwtToken,orderPlacedDetails)
           console.log(emailsent)
          setTimeout(() => {
            setOrderPlacedMessage(false);
         setShowLoader(true);
      
         
         setTimeout(() => {
         
       
    
       
     setShowLoader(false)
      navigate('/');
        }, 4000)
          }, 3000)

        }
        else{
          console.log("heloooooooDDDDDDDDDD@")
          setLoading(false)
          setorderPlacedFiled("Internal Server Error")
          setTimeout(() => {
            setorderPlacedFiled(false);
          }, 2000)
  
        }
      }
    }
    catch (err) {
 
      setLoading(false)
      setorderPlacedFiled("Internal Server Error")
      setTimeout(() => {
        setorderPlacedFiled(false);
      }, 2000)
  
  
    }
    

  }
  const handleShopOrder=async (payId)=>{

    try{
      const shopOrderDetails={
        paymentInfoId:payId,
        addresId:selectedAddresId
      }
      console.log(shopOrderDetails);
      const  shop = await shopOrderRequest(jwtToken,id,shopOrderDetails)
      if(shop.statuscode === '200 OK'){
        handleOrderLine(shop.result);
       

      }
      else{
        setLoading(false)
        setorderPlacedFiled("Internal Server Error")
        setTimeout(() => {
          setorderPlacedFiled(false);
          
        }, 2000)

      }
  }

  catch (err) {
    setLoading(false)
    setorderPlacedFiled("Internal Server Error")
    setTimeout(() => {
      setorderPlacedFiled(false);
    }, 2000)


  }
}

  const handleRemoveFromCart = (id) => {

    setSelectedProductId(id);
    setShowRemovePopup(true);
  };
const handlePaymentRequest = async ()=>{
  
  
  if(selectedPaymentId===1)
  {
  
  try{
    setShowPaymentPopup(false);
    setLoading("Proccessing......");

    const payMentDetails={
      paymentId:selectedPaymentId,
      amount:total
    }
    const pay = await payMentRequest(jwtToken,id, payMentDetails)
    if (pay.statuscode === '200 OK') {
      
     
      setTimeout(()=>{
           setLoading(false)
           setShowPaymentSuccesFullPopup(true);
           setLoading("Loading.......")


           setTimeout(() => {
            setShowPaymentSuccesFullPopup(false);
              setLoading(false)
            
            
              handleShopOrder(pay.result);
           
        
          }, 3000);
      },3000)
     



    }
    else{
      setshowPayemntFiled("Internal Server Error");
      setTimeout(() => {
        setshowPayemntFiled(false);
      }, 2000)
    }

  }
  catch (err) {
    setshowPayemntFiled("Internal Server Error");
    setTimeout(() => {
      setshowPayemntFiled(false);
    }, 2000)
  }
  }
else{
  handlePay();

}

} 
  const handleConfirmRemoveItem = async () => {
    try {

      console.log(selectedProductId)
      const remove = await removeFromCart(jwtToken, selectedProductId)
      console.log(remove)


      if (remove.statuscode === '200 OK') {

        console.log("Remove from Cart")

        setShowRemovePopup(false)
        setSelectedProductId(null);
        setRefresh(!refresh)
      } else {
        console.log("Not removed from Cart Cart")
        setShowRemovePopup(false)
        setSelectedProductId(null);
      }

    }

    catch (err) {
      console.log("error", err)

    }



    // Set a timeout to hide the message after a certain period

  };
  const handleAddresFormValidation = async (event) => {

    event.preventDefault();

    try {
      await addressValidation.validate(
        {
          name,

          secondName,
          buildingNumber,
          streetAddress,
          landMark,
          country,
          city,
          state,
          zipcode,
          phonenumber


        },

        { abortEarly: false }
      );




      event.preventDefault();
      try {
        const addresDetails = {


          firstName: name,
          lastName: secondName,
          buildingNumber: buildingNumber,
          streetAddress: streetAddress,
          landmark: landMark,
          city: city,
          state: state,
          country: country,
          zipCode: zipcode,
          mobile: phonenumber,
          userId: id

        }
        console.log("updateduserDetails--", addresDetails)
        const updateDetails = await addAddress(jwtToken, addresDetails)
        console.log("rtghjkl")
        console.log("details---", updateDetails)

        if (updateDetails.statuscode === '200 OK') {

          setAddresAddedSucces(true)
          setTimeout(() => {
            setAddresAddedSucces(false);
          }, 2000)
          setRefresh(!refresh);


        }

        else {
          setAddresNotAddedMessage(true);
          setTimeout(() => {
            setAddresNotAddedMessage(false);
          }, 3000)
        }


      } catch (err) {
        seterrorMessage2(true);
        setTimeout(() => {
          seterrorMessage2(false);
        }, 3000)

      }

    } catch (error) {
      const errors = {};
      error.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      console.log('Validation Errors:', errors);
      console.log("dfghjklxcvbnmxcvbnxcvb")
      setNameError(errors.name || '');
      console.log(nameError)
      setSecondNameError2(errors.secondName || '');
      setBuildingNumberError(errors.buildingNumber || '');
      setStreetAddressError(errors.streetAddress || '');
      setLandMarkError(errors.landMark || '')
      console.log(landMarkError)
      setCityError(errors.city || '')
      setCountryError(errors.country || '')
      setStateError(errors.state || '')
      setLandMarkError(errors.landMark || '')
      setZipcodeError(errors.zipcode || '')
      setLandMarkError(errors.landMark || '')
      setPhoneNumberError(errors.phonenumber || '')
      console.log(phonenumberError)




      console.log('Validation Errors:', errors);
    }

  }

  const validateForm = () => {
    let isValid = true;

  // Email validation using regex
  const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;

  if (!messageSentEmail || messageSentEmail.trim() === '') {
    setMessageSentEmailError("Please provide email");
    isValid = false;
  } else if (!emailRegex.test(messageSentEmail)) {
    setMessageSentEmailError("Invalid email address");
    isValid = false;
  } else {
    setMessageSentEmailError("");
  }
    

    // Password length validation
     if(selectedAddresId==='')
    {
      setAddresSelectError("Please Select Address")
      isValid=false;
    }
   
    
    else 
    {
      setAddresSelectError("");
    }
    

    return isValid;
  };


  const handleCloseCouponPopup=()=>{
    setShowCouponPopup(false);
    setSelectedCoupondiscount(0);
  }
  const handleOpenCouponPopup=()=>{
    setShowCouponPopup(true);
  }

  
 const handleUseCouponPopup=(id)=>{
  if(id ===null)
  {
    setCountryError(true);
  }
  else{
    setCountryError(false);
    setShowCouponPopup(false);

  }
 }

  return (


    <div className='checkout-container' >
      {products && products.length > 0 ? (
        <>
          {/* Address details section */}
          <div className='all-details'>
            <div className="address-details">
              <h2>Delivery Address</h2>
              {addresSelectError && <span className='confirmOrder'>{addresSelectError}</span>}
              {addressDetails && addressDetails.length > 0 && (
                <>
                  {addressDetails.map((address) => (
                    <label key={address.id}>
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        onChange={() => setSelectedAddresId(address.id)}
                      />

                      <span> {address.buildingnumber},
                        {address.streetAddress},
                        {address.landmark}, {address.city}, {address.state},
                        {address.country}, {address.zipCode}</span>
                    </label>
                  ))}
                </>
              )}

              <button onClick={handleShowAddressPopup}>ADD</button>
            </div>

            {showAddressPopup && <div className="overlay" />}
            {showAddressPopup && (
              <div className="address-change-popup">
                {errorMessage2 && <span className="registration-error">Ineternal Server Error</span>}
                {addresAddedSucces && <span className="succes">Address Added Succesfully</span>}
                {addresNotAddedMEssage && <span className="registration-error">Not added</span>}
                <h2>Add Address</h2>
                {/* Input fields for changing address */}
                <div>
                  <input type="text" placeholder="Firstname" name="Firstname" onChange={(e) => { setName(e.target.value) }} />
                  {/* {nameError && <div className="error1">{nameError}</div>} */}
                  <input type="text" placeholder="lastName" name="lastName" onChange={(e) => { setSecondName(e.target.value) }} />
                  <div className='errorsname'>
                    {nameError && <div className="error1">{nameError}</div>}
                    {secondNameError2 && <div className="error1">{secondNameError2}</div>}
                  </div>
                  <input type="text" placeholder="Building Number" name="Building Number" onChange={(e) => { setBuildingNumber(e.target.value) }} />
                  {/* {buildingNumberError && <div className="error1">{buildingNumberError}</div>} */}
                  <input type="text" placeholder="StreetAddres" name="StreetAddres" onChange={(e) => { setStreetAddress(e.target.value) }} />
                  <div className='errorsname'>
                    {buildingNumberError && <div className="error1">{buildingNumberError}</div>}
                    {streetAddressError && <div className="error1">{streetAddressError}</div>}
                  </div>
                </div>
                <input type="text" placeholder="landmark" name="landmark" onChange={(e) => { setLandMark(e.target.value) }} />
                {/* {landMarkError && <div className="error1">{landMarkError}</div>} */}
                <select id="country" name="country" value={country} onChange={(e) => { handleGetStates(e.target.value) }} required>
            <option value="">Select Country</option>
            {countries.map(name => (
              <option key={name.country} value={name.country}>
                {name.country}
              </option>
            ))}
          </select>
                <div className='errorsname'>
                  {landMarkError && <div className="error1">{landMarkError}</div>}
                  {countryError && <div className="error1">{countryError}</div>}
                </div>
                <select id="state" name="state" value={state} onChange={(e) => { handleAllCities(e.target.value) }} required>
            <option value="">Select State</option>
            {stateOptions.map(state=> (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
                {/* {cityError && <div className="error1">{cityError}</div>} */}
                <select id="city" name="city" value={city} onChange={(e) => { setCity(e.target.value) }} required>
            <option value="">Select City</option>
            {citiesOptions.map(city=> (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
                <div className='errorsname'>
                  {cityError && <div className="error1">{cityError}</div>}
                  {stateError && <div className="error1">{stateError}</div>}
                </div>
                <input type="text" placeholder="Pincode" name="Pincode" onChange={(e) => { setZipcode(e.target.value) }} />
                {/* {zipcodeError && <div className="error1">{zipcodeError}</div>} */}
                <input type="text" placeholder="mobile" name="mobile" onChange={(e) => { setPhoneNumber(e.target.value) }} />
                <div className='errorsname'>
                  {zipcodeError && <div className="error1">{zipcodeError}</div>}
                  {phonenumberError && <div className="error1">{phonenumberError}</div>}
                </div>
                <button onClick={handleCloseAddressPopup}>Close</button>
                 <button onClick={handleAddresFormValidation}>ADD</button>
                </div>
                /* Add more fields as needed for address details */
                // <button onClick={handleCloseAddressPopup}>Close</button>
                // <button onClick={handleAddresFormValidation}>ADD</button>
                /* Implement logic to update the address */
                /* Add a button to confirm the address change */
             
            )}

            {/* Products details section */}
            <div className="products-detailscheckout">
              <h2>Products</h2>
              {products.map((book) => (
                <div className="product-itemcheckout" key={book.product.id}>
                  <div>
                  <img src={book.product.images[1].imageUrl} alt={book.product.title} />
                  </div>
                   <div className='infor'>
                    <p className='title'>{book.product.title}</p>
                    <p className='info'>{book.product.course.parentCategory.name} | {book.product.course.courseName} {book.product.subject.subjectName} | {book.product.semester.name} | {book.product.university.universityName}</p>
                    <p> ${book.product.discountedPrice} <span><s className='rel-price'>${book.product.price}</s></span> <span className='dis'>{book.product.discountPresent}% OFF</span></p>
                    {/* <div className="quantity-control">
                <button onClick={() => handleDecreaseQuantity(book.shoppingCartId)}>-</button>
                <span>{book.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(book.product.id)}>+</button>
              </div> */}
                    <button className='rem' onClick={() => handleRemoveFromCart(book.shoppingCartId)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            {showRemovePopup && <div className="overlay" />}
            {showRemovePopup && (
              <div className='confirmation-popup'>
                <h2>Are you sure you want to remove?</h2>
                <div className='confirmation-buttons'>
                  <button onClick={handleConfirmRemoveItem}>Yes</button>
                  <button onClick={handleCloseRemovePopup}>No</button>
                </div>
              </div>
            )}
            {showPayemntFiled && <div className="overlay" />}
           { showPayemntFiled  && (
              <div className='paymentSucces'><h4 className='msg'>{showPayemntFiled }</h4></div>
           )}
            {loading && <div className="overlay" />}
            { loading  && (
              <div className='loading'><h4 className='loadingmsg'>{loading}</h4></div>
           )}
            {showLoader && <div className="overlay" />}
            { showLoader  && (
             <div
             className='Loadericon'
         >
             <Loader />
         </div>
           )}
           {orderPlaced && <div className="overlay" />}
            { orderPlaced  && (
              
              <div className=' orderPlaced '><h5 className='msg4'>Thanks for Shopping..</h5><h6 className='msg1'>Your Order Placed </h6> <Checkmark size='25px' color='green' /></div>
           )}
           {orderPlacedFiled && <div className="overlay" />}
           { orderPlacedFiled  && (
              <div className='orderPlacedfiled'><h4 className='msg3'>{orderPlacedFiled}</h4></div>
           )}
            <p className='orderCirformationmail'>Provide the Email id for send the Order Confirmation Mail</p>
            <div className='email-enter'>
              
              <div>
                <input type='text' placeholder='Email Id' onChange={(e) => { setMessageSentEmail(e.target.value) }}></input> </div><div><button onClick={handleShowPaymentPopup}>Continue</button></div>
                
            </div>
            {emailError && <span className='confirmOrder'>{emailError}</span>}

            {/* Payment options section */}

          </div>
          {showPaymentPopup && <div className="overlay" />}
          {showPaymentPopup && (
            <div className="payment-popup">
              <h2>Select Payment Method</h2>
              {paymentTypes && paymentTypes.length > 0 && (
                <>
                  {paymentTypes.map((payment) => (
                    <label key={payment.id}>
                      <input
                        type="radio"
                        name="payment"
                        value={payment.id}
                        onChange={() =>setSelectedPaymentId(payment.id)}
                      />

                      <span> {payment.typeName}
                        </span>
                    </label>
                  ))}
                </>
              )}

              <div className="popup-buttons">
                <button onClick={handleClosePaymentPopup}>Close</button>
                <button onClick={handlePaymentRequest}>Continue</button>
              </div>
            </div>
          )}
           {showCouponPopup && <div className="overlay" />}
          {showCouponPopup && (
            <div className="payment-popup">set
              
              {validacouponoptions && validacouponoptions.length > 0 ? (

                <>
                <h2>Select Coupon</h2>
                {couponerror &&<p>Select one Coupon</p>}
                  {validacouponoptions.map((validcoupon) => (
                    <label key={validcoupon.id}>
                      <input
                        type="radio"
                      
                        value={validcoupon.discount}
                        onChange={() =>setSelectedCoupondiscount(validcoupon.discount)}
                      />

                      <span> code:{validcoupon.code}                   discount:{validcoupon.discount}%
                        </span>
                    </label>
                  ))}
                </>
              ) : (<div>No validcoupons</div>)}

              <div className="popup-buttons">
                <button onClick={handleCloseCouponPopup}>Cancel</button>
                {selectedCoupondiscount &&<button onClick={handleUseCouponPopup}>Use</button>}
              </div>
            </div>
          )}
           {showPayemntSucces && <div className="overlay" />}
           {showPayemntSucces &&<div className="removed-message">
      <p>Payment Succes</p>
    </div>}

          {/* Price details section */}
          <div className="price-details">
            <h2>Price Details</h2>
            <div className='priceDetailsBox'>
            <p>Number of Products</p>
            <span>{totalQuantity}</span>
            </div>
            <div className='priceDetailsBox'>
            <p>Discount</p>
            <span>{totaldiscountedprice*100}%</span>
            </div>
            <div className='priceDetailsBox'>
            <p>Subtotal</p>
            <span>${subtotal}</span>
            </div>
            <p>___________________________</p>
            <div className='priceDetailsBox'>
            <p>Total</p>
            <span>${total}</span>
            
            </div>
            <p className="usecouponbutton" onClick={handleOpenCouponPopup}>Add coupon</p>
            
          </div>
        </>) : (<><div>CheckOut Is Empty</div></>)
      }
    </div>
  );
};

export default Checkout;
