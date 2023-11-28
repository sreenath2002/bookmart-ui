// Login.js

import React, { useState } from 'react';
import './ForgotPassword.css'; // Import CSS file for custom styles
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ... (imports and other code)

const ForgotPassword = () => {
  const [enterdEmail, setenterdEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailVerify, setEmailVerify] = useState(true);
  const [emailNotExists, setEmailNotExists] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState('');
  const [passwordValidationError, setPasswordValidationError] = useState('');
  const [passwordChangedMessage, setPasswordChangedMessage] = useState('');
  const [passwordChangedError, setPasswordChangedError] = useState('');
  const navigate =useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    if (enterdEmail.trim() === '') {
      setEmailValidationError('Please provide an email');
      return false;
    } else if (!emailRegex.test(enterdEmail)) {
      setEmailValidationError('Invalid email address');
      return false;
    }
    setEmailValidationError('');
    return true;
  };

  const validatePassword = () => {
    if (newPassword.trim() === '') {
      setPasswordValidationError('Please provide a password');
      return false;
    } else if (newPassword.length < 6) {
      setPasswordValidationError('Password must be at least 6 characters long');
      return false;
    }
    setPasswordValidationError('');
    return true;
  };

  const emailExists = async (event) => {
    event.preventDefault();
    
    if (validateEmail()) {
      console.log("wejfgkdsugsgh")
      try {
        const res = await axios.post('http://localhost:8084/api/auth/emailexists', {
          email: enterdEmail,
        });
        if (res.data.statuscode === '200 OK') {
          setEmailVerify(false);
        } else {
          setEmailNotExists(true);
          setenterdEmail('');
          setTimeout(() => {
            setEmailNotExists(false);
          }, 3000);
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle error
      }
    }
  };

  const changePassword = async (event) => {
    event.preventDefault();
    if (validatePassword()) {
      try {
        console.log("ehfsldkjhkjh")
        const res = await axios.post('http://localhost:8084/api/auth/changePassword', {
          email:enterdEmail,
          newPassword: newPassword,
        });
        if (res.data.statuscode === '200 OK') {
          setPasswordChangedMessage('Password Updated Successfully');
          setTimeout(() => {
            setPasswordChangedMessage('');
            navigate('/UserLogin');
          }, 3000);
         

        } else {
          setPasswordChangedError('Oops! Something went wrong. Try again.');
          setNewPassword('');
          setTimeout(() => {
            setPasswordChangedError('');
          }, 3000);
        }
      } catch (error) {
        console.error('Error:', error);
        setPasswordChangedError('Oops! Something went wrong. Try again.');
        setTimeout(() => {
          setPasswordChangedError('');
        }, 3000);
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        {/* Display error messages */}
        {emailNotExists && <div className="registration-error">Email does not exist. Please register.</div>}
        {passwordChangedError && <div className="registration-error">{passwordChangedError}</div>}
        {passwordChangedMessage && <div className="registration-success">{passwordChangedMessage}</div>}

        <h1>Forgot Your Password</h1>
        {emailVerify && (
          <>
            <div className="input-group">
              <input
                type="text"
                value={enterdEmail}
                onChange={(e) => setenterdEmail(e.target.value)}
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="registration-error">{emailValidationError}</div>
            <button onClick={emailExists}>Verify</button>
          </>
        )}
        {!emailVerify && (
          <>
            <div className="input-group">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter Your New Password"
                required
              />
            </div>
            <div className="registration-error">{passwordValidationError}</div>
            <button onClick={changePassword}>Change Password</button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;



