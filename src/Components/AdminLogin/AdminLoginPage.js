import React, { useState } from 'react';
import './AdminLoginPage.css'; // Import your CSS file for styling
import axios from 'axios';
import { useDispatch } from 'react-redux';
import  { setUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signinemailError, setSigninEmailError] = useState('');
  const [signinpasswordError, setSigninPasswordError] = useState('');
  const [signinError, setSigninError] = useState(false);
  const [notAcces,setNotAccesMEssage]=useState(false);
   const navigate=useNavigate();
   const dispatch = useDispatch();
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
        console.log("agfskghkc")
        
        const response = await axios.post("http://localhost:8084/api/auth/signin", {
          email: email,
          password: password,
        });
         
        // console.log(response.data);
       

        if (response.data.message === 'Sign in succecsfully') {
          console.log('sldjfkb');
          localStorage.setItem('jwt', response.data.jwt);
          if(response.data.role === "ADMIN")
          {
            dispatch(setUser({email,id:response.data.id,path:'/AdminPage',firstName:response.data.firstName,lastName:response.data.lastName,mobile:response.data.mobile}))
            navigate('/AdminPage')
          }
          else{
            setNotAccesMEssage(true);
            setTimeout(() => {
              setNotAccesMEssage(false);
            }, 2000);

          }
          // Handle successful login
        } else {
          console("kfsldgck")
          setSigninError(true);
          setTimeout(() => {
            setSigninError(false);
          }, 3000);
        }
      } catch (err) {
        console.log("hfgsacgghshafdg")
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
          {notAcces && (
            <div className="registration-error">
              You are Not Admin!
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
