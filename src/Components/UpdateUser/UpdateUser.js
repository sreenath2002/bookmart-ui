import React, { useState } from 'react';
import './UpdateUser.css'; // Import your CSS file for styling
import axios from 'axios';
import { updateUser } from '../../axios/service/adminServices';
import { registrationValidation } from '../../validation/validation';
const UpdateUser = (props) => {

  const [firstName, setFirstName] = useState(props.firstName);
  console.log("---", firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [email, setEmail] = useState(props.email);
  const [mobile, setMobile] = useState(props.mobile);
  const [password, setPassword] = useState();
  const [errorMessage, seterrorMessage] = useState('')
  const [errorMessage2, seterrorMessage2] = useState('')
  const [success, setsuccess] = useState(false)
  const [emailValidationError, setEmailError] = useState(false)
  const [mobilenumberError, setMobileNumberError] = useState(false);
  const [passwordError, setWrongPassword] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [secondNameError, setsecondNameError] = useState(false);
  const jwtToken = localStorage.getItem("jwt");
  const updateUserId = props.userId;
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add logic to handle form submission (update user details)
  //   // For demonstration, you can log form data
  //   const formData = new FormData(e.target);
  //   const formDataObj = {};
  //   formData.forEach((value, key) => {
  //     formDataObj[key] = value;
  //   });
  //   console.log('Form Data:', formDataObj);
  // };
  const handleFormValidation = async (event) => {

    event.preventDefault();

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
        const updateduserDetails = {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          mobile: mobile
        }
        console.log("updateduserDetails--", updateduserDetails)
        const updateDetails = await updateUser(jwtToken, updateUserId, updateduserDetails)
        console.log("rtghjkl")
        console.log("details---", updateDetails)

        if (updateDetails.statuscode == '200 OK') {
          setsuccess(true);
          console.log("manuuuuu")
          setEmailError('');
          setWrongPassword('');
          setFirstNameError('');
          setsecondNameError('');
          setMobileNumberError('');
          setTimeout(() => {
            setsuccess(false)
          }, 3000)
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
      setWrongPassword(errors.password || '');
      setFirstNameError(errors.firstName || '');
      setsecondNameError(errors.lastName || '');
      setMobileNumberError(errors.mobile || '');
      console.log('Validation Errors:', errors);
    }

  }

  return (
    <div className="update-user-form-container">
      <form className="update-user-form">
        <div className="form-group">

          {success && <div className="registration-success">Updated Successfully!</div>}
          {errorMessage && <div className="registration-error">User Not Updated!</div>}
          {errorMessage2 && <div className="registration-error">Ineternal Server Error</div>}
          <label htmlFor="username">Firstname</label>
          <input type="text" id="username" value={firstName} name="username" onChange={(e) => { setFirstName(e.target.value) }} required />
        </div>
        <div className="registration-error">{firstNameError}</div>
        <div className="form-group">
          <label htmlFor="username">Lastname</label>
          <input type="text" id="username" value={lastName} name="username" onChange={(e) => { setLastName(e.target.value) }} required />
        </div>
        <div className="registration-error">{secondNameError}</div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} name="email" onChange={(e) => { setEmail(e.target.value) }} required />
        </div>
        <div className="registration-error">{emailValidationError}</div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" value={mobile} name="phone" onChange={(e) => { setMobile(e.target.value) }} required />
        </div>
        <div className="registration-error">{mobilenumberError}</div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value) }} required />
        </div>
        <div className="registration-error">{passwordError}</div>
        <button onClick={handleFormValidation} className="update-btn">Update</button>
        <button onClick={props.handleBack} className="update-btn">Back</button>
      </form>
    </div>
  );
};

export default UpdateUser;
