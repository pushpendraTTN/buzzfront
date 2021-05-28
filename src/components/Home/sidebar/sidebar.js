import React from 'react';
import './sidebar.css';
import {connect} from 'react-redux';

const sidebar = (props)=>{
    return(
        
                <div className=" profile ">
                    <div className="in-feed">
                    <div className="bg-purple"></div>
                    <div className="feed-profile">
                        <img className="feed-profile-img" src={props.pic} alt="" />
                        <h4 className="profile-name">{props.username}</h4>
                        <p>{props.email}</p>
                        <h5 className="profile-name">{props.designation}</h5>
                        <h5 className="profile-name">{props.website}</h5>
                    </div>
                    </div>
                </div>
    )
}

const mapStateToProps = (state)=>{
    return {
      username: state.user.name,
      pic: state.user.pic,
      email: state.user.email,
      designation: state.user.designation,
      website: state.user.website
    }
  }

export default connect(mapStateToProps)(sidebar);