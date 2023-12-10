import React from 'react';
import './AddUser.css'; // Import your CSS file for styling
import { addUser } from '../../axios/service/adminServices';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { registrationValidation } from '../../validation/validation';
const AddUser = (props) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [confirmpassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState();
  const [errorMessage, seterrorMessage] = useState('')
  const [errorMessage2, seterrorMessage2] = useState('')
  const [success, setsuccess] = useState(false)
  const [emailValidationError, setEmailError] = useState(false)
  const [mobilenumberError, setMobileNumberError] = useState(false);
    const [passwordError, setWrongPassword] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [secondNameError, setsecondNameError] = useState(false);
    const [confirmpasswordError, setConfirmPasswordError] = useState(false);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add logic to handle form submission (add new user)
  //   // For demonstration, you can log form data
  //   const formData = new FormData(e.target);
  //   const formDataObj = {};
  //   formData.forEach((value, key) => {
  //     formDataObj[key] = value;
  //   });
  //   console.log('Form Data:', formDataObj);
  // };
  const jwtToken = localStorage.getItem("jwt");
  const handleFormValidation = async (event) => {

    event.preventDefault();
    if (password !== confirmpassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    } else {
      setConfirmPasswordError('');
    }
    try {
      await registrationValidation.validate(
        {
          email,
          password,
          firstName,
          lastName,
          mobile,

        },

        { abortEarly: false }
      );


      event.preventDefault();
      try {
        const userDetails = {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          mobile: mobile
        }
        console.log("userDetails--", userDetails)
        const addedUserDetails = await addUser(jwtToken, userDetails)
        console.log("rtghjkl")
        console.log("details---", addedUserDetails)

        if (addedUserDetails.statusCode == '201') {
          setsuccess(true);
         
          setEmailError('');
      setWrongPassword( '');
      setFirstNameError('');
      setsecondNameError('');
      setMobileNumberError('');
          seterrorMessage2('');
          setTimeout(() => {
            setsuccess(false)
          }, 3000)
        }
        else {
          seterrorMessage2('');
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
      setWrongPassword(errors.password || '');
      setFirstNameError(errors.firstName || '');
      setsecondNameError(errors.lastName || '');
      setMobileNumberError(errors.mobile || '');
      console.log('Validation Errors:', errors);
    }

  }
  

  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-12">
    <div className="register-container">
        <div className='registerclass'>
      <form className="update-user-form">
        <div className="form-group1">

          {success && <div className="registration-success">Added SuccesFully</div>}
          {errorMessage && <div className="registration-error">Email Already Exists</div>}
          {errorMessage2 && <div className="registration-error">Ineternal Server Error!</div>}
          <label htmlFor="username">Firstname</label>
          
          <input type="text" id="username" value={firstName} name="username" onChange={(e) => { setFirstName(e.target.value) }} required />
       
       {firstNameError && <h6 className="registration-error">{firstNameError}</h6>}
        <div className="form-group">
          <label htmlFor="username">Lastname</label>
          <input type="text" id="username" value={lastName} name="username" onChange={(e) => { setLastName(e.target.value) }} required />
        </div>
       {secondNameError && <h6 className="registration-error">{secondNameError}</h6>}
        </div>
        <div className="form-group">

          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} name="email" onChange={(e) => { setEmail(e.target.value) }} required />
        </div>
       {emailValidationError&& <h6 className="registration-error">{emailValidationError}</h6>}
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" value={mobile} name="phone" onChange={(e) => { setMobile(e.target.value) }} required />
        </div>
        {mobilenumberError && <h6 className="registration-error">{mobilenumberError}</h6>}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value) }} required />
        </div>
        {passwordError && <h6 className="registration-error">{passwordError}</h6>}
        <div className="form-group">
                        <input
                            type="password"
                            value={confirmpassword  }
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Enter Password again"
                            required
                        />
                    </div>
                    { confirmpasswordError && <h6 className="registration-error">{confirmpasswordError}</h6>}
        <button onClick={handleFormValidation} className="update-btn">Add</button>
        <button onClick={props.handleBack} className="back">Back</button>
      </form>
    </div>
    </div>
    </div>
      </div></div>
  
  );
};

export default AddUser;
