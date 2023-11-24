// Login.js

import React, { useState } from 'react';
import './UserLogin.css'; // Import CSS file for custom styles
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signinemailError, setSigninEmailError] = useState("");
  const [signinpasswordError, setSigninPasswordError] = useState("");
  const[signinError,setSigninError]=useState(false);
  const [Error, setError] = useState("");
  const navigate =useNavigate();

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   // Your login logic here
  //   console.log('Username:', username);
  //   console.log('Password:', password);
  //   // Reset the form fields
  //   setUsername('');
  //   setPassword('');
  // };
   
  const validateForm = () => {
    let isValid = true;

    // Email validation using regex
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    if(email.trim()==='')
    {
      setSigninEmailError("Please provide email")
      isValid=false;
    }
    else if (!emailRegex.test(email) ) {
      setSigninEmailError("Invalid email address");
      isValid = false;
    }
    else{
      setSigninEmailError("")
    }
    

    // Password length validation
     if(password.trim()==='')
    {
      setSigninPasswordError("Please provide password")
      isValid=false;
    }
    else if (password.length < 6 ) 
    {
      setSigninPasswordError("Password must be at least 6 characters long");
      isValid = false;
    } 
    
    else 
    {
      setSigninPasswordError("");
    }
    

    return isValid;
  };
  
  async function login(event) {
    event.preventDefault();
  
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:8083/api/auth/signin", {
          email: email,
          password: password,
        });
  
        if (response.data.message === "Sign in succecsfully") {
          console.log(response.data);
          console.log("sldjfkb");
          localStorage.setItem("jwt", response.data.jwt);
          navigate('/Pro')

        } else {
          setSigninError(true);
          setTimeout(() => {
            setSigninError(false);
          }, 3000);
        }
      } catch (err) {
        console.error(err);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    }
  }
  
   

  return (
    <div className="login-container">
      <form className="login-form" >
      {signinError  && <div className="registration-error">Email does not Exists.Please Register</div>}
      {Error && <div className="registration-error">Oops!! Something Went Wrong</div>}
        <h1>Login</h1>
        <div className="input-group">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="registration-error">{signinemailError}</div>
        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className="registration-error">{signinpasswordError}</div>
        <div className='forgotpassword'><Link to="/ForgotPassword" className="signin link">Forgot Password ?</Link></div>
        <button onClick={login}>Login</button>
        <div className='already have'>New User?Register  <Link to="/UserRegister" className="signin link">Here</Link></div>
      </form>
    </div>
  );
};

export default UserLogin;
