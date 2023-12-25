import React, { useState } from 'react';
import NavBar from '../NavBar/Navbar';
import './UserProfile.css';
import { useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import { updateUser } from '../../axios/service/adminServices';
import { editProfile, passwordUpdate,addAddress,allAddress,addProfileImage } from '../../axios/service/userService.s';
import { getAllCountries ,getAllCities,getAllStates} from '../../axios/service/AddresDetails';
import { updateUserValidation, changePasswordValidation, addressValidation } from '../../validation/validation';
import { userInfo } from '../../axios/service/userService.s';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
const UserProfile = () => {

  const id = useSelector((state) => state.user.id)

  const jwtToken = localStorage.getItem("jwt");
  const [userImage, setUserImage] = useState(null);
  const [showProducts, setShowProducts] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showRevenue, setShowRevenue] = useState(false); // New state
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setPhone] = useState();
  const [data, setUserData] = useState([])
  const [editMode, setEditMode] = useState(false);
  const [passwordEditmode, setPasswordEditMode] = useState(false)
  const [errorMessage, seterrorMessage] = useState('')
  const [errorMessage2, seterrorMessage2] = useState('')
  const [addresses, setAddresses] = useState([]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  

  const [emailValidationError, setEmailError] = useState(false)
  const [mobilenumberError, setMobileNumberError] = useState(false);
  const [errorMessagePassword, seterrorMessagePassword] = useState('')
  const [passwordChangesMEssage, setPasswordChangedMessage] = useState();
  const [firstNameError, setFirstNameError] = useState(false);
  const [secondNameError, setsecondNameError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [retyped, setRetyped] = useState();
  const [oldPasswordError, setOldPasswordError] = useState();
  const [newPasswordError, setNewPassWorError] = useState();
  const [retypedPasswordError, setRetypedPasswordError] = useState();
  const[addresAddedSucces,setAddresAddedSucces]=useState();
  const[upadateSucces,setUpdateSucces]=useState();
  const[addresNotAddedMEssage,setAddresNotAddedMessage]=useState();
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

  const [newAddress, setNewAddress] = useState([]);
  const[countries,setCountries]=useState([]);
  const[citiesOptions,setCitiesOptions]=useState([]);

  const[stateOptions,setStateOptions]=useState([]);
 const navigate = useNavigate();
 const[profileimg,setProfileImg]=useState();
  useEffect(() => {
    fetchData(jwtToken);

    async function fetchData(token) {
      try {
        const usersData = await userInfo(token, id); // Ensure 'id' is defined or passed correctly
        const  addressData= await allAddress(token,id)
        const countries=await getAllCountries();

        if (usersData.statuscode === '200 OK') {
          const userData = usersData.result;

          // Update state after receiving user data
          setUserData(userData);
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setEmail(userData.email);
          setPhone(userData.phoneNumber);
          setProfileImg(userData.profileImage);
          console.log("User data:", userData);
        } else {
          console.log("Failed to fetch user data");
        }
        if(addressData.statuscode==='200 OK' && addressData.result !=[] )
        {
          setNewAddress(addressData.result);
        }
        else {
          console.log("Failed to fetch address data");
        }
        if(countries.msg==="countries and cities retrieved")
        {
          setCountries(countries.data);
          console.log(countries.data)
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }, [!refresh]);

  // const handleRefresh=()=>{
  //    setShowAddAddress(false)
  //    setEditMode(false)
  // }
const handleNavigateToOrders=()=>{
  navigate('/orders');
}

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

  const handleAddressInputChange = (event) => {
    const { name, value } = event.target;
    setNewAddress({
      ...newAddress,
      [name]: value,
    });
  };
  const handleAddAddress = () => {
    setShowAddAddress(true);
  };
  const handleEditProfile = () => {
    setEditMode(true);
  };
  const handleEditProfileClose = () => {
    setEditMode(false);
  };
  const handleChangePassword = () => {
    console.log("+==================")
    setPasswordEditMode(true);
  }

  
const handleImageChange = async (e) => {
  const file = e.target.files[0];

  if (file) {
    try {
      const options = {
        maxSizeMB: 0.5, // Max size in MB
        maxWidthOrHeight: 1920, // Maximum width or height of the image
        useWebWorker: true,
      };

      // Compress the image
      const compressedFile = await imageCompression(file, options);

      // Convert the compressed image to Base64
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = async () => {
        const base64data = reader.result;

        // Prepare data with Base64 URL
        const addprofileimagedetails = {
          imageUrl: base64data, // Pass the Base64 URL
        };

        console.log(addprofileimagedetails);

        // Perform the image upload with Base64 data
        const uploadingprofilrimage = await addProfileImage(jwtToken, addprofileimagedetails,id);
        setRefresh(!refresh);
        if (uploadingprofilrimage.statuscode === '200 OK') {
          
          setRefresh(!refresh);
          console.log("Image upload successful");
        } else {
          console.log("Image not uploaded");
        }
      };
    } catch (error) {
      console.error('Image compression error:', error);
    }
  }
};
  const handleSaveChanges = () => {

    setEditMode(false);
    // Logic to save changes (update state or send to backend)
  };
  const handleSaveAddress = () => {
    setShowAddAddress(false);
    // Logic to save the new address
    setAddresses([...addresses, newAddress]);

    setNewAddress({
      houseName: '',
      streetName: '',
      landmark: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
    });
  };
  const handleFormValidation = async (event) => {

    event.preventDefault();

    try {
      await updateUserValidation.validate(
        {
          email,

          firstName,
          lastName,
          mobile,

        },

        { abortEarly: false }
      );

      event.preventDefault();
      try {
        const updateduserDetails = {


          firstName: firstName,
          lastName: lastName,
          email: email,
          mobile: mobile
        }
        console.log("updateduserDetails--", updateduserDetails)
        const updateDetails = await editProfile(jwtToken, id, updateduserDetails)
        console.log("rtghjkl")
        console.log("details---", updateDetails)

        if (updateDetails.statuscode == '200 OK') {

          console.log("manuuuuu")
          setUpdateSucces(true)
          setTimeout(() => {
            setUpdateSucces(false);
          }, 3000)
          setRefresh(!refresh)
          setEmailError('');
          setRefresh(!refresh);
          setFirstNameError('');
          setsecondNameError('');
          setMobileNumberError('');




        }
        else {
          seterrorMessage(true)
          setTimeout(() => {
            seterrorMessage(false);
          }, 3000)
        }

      } catch (err) {
        seterrorMessage2(true);
      }
    } catch (error) {
      const errors = {};
      error.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      console.log('Validation Errors:', errors);
      console.log("dfghjklxcvbnmxcvbnxcvb")
      setEmailError(errors.email || '');

      setFirstNameError(errors.firstName || '');
      setsecondNameError(errors.lastName || '');
      setMobileNumberError(errors.mobile || '');
      console.log('Validation Errors:', errors);
    }

  }
  const handleChangePasswordFormValidation = async (event) => {

    event.preventDefault();

    try {
      await changePasswordValidation.validate(
        {
          oldPassword,

          newPassword,
          retyped,


        },

        { abortEarly: false }
      );
      if (retyped == newPassword) {



        event.preventDefault();
        try {
          const updateduserPassword = {


            prevousPassword: oldPassword,
            newPassword: newPassword

          }
          console.log("updateduserDetails--", updateduserPassword)
          const updateDetails = await passwordUpdate(jwtToken, id, updateduserPassword)
          console.log("rtghjkl")
          console.log("details---", updateDetails)

          if (updateDetails.statuscode == '200 OK') {

            console.log("manuuuuu")


            setEmailError('');

            setFirstNameError('');
            setsecondNameError('');
            setMobileNumberError('');
            setPasswordChangedMessage(true);
            setTimeout(() => {
              setPasswordChangedMessage(false);
            }, 2000)
            setRefresh(!refresh)


          }
          else if (updateDetails.message == "Previous password does not match") {
            setOldPasswordError("Incorrect Password")

          }
          else {
            seterrorMessage2(true);
            setTimeout(() => {
              seterrorMessage2(false);
            }, 3000)
          }


        } catch (err) {
          seterrorMessage2(true);
          setTimeout(() => {
            seterrorMessage2(false);
          }, 3000)

        }
      }
      else {
        setRetypedPasswordError("PassWord Does Not Match")

        setTimeout(() => {
          setRetypedPasswordError(false);
        }, 3000)

      }
    } catch (error) {
      const errors = {};
      error.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      console.log('Validation Errors:', errors);
      console.log("dfghjklxcvbnmxcvbnxcvb")
      setOldPassword(errors.oldPassword || '');

      setNewPassWorError(errors.newPassword || '');
      setRetypedPasswordError(errors.retyped || '');

      console.log('Validation Errors:', errors);
    }

  }

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

        if (updateDetails.statuscode == '200 OK') {

          setAddresAddedSucces(true)
          setTimeout(() => {
            setAddresAddedSucces(false);
          }, 2000)
          setRefresh(!refresh)


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


  return (
    <div className="user-profile">
      <NavBar />
      {!editMode && !showAddAddress && <div className="left-section">
        <div className="user-image-section">
          <label htmlFor="userImage" className="upload-icon">
            <input
              type="file"
              id="userImage"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            {profileimg ? (
              <img src={profileimg} alt="User" className="user-image" />
            ) : (
              <div className="add-image-placeholder">+</div>
            )}
          </label>
        </div>
        <div className="user-options">
          <button onClick={() => setShowProducts(!showProducts)}>Show My Products</button>
          <button onClick={ handleNavigateToOrders}>My Orders</button>
          <button onClick={() => setShowRevenue(!showRevenue)}>My Revenue</button>
        </div>
      </div>}
      <div className="right-section">

        {editMode ? (
          // Edit mode input fields
          <>
            <div className="edit-details">
            <h2>Edit Profile</h2>
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={handleEditProfileClose} />
            
            {upadateSucces  &&<p className='profileupdatesuccesmessage'>Profile Updated Succesfully</p>}
              {errorMessagePassword && <div className="registration-error1">User Not Updated!</div>}
              {errorMessage2 && <p className="registration-error1">Ineternal Server Error</p>}
              <label>
                Firstname <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </label>
              {firstNameError && <p className="registration-error1">{firstNameError}</p>}
              <label>
                Lastname <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </label>
              {secondNameError && <p className="registration-error1">{secondNameError}</p>}
              <label>
                Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              {emailValidationError && <p className="registration-error1">{emailValidationError}</p>}
              <label>
                Phone: <input type="text" value={mobile} onChange={(e) => setPhone(e.target.value)} />
              </label>
              {mobilenumberError && <p className="registration-error1">{mobilenumberError}</p>}
              <button onClick={handleFormValidation}>Save Changes</button>
            </div>
          </>

        ) : passwordEditmode ? (
          <>
            <div className="edit-details">
       
              {errorMessagePassword && <div className="registration-error">Previous </div>}
              {passwordChangesMEssage && <h6>PassWord Updated SuccesFully</h6>}
              {errorMessage2 && <div className="registration-error">Ineternal Server Error</div>}
              <label>
                Existing password <input type="text" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              </label>
              {oldPasswordError && <h6 className="registration-error">{oldPasswordError}</h6>}
              <label>
                New Password <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </label>
              {newPasswordError && <h6 className="registration-error">{newPasswordError}</h6>}
              <label>
                Re-Enter <input type="password" value={retyped} onChange={(e) => setRetyped(e.target.value)} />
              </label>
              {retypedPasswordError && <h6 className="registration-error">{retypedPasswordError}</h6>}

              <button onClick={handleChangePasswordFormValidation}>Save Changes</button>
            </div>
          </>

        ) : showAddAddress ? (
          <>
            <div className='add-address'>
            {errorMessage2 && <p className="registration-error">Ineternal Server Error</p>}
            {addresAddedSucces && <p className="succes">Address Added Succesfully</p>}
            {addresNotAddedMEssage && <p className="registration-error">Not added</p>}
             
              <h2>Add Address</h2>

              <div>
                <input
                  type="text"
                  placeholder='First Name'
                  
                  onChange={(e) => { setName(e.target.value) }}
                />
                {/* {nameError && <div className="error">{nameError}</div>} */}

                <input
                  type="text"
                  placeholder='Last Name'
                  onChange={(e) => { setSecondName(e.target.value) }}
                />
                <div className='errordiv'>
                {nameError && <div className="error">{nameError}</div>}
                {secondNameError2 && <div className="error">{secondNameError2}</div>}
                </div>
                <input
                  type="text"
                  placeholder='Building Number'
                  onChange={(e) => { setBuildingNumber(e.target.value) }}
                />
                {/* {buildingNumberError && <p className="error">{buildingNumberError}</p>} */}

                <input
                  type="text"
                  placeholder='Street Address'
                  onChange={(e) => {setStreetAddress(e.target.value) }}
                />
                 <div className='errordiv'>
                {buildingNumberError && <p className="error">{buildingNumberError}</p>}
                {streetAddressError && <p className="error">{streetAddressError}</p>}
                 </div>
                {/* Other input fields and error handling */}
              </div>



              <input type="text" placeholder='landmark' onChange={(e) => { setLandMark(e.target.value) }} />
              {/* {landMarkError && <p className="error">{landMarkError}</p>} */}

              {/* <input
                type="text"

                placeholder='Country'

                onChange={(e) => { setCountry(e.target.value) }}
              /> */}
                {/* <label htmlFor="category">Category</label> */}
          <select id="country" name="country" value={country} onChange={(e) => { handleGetStates(e.target.value) }} required>
            <option value="">Select Country</option>
            {countries.map(name => (
              <option key={name.country} value={name.country}>
                {name.country}
              </option>
            ))}
          </select>
               <div className='errordiv'>
               {landMarkError && <p className="error">{landMarkError}</p>}
              {countryError && <p className="error">{countryError}</p>}
              </div>

              {/* <input
                type="text"

                placeholder='City'

                onChange={(e) => { setCity(e.target.value) }}
              /> */}
              {/* {cityError && <p className="error">{cityError}</p>} */}
              <select id="state" name="state" value={state} onChange={(e) => { handleAllCities(e.target.value) }} required>
            <option value="">Select State</option>
            {stateOptions.map(state=> (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          <select id="city" name="city" value={city} onChange={(e) => { setCity(e.target.value) }} required>
            <option value="">Select City</option>
            {citiesOptions.map(city=> (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
               <div className='errordiv'>
               {cityError && <p className="error">{cityError}</p>}
              {stateError && <p className="error">{stateError}</p>}
              </div>
              <input
                type="text"

                placeholder='pincode'

                onChange={(e) => { setZipcode(e.target.value) }}
              />
              {/* {zipcodeError && <p className="error">{zipcodeError}</p>} */}
              <input
                type="text"

                placeholder='mobile'

                onChange={(e) => { setPhoneNumber(e.target.value) }}
              />
                <div className='errordiv'>
               {zipcodeError && <p className="error">{zipcodeError}</p>}
              {phonenumberError && <p className="error">{phonenumberError}</p>}
                    </div>
              <button onClick={handleAddresFormValidation }>Save Address</button>
            </div>
          </>
        ) : (
          <>
            {/* User Details section */}
            <div className="user-details">
              <h2>User Details</h2>
              <p>
                <strong>Name:</strong> {firstName} {lastName}
              </p>

              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Phone:</strong> {mobile}
              </p>
              <button onClick={handleEditProfile}>Edit Profile</button>
              <span className='passwordChange' onClick={handleChangePassword}>Change Password</span>
            </div>
            <br />
            <div className="user-details">
              {/* Addresses section */}
              <h2>Addresses</h2>
              <div className="address-container">
                {newAddress.map((address) => (
                  <div className="address-item" key={address.id}>
                    <p>{address.buildingnumber}{address.streetAddress}</p>
                    <p>{address.landmark},{address.city}</p>
                    <p>{address.state} ,{address.country}</p>
                    <p>{address.zipCode}</p>
                  </div>
                ))}
              </div>
              <button onClick={handleAddAddress}>Add Address</button>
              {showRevenue && (
                <div>
                  <h2>My Revenue</h2>
                  <p>Revenue details go here...</p>
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>

  );
};



export default UserProfile;
