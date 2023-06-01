import React, { Component } from 'react'

export default class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state= {
            userData: "",
        };


    }

    componentDidMount(){
        fetch("http://localhost:5000/userData", {
            method: "POST", 
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ token: window.localStorage.getItem("token") , }),
        })
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data, "UserData")
            this.setState({userData: data.data})

            if(data.data === "token expired"){
                alert("Token Expired Login Again!")
                // this.logout();
                window.localStorage.clear()
                window.location.href = "./login"
            }
        })
        
    }    logout = () => {
        window.localStorage.clear()
        window.location.href = "./login"
    }

    render() {
        return (
            <div>
                Name
                <h1>{ this.state.userData.fname }</h1>

                Email
                <h1>{ this.state.userData.email }</h1>


                <button onClick={this.logout} className='btn btn-danger'>Logout</button>
            </div>
        )
    }
}
