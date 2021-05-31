import React,{useState,useEffect} from 'react';
import NavBar from './navbar/navbar';
import CreatePost from '../Posts/CreatePost/createpost';
import Post from '../Post/post';
import Sidebar from './sidebar/sidebar';
import Contact from '../Home/contact/contact';
import Suggestions from '../Home/suggestion/suggestions';
import Admin from '../Admin/Admin';
import {connect} from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Home.css';


const Home = (props)=>{
  const [name,setName] = useState('');
  const [profile_pic,setPic] = useState('');
  const [email,setEmail] = useState('');
  const [designation,setDesignation] = useState('');
  const [website,setWebsite] = useState('');
  const [role,setRole] = useState('');
  const [city,setCity] = useState('');
  const [state,setState] = useState('');
  const [zipCode,setZipCode] = useState('');
  const [dob,setDOB] = useState('');
  const [fname,setFname] =useState('');
  const [lname,setLname] =useState('');
  const [noOfFriends,setNoOfFriends] = useState('');
  const userdata = {
    name,
    profile_pic,
    email,
    designation,
    website,
    role,
    noOfFriends,
    city,
    state,
    zipCode,
    dob,
    fname,
    lname
  }
    const [isChecked,setIsChecked] = useState(false);

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
          setCity(res.data.city);
          setState(res.data.state);
          setZipCode(res.data.zipCode);
          setDOB(res.data.DOB);
          setFname(res.data.fname);
          setLname(res.data.lname);
          props.updateData(userdata);
        }).catch(err=>{
          console.log(err);
        })    
      });

    return(
        <>
        <NavBar />
        <div className="parallax">
        <div className="container">
            <div className="row">
            <div className="col-lg-3">
                <Sidebar />
             </div>
            <div className="col-lg-6">
                 <CreatePost />
                 {
                     props.role==="admin" ?
                        <div className="check">
                            <label class="switch">
                                <input type="checkbox"
                                checked={isChecked}
                                onChange={(e)=>{setIsChecked(e.target.checked)}}/>
                                <span class="slider round"><span className="swtich-content">Moderate</span></span>
                            </label>
                        </div>
                :null
                 }
                 {
                     isChecked ?<Admin /> : <Post/>
                 }
            </div>
            <div className="col-lg-3">
                <Contact />
                <Suggestions/>
            </div>
            </div>
        </div>
        </div>
        </>
    );
};

const mapStateToProps = (state)=>{
    return {
      role: state.user.role
    }
  }

  const mapDispatchTOProps = (dispatch)=>{
    return {
      updateData:(userdata)=>{dispatch({type:'CHANGE_USER',payload: userdata})},
    }
  }
export default connect(mapStateToProps,mapDispatchTOProps)(Home);