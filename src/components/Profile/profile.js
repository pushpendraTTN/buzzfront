import React from 'react';
import Navbar from '../Home/navbar/navbar';
import EditProfile from '../Profile/editprofile/editProfile';
import Suggestions from '../Home/suggestions';
import './profile.css';

const profile = ()=>{
    return(
        <>
        <Navbar />
        <div className="container">
            <div className="row">
                <div className="col-lg-9">
                   <EditProfile />
                </div>
                <div className="col-lg-3">
                    <Suggestions />
                </div>
            </div>
        </div>      
        </>
    )
}

export default profile;