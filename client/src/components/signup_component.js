import React, { Component } from 'react'

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state={
            fname: '', lname: '', email: '', password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();

        const { fname, lname, email, password } = this.state;
        console.log(fname, lname, email, password);

        fetch("http://localhost:5000/register", {
            method: "POST", 
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ fname, lname, email, password }),
        })
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data, "userRegister")
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign Up Component</h3>

                    <div className='mb-3'>
                        <label>First Name</label>
                        <input type='text' className='form-control' placeholder='First Name' onChange={(e)=> this.setState({ fname: e.target.value }) } />
                    </div>

                    <div className='mb-3'>
                        <label>Last Name</label>
                        <input type='text' className='form-control' placeholder='Last Name' onChange={(e)=> this.setState({ lname: e.target.value }) } />
                    </div>

                    <div className='mb-3'>
                        <label>Email Address</label>
                        <input type='email' className='form-control' placeholder='Email Address' onChange={(e)=> this.setState({ email: e.target.value }) } />
                    </div>

                    <div className='mb-3'>
                        <label>Password</label>
                        <input type='password' className='form-control' placeholder='Password' onChange={(e)=> this.setState({ password: e.target.value }) } />
                    </div>

                    <div className='d-grid'>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </div>
                    <p className='forgot-password text-right'> Already a member 
                        <a href='/signup'>Sign In</a>
                    </p>

                </form>

            </div>
        )
    }
}
