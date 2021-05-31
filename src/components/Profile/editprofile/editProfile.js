import React,{ useEffect, useState} from 'react';
import './editProfile.css';
import Cookies from 'js-cookie';
import {connect} from 'react-redux';
import axios from 'axios';

const Edit = (props)=>{
    console.log('designation ===>',props.designation);
    const [data,setData] = useState([]);
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState(props.name);
    const [myWebsite,setWebsite] = useState('');
    const [gender,setGender] = useState('');
    const [designation,setDesignation] = useState(props.designation);
    const [DOB,setDob] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [zipCode,setZip] = useState('');
    const [isEdit,setIsEdit] = useState(false);
    
    useEffect(() => {
        setFirstName(props.fname);
        setLastName(props.lname);
        setWebsite(props.mywebsite);
        setGender(props.gender);
        setCity(props.city);
        setState(props.State);
        setZip(props.zipCode);
        setDob(props.dob);

    }, [props])
    useEffect(()=>{
        axios.get('http://localhost:8000/viewloggedInuserDetails',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+Cookies.get('token')
            }
        }).then(result=>{
          setData(result.data);
        //   console.log('data==>',data);
        }).catch(err=>{
          console.log(err);
        })    
      },[]);

    const postData = (firstName,lastName,designation,myWebsite,gender,DOB,city,state,zipCode)=>{
        fetch('http://localhost:8000/update_profile',{
            method:"post",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+Cookies.get('token')
            },
            body:JSON.stringify({
                firstName,
                lastName,
                designation,
                myWebsite,
                gender,
                DOB,
                city,
                state,
                zipCode 
            })
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result);
            setIsEdit(false);
        })
        .catch(err=>{
            console.log(err);
        })
      }

      
    return(
                <div className="in-feed">
                <div className="check edit">
                     <label class="switch">
                         <input type="checkbox"
                         checked={isEdit}
                         onChange={(e)=>{setIsEdit(e.target.checked)}}/>
                         <span class="slider round"><span className="swtich-content">Edit Profile</span></span>
                     </label>
                    </div>
                {
                    isEdit?
                    <div className="edit-profile">
                    <form action="#" onSubmit={(e)=>{
                            e.preventDefault();
                            }}>
                        <label for="firstname">First Name</label>
                        <label for="lastname">Last Name</label>
                        <input type="text" placeholder={firstName} id="firstname" 
                        value={firstName}
                        onChange={(e)=>setFirstName(e.target.value)}
                        />
                        <input type="text" placeholder="Last Name" id="lastname"
                        value={lastName}
                        onChange={(e)=>setLastName(e.target.value)}
                        />
    
                        <label htmlFor="designation">Designation</label>
                        <label htmlFor="mywebsite">My Website</label>
                        <input type="text" placeholder="designation" id="designation" 
                        value={designation}
                            onChange={(e)=>setDesignation(e.target.value)} />
                        <input type="text" placeholder="sarahwood.org" id="mywebsite" 
                        value={myWebsite}
                            onChange={(e)=>setWebsite(e.target.value)}
                        />
                        <label htmlFor="gender">Gender</label>
                        <label htmlFor="birthday">Birthday</label>
                        <input type="text" id="gender"  
                        value={gender}
                            onChange={(e)=>setGender(e.target.value)}
                        />
                        <input type="text" placeholder="MM/DD/YYYY" id="birthday" 
                         value={DOB}
                            onChange={(e)=>setDob(e.target.value)}
                        />
                        <label htmlFor="city">City</label>
                        <label id="State-id" for="State">State</label>
                        <label id="zip-id" for="zip">Zip</label>
                        <input type="text" placeholder="City" id="city" 
                         value={city}
                            onChange={(e)=>setCity(e.target.value)}
                        />
                        <input type="text"  placeholder="Delhi" id="State" 
                         value={state}
                            onChange={(e)=>{setState(e.target.value)}}
                        />
                        <input type="text" placeholder="201310"  id="zip" 
                         value={zipCode}
                            onChange={(e)=>setZip(e.target.value)}
                        />

                        <button className="btn btn-primary btn-lg"
                            onClick={()=>{
                                    postData(firstName,
                                        lastName,
                                        designation,
                                        myWebsite,
                                        gender,
                                        DOB,
                                        city,
                                        state,
                                        zipCode )
                                }} 
                            >Save</button>
                        <button className="btn btn-outline-primary btn-lg">Reset All</button>
                    </form>
                    </div> :
                    null
                }
             </div>
    )
}


const mapStateToProps = (state)=>{
    return {
      pic: state.user.pic,
      name: state.user.name,
      designation: state.user.designation,
      fname:state.user.fname,
      lname:state.user.lname,
      gender:state.user.gender,
      mywebsite:state.user.website,
      city:state.user.city,
      State:state.user.state,
      zipCode:state.user.zip,
      dob:state.user.dob
    }
  }

export default connect(mapStateToProps)(Edit);