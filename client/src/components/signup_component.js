import React, { Component } from 'react'
import app from './firebase_config'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

const auth = getAuth(app);

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '', lname: '', mobile: '', email: '', password: '', verifyButton: false, verifyOTP: false, otp: '', verified: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSignInSubmit = this.onSignInSubmit.bind(this);
        this.verifyCode = this.verifyCode.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.verified) {
            const { fname, lname, email, mobile, password } = this.state;
            // console.log(fname, lname, mobile, email, password);

            fetch("http://localhost:5000/register", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ fname, lname, mobile, email, password }),
            })
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data, "userRegister")
                })
        } else {
            alert("Please Verify Mobile")
        }
    }

    onCaptchaVerify() {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                this.onSignInSubmit();
            },
        }, auth);

        // console.log(window.recaptchaVerifier);
    }

    onSignInSubmit = () => {
        this.onCaptchaVerify()
        const phoneNumber = "+91" + this.state.mobile;
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                alert("otp sent")
                this.setState({ verifyOTP: true })
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                // console.log(error)
            });
    }

    verifyCode() {
        window.confirmationResult.confirm(this.state.otp).then((result) => {
            // User signed in successfully.
            const user = result.user;
            // console.log(user)
            alert("Verification Done")
            this.setState({ verified: true, verifyOTP: false })
            // ...
        }).catch((error) => {
            alert("Invalid OTP")
            // User couldn't sign in (bad verification code?)
            // ...
        });
    }

    changeMobile(e) {
        this.setState({ mobile: e.target.value }, function () {
            if (this.state.mobile.length === 10) {
                this.setState({ verifyButton: true, });
            }
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign Up Component</h3>
                    <div id='recaptcha-container'></div>

                    <div className='mb-3'>
                        <label>First Name</label>
                        <input type='text' className='form-control' placeholder='First Name' onChange={(e) => this.setState({ fname: e.target.value })} />
                    </div>

                    <div className='mb-3'>
                        <label>Last Name</label>
                        <input type='text' className='form-control' placeholder='Last Name' onChange={(e) => this.setState({ lname: e.target.value })} />
                    </div>

                    <div className='mb-3'>
                        <label>Email Address</label>
                        <input type='email' className='form-control' placeholder='Email Address' onChange={(e) => this.setState({ email: e.target.value })} />
                    </div>

                    <div className='mb-3'>
                        <label>Mobile No.</label>
                        <input type='text' className='form-control' placeholder='Enter Mobile Number' onChange={(e) => this.changeMobile(e)} />

                        {this.state.verifyButton ?
                            <input type='button' value={this.state.verified ? "Verified" : "Verify"} style={{ backgroundColor: '#0163d2', width: '100%', padding: 8, color: 'white', border: 'none' }} onClick={this.onSignInSubmit} />
                            : null
                        }
                    </div>

                    {this.state.verifyOTP ?
                        <div className='mb-3'>
                            <label>OTP</label>
                            <input type='number' className='form-control' placeholder='Enter OTP' onChange={(e) => this.setState({ otp: e.target.value })} />
                            <input type='button' value='OTP' style={{ backgroundColor: '#0163d2', width: '100%', padding: 8, color: 'white', border: 'none' }} onClick={this.verifyCode} />
                        </div>
                        : null
                    }

                    {this.state.verified ?
                        <>
                            <div className='mb-3'>
                                <label>Password</label>
                                <input type='password' className='form-control' placeholder='Password' onChange={(e) => this.setState({ password: e.target.value })} />
                            </div>

                            <div className='d-grid'>
                                <button type='submit' className='btn btn-primary' id='signUpBtn'>Submit</button>
                            </div>
                        </>
                        : null
                    }
                    
                    <p className='forgot-password text-right mt-5'> Already a member
                        <a href='/signup'>Sign In</a>
                    </p>

                </form>

            </div>
        )
    }
}
