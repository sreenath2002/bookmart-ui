// Login.js

import React, { useState } from 'react';
import { useEffect } from 'react';
import './UserRegister.css'; // Import CSS file for custom styles
import { Link } from 'react-router-dom';
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

    const validateForm = () => {
        let isValid = true;

        // Email validation using regex



        // Password length validation
        if (password.trim() === '') {
            setWrongPassword("Please provide password")
            isValid = false;
        }
        else if (password.length < 6) {
            setWrongPassword("Password must be at least 6 characters long");
            isValid = false;
        }

        else {
            setWrongPassword("");
        }

        if (firstName.trim() === '') {
            setFirstNameError('Please provide a first name');
            isValid = false;
        } else if (!/^[A-Z]/.test(firstName)) {
            setFirstNameError('First name must start with a capital letter');
            isValid = false;
        } else {
            setFirstNameError('');
        }

        if (lastName.trim() === '') {
            setsecondNameError("Please provide Lastname")
            isValid = false;
        }


        else {
            setsecondNameError("");
        }
        if (mobile.trim() === '') {
            setMobileNumberError("Please provide Mobilenumber")
            isValid = false;
        }
        else if (mobile.length != 10) {
            setMobileNumberError("Mobile Number only have 10 numbers");
            isValid = false;
        }

        else {
            setMobileNumberError("");
        }


        return isValid;
    };

    const validateEmail = () => {
        let isValid = true;

        // Email validation using regex
        const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        if (email.trim() === '') {
            setEmailError("Please provide email")
            isValid = false;
        }
        else if (!emailRegex.test(email)) {
            setEmailError("Invalid email address");
            isValid = false;
        }
        else {
            setEmailError("")
        }

        return isValid;

    }
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
        setSendOtp(false)
        setverifyOtp(true)
       
        otpsend();
       
    }


    async function save(event) {
        event.preventDefault();

        if (validateForm()) {
            try {
                await axios.post("http://localhost:8082/auth/signup", {
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    mobile: mobile
                })
                
                setRegistrationSuccess(true);
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

    async function otpsend() {


        try {
            await axios.post("http://localhost:8082/auth/send-otp", {
                email: email
            }

            ).then((res) => {
                if (res.data.message == "OTP sent successfully") {
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

    async function emailExists(event) {

        event.preventDefault();
        if (validateEmail()) {
            try {
                console.log("haiiiiiiiiiii")
                await axios.post("http://localhost:8082/auth/emailexists", {
                    email: email
                }

                ).then((res) => {
                    console.log(res.data)
                    if (res.data.message == "Email does not exist") {
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

    async function otpverify(event) {

        event.preventDefault();
        if (validateOTP()) {
            try {
                await axios.post("http://localhost:8082/auth/verify-otp", {
                    enteredotp: otp,
                    email: email
                }

                ).then((res) => {
                    console.log("sjfdhjsh")
                    if (res.data.message == "OTP verified") {
                        setOptVerifiedSuccesMEssage(true)
                        setverifyOtp(false);
                        setShowFullForm(true)
                        setTimeout(() => {
                            setOptVerifiedSuccesMEssage(false);
                        }, 3000);

                    }
                    else {
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
        <div className="login-container">
            <form className="login-form"  >
                <br></br>
                {registrationSuccess && <div className="registration-success">Registered Successfully!</div>}
                {otpsendSucces && <div className="registration-success">OTP has Send </div>}
                {otpVerifySuccesMessage && <div className="registration-success">OTP Verified</div>}
                {otpVerifyFailedMEssage && <div className="registration-error">Invalid OTP</div>}
                {Error && <div className="registration-error">Oops!! Something Went Wrong</div>}
                {otpsendFailed && <div className="registration-error">Failed to send otp.Try again</div>}
                {emailExistsError && <div className="registration-error">Email already exists</div>}
                <h1>Register</h1>

                <div className="input-group">
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
                        <div className="input-group">
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
                        <div className='resend otp' onClick={handleOtpEnter}>Resend OTP</div>
                        <button onClick={otpverify}>Verify OTP</button>
                    </>
                )}




                {sendOtp && <button onClick={emailExists} >Send OTP</button>}

                {showfullForm && (<>
                    <div className="input-group">
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter Firstname"
                            required
                        />
                    </div>
                    <div className="registration-error">{firstNameError}</div>
                    <div className="input-group">
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter Lastname"
                            required
                        />
                    </div>
                    <div className="registration-error">{secondNameError}</div>
                    <div className="input-group">
                        <input
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Enter Mobile Number"
                            required
                        />
                    </div>
                    <div className="registration-error">{mobilenumberError}</div>
                    <div className="input-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            required
                        />
                    </div>
                    <div className="registration-error">{passwordError}</div>

                    <button onClick={save}>Register</button></>)}
                <div className='already have'>Already have Account?  <Link to="/UserLogin" className="signin link">SignIn</Link></div>
            </form>
        </div>
    );
};

export default UserRegister;