import React, { useState, useEffect } from 'react';
import '../navbar/navbar.css';
import navlogo from '../../../assests/ttn-nav-logo.jpg';
import { Link,useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import {connect} from 'react-redux';


const Navbar = (props)=>{
  const [name,setName] = useState('');
  const [profile_pic,setPic] = useState('');
  const [email,setEmail] = useState('');
  const [designation,setDesignation] = useState('');
  const [website,setWebsite] = useState('');
  const [role,setRole] = useState('');
  const [noOfFriends,setNoOfFriends] = useState('');
  // console.log(props.username);
  const userdata = {
    name,
    profile_pic,
    email,
    designation,
    website,
    role,
    noOfFriends
  }
  let history = useHistory();

  useEffect(()=>{
        axios.get('http://localhost:8000/userdetails',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+Cookies.get('token')
            }
        }).then(res=>{
          console.log(res);
          setName(res.data.name);
          setPic(res.data.pic);
          setEmail(res.data.email);
          setDesignation(res.data.designation);
          setWebsite(res.data.website);
          setRole(res.data.role);
          setNoOfFriends(res.data.friends);
          props.updateData(userdata);
        }).catch(err=>{
          console.log(err);
        })    
      });

      const clear = ()=>{
        // console.log('logout clicked');
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
                    <img className="navbar-profile-img" src={profile_pic} alt="profile-pic"/>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">{name}</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link " to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fas fa-ellipsis-v"></i>
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link className="dropdown-item" to="/notification">Notification</Link></li>
                  <li><Link className="dropdown-item" 
                  // to="/logout" 
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
    username: state.user.name
  }
}

const mapDispatchTOProps = (dispatch)=>{
  return {
    updateData:(userdata)=>{dispatch({type:'CHANGE_USER',payload: userdata})},
  }
}

export default connect(mapStateToProps,mapDispatchTOProps)(Navbar);