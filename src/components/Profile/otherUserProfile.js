import React from 'react';
import Navbar from '../Home/navbar/navbar';
import ViewProfile from './viewProfile/viewprofile';
import Suggestions from '../Home/suggestion/suggestions';

const viewOthersProfile = ()=>{
    return(
        <>
        <Navbar />
        <div className="parallax">
        <div className="container">
            <div className="row">
                <div className="col-lg-9">
                   <ViewProfile />
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

export default viewOthersProfile;