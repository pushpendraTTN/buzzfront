import React,{ useState} from 'react';
import './editProfile.css';
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
    const [isEdit,setIsEdit] = useState(false);

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
            setIsEdit(false);
        })
        .catch(err=>{
            console.log(err);
        })
      }

      
    return(
        <div className="view-profile">
            <div className="profile-details">
                <div className="profile-info">
                {
                    isEdit?
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
    
                        <label htmlFor="designation">Designation</label>
                        <label htmlFor="mywebsite">My Website</label>
                        <input type="text" placeholder="designation" id="designation" 
                            onChange={(e)=>{setDesignation(e.target.value)}} />
                        <input type="text" placeholder="sarahwood.org" id="mywebsite" 
                            onChange={(e)=>{setWebsite(e.target.value)}}
                        />
                        <label htmlFor="gender">Gender</label>
                        <label htmlFor="birthday">Birthday</label>
                        <input type="text" id="gender" 
                            onChange={(e)=>{setGender(e.target.value)}}
                        />
                        <input type="text" placeholder="MM/DD/YYYY" id="birthday" 
                            onChange={(e)=>{setDob(e.target.value)}}
                        />
                        <label htmlFor="city">City</label>
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
                    </div> :
                    <div className="form-check">
                    <input type="checkbox" class="form-check-input"
                    checked={isEdit}
                    onChange={(e)=>{setIsEdit(e.target.checked)}}
                    />
                    <label className="label info">Edit Profile</label>
                    </div>
                }
            </div>
        </div>
    </div>
    )
}


const mapStateToProps = (state)=>{
    return {
      pic: state.user.pic,
      name: state.user.name
    }
  }

export default connect(mapStateToProps)(Edit);