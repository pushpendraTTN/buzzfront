import React, { useState, useEffect } from 'react';
import '../navbar/navbar.css';
import navlogo from '../../../assests/ttn-nav-logo.jpg';
import { Link,useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import Cookies from 'js-cookie';

const Navbar = (props)=>{

  let history = useHistory();;

      const clear = ()=>{
        Cookies.remove('token');
        history.push('/');
      }
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/feed"><img className="logo" src={navlogo} alt="logo"/></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                    <img className="navbar-profile-img" src={props.pic} alt="profile-pic"/>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">{props.username}</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link " to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fas fa-ellipsis-v"></i>
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link className="dropdown-item" to="/notification">Notification</Link></li>
                  <li><Link className="dropdown-item" 
                  onClick={()=>{clear()}}
                  >Logout</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
};

const mapStateToProps = (state)=>{
  return {
    username: state.user.name,
    pic: state.user.pic
  }
}

export default connect(mapStateToProps)(Navbar);