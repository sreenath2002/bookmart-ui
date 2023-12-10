// Login.js

import React, { useState } from 'react';
import './UserLogin.css'; // Import CSS file for custom styles
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import { setUser } from '../../redux/slices/userSlice';
import axios from 'axios';
const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signinemailError, setSigninEmailError] = useState("");
  const [signinpasswordError, setSigninPasswordError] = useState("");
  const[signinError,setSigninError]=useState(false);
  const[blockedMessage,setBlockedMessage]=useState(false)
  const [Error, setError] = useState("");
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const path = useSelector((state) => state.user.path);
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   // Your login logic here
  //   console.log('Username:', username);
  //   console.log('Password:', password);
  //   // Reset the form fields
  //   setUsername('');
  //   setPassword('');
  // };
   
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt');
    // const path = useSelector((state) => state.user.path);
    if (jwtToken) {
   
        console.log(path);
      if ( path ==='/Admin') {
        // Handle back button pressed on /Admin page
        navigate('/Admin');
      } else if (path === '/Home') {
        // Handle back button pressed on /Home page
        navigate('/');
      }
    }
  }, []);
   
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
        const response = await axios.post("http://localhost:8084/api/auth/signin", {
          email: email,
          password: password,
        });
        if(response.data.message==="USER IS DELETED")
        {
                 setSigninError(true);
                 setTimeout(()=>{
                  setSigninError(false)
                 },3000)
        }
        
          else if(response.data.message==="USER IS BLOCKED")
          {
                   setBlockedMessage(true);
                   setTimeout(()=>{
                    setBlockedMessage(false)
                   },3000)
          }
       else if (response.data.message === "Sign in succecsfully") {
          console.log(response.data);
          console.log("sldjfkb");
          localStorage.setItem("jwt", response.data.jwt);
          if(response.data.role === "USER")
          {
            dispatch(setUser({email,id:response.data.id,path:'/Home',firstName:response.data.firstName,lastName:response.data.lastName,mobile:response.data.mobile,role:response.data.role}))
            navigate('/')
          }
          

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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="login-container">
            <form className="login-form">
              {signinError && (
                <div className="alert alert-danger">Email does not exist. Please register.</div>
              )}
              {Error && (
                <div className="alert alert-danger">Oops!! Something Went Wrong</div>
              )}
              {blockedMessage && (
                <div className="alert alert-danger">You are Blocked By the Admin</div>
              )}
              <h1>Login</h1>
              <div className="form-group">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Username"
                  required
                />
                <div className="text-danger">{signinemailError}</div>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Password"
                  required
                />
                <div className="text-danger">{signinpasswordError}</div>
              </div>
              <div className='forgot-password'>
                <Link to="/ForgotPassword" className="forgot-password-link">Forgot Password?</Link>
              </div>
              <button onClick={login} className="btn btn-primary btn-block">Login</button>
              <div className='new-user'>
                New User? Register <Link to="/UserRegister" className="text-primary">Here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
