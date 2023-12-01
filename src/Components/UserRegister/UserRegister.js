// Login.js

import React, { useState } from 'react';
import { useEffect } from 'react';
import './UserRegister.css'; // Import CSS file for custom styles
import { Link } from 'react-router-dom';
import { registrationValidation } from '../../validation/validation';
import { emailValidation } from '../../validation/validation';
import axios from 'axios';
const UserRegister = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [sendOtp, setSendOtp] = useState(true);
    const [verifyOtp, setverifyOtp] = useState(false);
    const [showfullForm, setShowFullForm] = useState(false)
    const [emailValidationError, setEmailError] = useState(false)
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [otpVerifySuccesMessage, setOptVerifiedSuccesMEssage] = useState(false);
    const [otpVerifyFailedMEssage, setOtpVerifyFaildMEssage] = useState(false);
    const [emailExistsError, setEmailExistsError] = useState(false);
    const [otpsendSucces, setotpSendSucces] = useState(false);
    const [mobilenumberError, setMobileNumberError] = useState(false);
    const [passwordError, setWrongPassword] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [secondNameError, setsecondNameError] = useState(false);
    const [otpsendFailed, setotpSendFailed] = useState(false)
    const [Error, setError] = useState("");
    const [otpError, setOtpError] = useState(false)
    const [timer, setTimer] = useState(60);
    const [timerExpired, setTimerExpired] = useState(false);


    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     // Your login logic here
    //     console.log('Username:', username);
    //     console.log('Password:', password);
    //     // Reset the form fields
    //     setUsername('');
    //     setPassword('');
    // };
    const startTimer = () => {
        setTimer(60);
        setTimerExpired(false);
    };

    useEffect(() => {
        let interval;

        if (verifyOtp) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 0) {
                        setTimerExpired(true);
                        clearInterval(interval);
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [verifyOtp]);

    useEffect(() => {
        let timeout;
        if (timerExpired) {
            timeout = setTimeout(() => {
                setTimerExpired(false);
            }, 2000);
        }
        return () => clearTimeout(timeout);
    }, [timerExpired]);


    useEffect(() => {
        if (timerExpired) {
            setOtp('');

            setTimer(60);
        }
    }, [timerExpired]);

    
    const validateOTP = () => {
        let isValid = true;

        // Email validation using regex

        if (otp.trim() === '') {
            setOtpError("Please Provide the otp")
            isValid = false;
        }

        else {
            setOtpError("")
        }

        return isValid;

    }

    const handleOtpEnter = () => {
        
       
        otpsend();
       
    }

    const handleEmailValidation =async (event)=>{
        try {
            await emailValidation.validate(
              {
                email,
                
               
              },
              { abortEarly: false }
            );
             {

                event.preventDefault();
                
                    try {
                        console.log("haiiiiiiiiiii")
                        await axios.post("http://localhost:8084/api/auth/emailexists", {
                            email: email
                        }
        
                        ).then((res) => {
                            console.log(res.data)
                            if (res.data.message == "Failed") {
                                console.log("lekwflkwafkhe")
                                handleOtpEnter();
                            }
                            else {
                                setEmailExistsError(true)
                                setTimeout(() => {
                                    setEmailExistsError(false);
                                }, 3000);
                            }
                        })
                            .catch((error) => {
                                setError(true)
                                setTimeout(() => {
                                    setError(false);
                                }, 3000);
                                // Handle error
                                console.log("haiiii")
                                console.error('Error:', error);
        
                            });
        
        
                    }
                    catch (err) {
                        setError(true)
                        setTimeout(() => {
                            setError(false);
                        }, 3000);
        
                    }
                
            }
      
            
          }
          catch(error){
            const errors = {};
         error.inner.forEach((e) => {
        errors[e.path] = e.message;
        });

          setEmailError(errors.email || '');

          } 
    }
     
    const handleFormValidation=async (event)=>{
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
             {
                event.preventDefault();
                     
                 {
                    try {
                        await axios.post("http://localhost:8084/api/auth/signup", {
                            email: email,
                            password: password,
                            firstName: firstName,
                            lastName: lastName,
                            mobile: mobile
                        })
                        
                        setRegistrationSuccess(true);
                        setShowFullForm(!showfullForm)
                        setSendOtp(!sendOtp)
                        setEmail('');
                        setPassword('');
                        setFirstName('');
                        setLastName('');
                        setMobile('');
                        setTimeout(() => {
                            setRegistrationSuccess(false);
                        }, 3000);
        
                    }
                    catch (err) {
                       setEmailExistsError(true)
                        setTimeout(() => {
                            setEmailExistsError(false);
                        }, 3000);
        
                    }
                }
            }
          }
          catch (error){
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

    

    async function otpsend() {


        try {
            await axios.post("http://localhost:8084/api/auth/send-otp", {
                email: email
            }

            ).then((res) => {
                if (res.data.statuscode == "201 CREATED") {
                    startTimer();
                    setSendOtp(false)
                     setverifyOtp(true)
                    setotpSendSucces(true)
                    
                    setTimeout(() => {
                        setotpSendSucces(false);
                    }, 3000);
                }
                else {
                    setotpSendFailed(true)
                    setTimeout(() => {
                        setotpSendFailed(false);
                    }, 3000);
                }
            })
                .catch((error) => {
                    // Handle error
                    console.log("haiiii")
                    console.error('Error:', error);

                });


        }
        catch (err) {
            setError(true)
            setTimeout(() => {
                setError(false);
            }, 3000);

        }
    }

    

    async function otpverify(event) {

        event.preventDefault();
        if (validateOTP()) {
            try {
                console.log(otp);
                console.log(email)
                await axios.post("http://localhost:8084/api/auth/verify-otp", {
                    enteredotp: otp,
                    email: email
                }

                ).then((res) => {
                    console.log("sjfdhjsh")
                    if (res.data.statuscode == '200 OK') {
                        setOptVerifiedSuccesMEssage(true)
                        setverifyOtp(false);
                        setShowFullForm(true)
                        setTimeout(() => {
                            setOptVerifiedSuccesMEssage(false);
                        }, 3000);

                    }
                    if(res.data.message=="OTP verification failed") {
                        console.log("akjgsflkgh")
                        setOtpVerifyFaildMEssage(true)
                        setTimeout(() => {
                            setOtpVerifyFaildMEssage(false);
                        }, 3000);
                    }
                })
                    .catch((error) => {

                        // Handle error
                        console.log("haiiii")
                        console.error('Error:', error);

                    });


            }
            catch (err) {
                setError(true)
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
        <div className="register-container">
            <div className='registerclass'>
            <form className="register-form"  >
                <br></br>
                {registrationSuccess && <div className="registration-success">Registered Successfully!</div>}
                {otpsendSucces && <div className="registration-success">OTP has Send </div>}
                {otpVerifySuccesMessage && <div className="registration-success">OTP Verified</div>}
                {otpVerifyFailedMEssage && <div className="registration-error">Invalid OTP</div>}
                {Error && <div className="registration-error">Oops!! Something Went Wrong</div>}
                {otpsendFailed && <div className="registration-error">Failed to send otp.Try again</div>}
                {emailExistsError && <div className="registration-error">Email already exists</div>}
                <h1>Register</h1>

                <div className="input-groups">
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                        required
                    />
                </div>
                <div className="registration-error">{emailValidationError}</div>
                {verifyOtp && (
                    <>
                        <div className="input-groups">
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP here"
                                required
                            />
                        </div>
                        {timerExpired ? (
                            <p className="time-exceeded">Time limit exceeded!</p>
                        ) : (
                            <p>Time remaining: {timer} seconds</p>
                        )}
                        <div className="registration-error">{otpError}</div>
                        <div className='resendotp' onClick={handleOtpEnter}>Resend OTP</div>
                        <button onClick={otpverify}>Verify OTP</button>
                    </>
                )}




                {sendOtp && <button onClick={handleEmailValidation} >Send OTP</button>}

                {showfullForm && (<>
                    <div className="input-groups">
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter Firstname"
                            required
                        />
                    </div>
                    <div className="registration-error">{firstNameError}</div>
                    <div className="input-groups">
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter Lastname"
                            required
                        />
                    </div>
                    <div className="registration-error">{secondNameError}</div>
                    <div className="input-groups">
                        <input
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Enter Mobile Number"
                            required
                        />
                    </div>
                    <div className="registration-error">{mobilenumberError}</div>
                    <div className="input-groups">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            required
                        />
                    </div>
                    <div className="registration-error">{passwordError}</div>

                    <button onClick={handleFormValidation}>Register</button></>)}
                <div className='already have'>Already have Account?  <Link to="/UserLogin" className="signinlink ">SignIn</Link></div>
            </form>
            </div>
        </div>
        </div>
        </div>
        </div>
    );
};

export default UserRegister;