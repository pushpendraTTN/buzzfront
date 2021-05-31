import React from 'react';
import Navbar from '../Home/navbar/navbar';
import Suggestions from '../Home/suggestion/suggestions';
import Profile from '../Profile/Profile/Profile';
import './profile.css';

const profile = ()=>{
    return(
        <>
        <Navbar />
        <div className="parallax">
        <div className="container">
            <div className="row">
                <div className="col-lg-9">
                    <Profile />
                </div>
                <div className="col-lg-3">
                    <Suggestions />
                </div>
            </div>
        </div> 
        </div>     
        </>
    )
}

export default profile;