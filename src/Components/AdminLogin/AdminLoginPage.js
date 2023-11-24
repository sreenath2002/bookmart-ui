import React, { useState } from 'react';
import './AdminLoginPage.css'; // Import your CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signinemailError, setSigninEmailError] = useState('');
  const [signinpasswordError, setSigninPasswordError] = useState('');
  const [signinError, setSigninError] = useState(false);
   const navigate=useNavigate();
  const validateForm = () => {
    let isValid = true;

    // Email validation using regex
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    if (email.trim() === '') {
      setSigninEmailError('Please provide email');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setSigninEmailError('Invalid email address');
      isValid = false;
    } else {
      setSigninEmailError('');
    }

    // Password length validation
    if (password.trim() === '') {
      setSigninPasswordError('Please provide password');
      isValid = false;
    } else if (password.length < 6) {
      setSigninPasswordError('Password must be at least 6 characters long');
      isValid = false;
    } else {
      setSigninPasswordError('');
    }

    return isValid;
  };

  async function login(event) {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8082/auth/signin', {
          email: email,
          password: password,
        });

        console.log(response.data);

        if (response.data.message === 'Sign in successfully') {
          console.log('sldjfkb');
          localStorage.setItem('jwt', response.data.jwt);
          navigate('/AdminPage')
          // Handle successful login
        } else {
          setSigninError(true);
          setTimeout(() => {
            setSigninError(false);
          }, 3000);
        }
      } catch (err) {
        console.error(err);
        setSigninError(true);
        setTimeout(() => {
          setSigninError(false);
        }, 3000);
      }
    }
  }

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <h1 className="admin-login-heading">Admin Login</h1>
        <form>
          {signinError && (
            <div className="registration-error">
              Email does not exist. Please register.
            </div>
          )}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="registration-error">{signinemailError}</div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="registration-error">{signinpasswordError}</div>
          <button onClick={login}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
