import React,{ useState} from 'react';
import './editprofile.css';
import Cookies from 'js-cookie';
import {connect} from 'react-redux';


const Edit = (props)=>{
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [myWebsite,setWebsite] = useState('');
    const [gender,setGender] = useState('');
    const [designation,setDesignation] = useState('');
    const [DOB,setDob] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [zipCode,setZip] = useState('');

    const postData = (firstName,lastName,designation,myWebsite,gender,DOB,city,state,zipCode)=>{
        console.log('fname',firstName);
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
        })
        .catch(err=>{
            console.log(err);
        })
      }

    return(
        <div className="view-profile">
        <div className="cover-pic"></div>
        <div className="profile-details">
            <div className="profile-pic">
                <img src={props.pic} alt="profile_pic" />
                <i className="fas fa-camera fa-2x add-img-icon"></i>
            </div>
            <div className="profile-info">
                <h2>{props.name}</h2>

                <div className="edit-profile">
                <form action="#" onSubmit={(e)=>{
                    e.preventDefault();
                }}>
                    <label for="firstname">First Name</label>
                    <label for="lastname">Last Name</label>
                    <input type="text" placeholder="First Name" id="firstname" 
                    onChange={(e)=>{setFirstName(e.target.value)}}
                    />
                    <input type="text" placeholder="Last Name" id="lastname"
                    onChange={(e)=>{setLastName(e.target.value)}}
                    />

                    <label for="designation">Designation</label>
                    <label for="mywebsite">My Website</label>
                        {/* <select name="designation" id="designation">  
                            <option value="Co-founder">Co-founder</option>
                            <option value="CEO">CEO</option>
                            <option value="Trainee">Trainee</option>
                            <option value="HR">HR</option>
                        </select> */}
                        <input type="text" placeholder="designation" id="designation" 
                        onChange={(e)=>{setDesignation(e.target.value)}} />
                    <input type="text" placeholder="sarahwood.org" id="mywebsite" 
                    onChange={(e)=>{setWebsite(e.target.value)}}
                    />

                    <label for="gender">Gender</label>
                    <label for="birthday">Birthday</label>
                    <input type="text" id="gender" 
                    onChange={(e)=>{setGender(e.target.value)}}
                    />
                    <input type="text" placeholder="MM/DD/YYYY" id="birthday" 
                    onChange={(e)=>{setDob(e.target.value)}}
                    />

                    <label for="city">City</label>
                    <label id="State-id" for="State">State</label>
                    <label id="zip-id" for="zip">Zip</label>
                    <input type="text" placeholder="City" id="city" 
                    onChange={(e)=>{setCity(e.target.value)}}
                    />
                    <input type="text"  placeholder="Delhi" id="State" 
                    onChange={(e)=>{setState(e.target.value)}}
                    />
                    <input type="text" placeholder="201310"  id="zip" 
                    onChange={(e)=>{setZip(e.target.value)}}
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
                </div> 
            </div>
        </div>
    </div>
    )
}


const mapStateToProps = (state)=>{
    return {
      pic: state.pic,
      name: state.name
    }
  }

export default connect(mapStateToProps)(Edit);