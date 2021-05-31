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
                        <p><strong>{props.email}</strong></p>
                        <strong className="profile-name">{props.designation}</strong>
                        <p><strong className="profile-name">{props.website}</strong></p>
                        <div className="flex-container">
                          <div className="profile-view">
                            <strong>220</strong>
                            <p>Profile Views</p>
                          </div>
                          <div className="post-details">
                          <strong>{props.friends}</strong>
                          <p>Friends</p>
                          </div>
                      </div>
                    </div>
                    </div>
                </div>
    )
}

const mapStateToProps = (state)=>{
    return {
      username: state.user.user.name,
      pic: state.user.user.pic,
      email: state.user.user.email,
      designation: state.user.user.designation,
      website: state.user.user.website,
      friends: state.user.user.friends
    }
  }

export default connect(mapStateToProps)(sidebar);