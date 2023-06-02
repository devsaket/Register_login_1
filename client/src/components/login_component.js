import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    

    handleSubmit(e) {
        e.preventDefault();

        const { email, password } = this.state;
        console.log(email, password);

        fetch("http://localhost:5000/login-user", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ email, password, }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userLogin")
                if (data.status === "ok") {
                    alert("Login Successful!")
                    window.localStorage.setItem("token", data.data)
                    window.localStorage.setItem("loggedIn", true)
                    window.location.href = "./userDetails"
                }
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Login Component</h3>
                    <div id="recaptcha-container"></div>

                    <div className='mb-3'>
                        <label>Email Address</label>
                        <input type='email' className='form-control' placeholder='Enter Email Address' onChange={(e) => this.setState({ email: e.target.value })} />
                    </div>

                    <div className='mb-3'>
                        <label>Password</label>
                        <input type='password' className='form-control' placeholder='Enter Password' onChange={(e) => this.setState({ password: e.target.value })} />
                    </div>

                    <div className='mb-3'>
                        <div className='custom-control custom-checkbox'>
                            <input type='checkbox' className='custom-control-input' id='customCheck1' />
                            <label className='custom-control-label' htmlFor='customCheck1'> Remember me </label>
                        </div>
                    </div>

                    <div className='d-grid'>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </div>
                    <p className='forgot-password text-right'>
                        <a href='/signup'>Sign Up</a>
                    </p>

                </form>
            </div>
        )
    }
}
