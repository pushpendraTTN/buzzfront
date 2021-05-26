// import React from 'react';
import React from 'react';
import '../Login/login.css';
import logo from '../../assests/ttn-logo.jpg';

const login = ()=>{
    
    return(        
        <div className="banner-bg">
            <div className="login-form">
                <img className="ttn-logo" src={logo} alt="logo"/>
                <p className="login-content">Enter Your Details And Start Your Journey With Us</p>
                <a href="http://localhost:8000/google"><button className="btn btn-outline-danger btn-lg banner-btn">Login With Google</button></a>
            </div>
        </div>
    );
};

export default login;