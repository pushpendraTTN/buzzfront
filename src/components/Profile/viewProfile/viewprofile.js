import React,{useState,useEffect} from 'react';
import './viewprofile.css';
import Cookies from 'js-cookie';
import {useParams} from 'react-router-dom';

const Viewprofile=()=>{
    const {userid} = useParams();
    const [userdata,setUserData] = useState(null);

    useEffect(()=>{
        fetch('http://localhost:8000/viewuserdetails',{
            method:"post",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+Cookies.get('token')
            },
            body:JSON.stringify({
                userid
            })
        })
        .then(res=>res.json())
        .then(result=>{
            console.log('viewuserdetails===>',result);
            setUserData(result.data[0]);
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);

    console.log('userdata==>',userdata);
    return(
        <>
        {
            userdata?
                    <div className="view-profile user">
                    <div className="cover-pic"></div>
                    <div className="profile-details">
                        <div className="profile-pic">
                            <img src={userdata.profilePic} alt="name"/>
                        </div>
                        <div className="profile-info">
                            <h2>{userdata.name}</h2>
                            <p>Worked As {userdata.designation}</p>
                            <span>Email:{userdata.email}</span>
                            <span>Lived In {userdata.city}</span>
                            <span>{userdata.state}</span>
                            <span>{userdata.friends.length} Friends</span>
                            <div>
                            <button className="btn-our bt-primary"><i className="fas fa-user-plus"></i> Add Friend</button>
                            <button className="btn-our outline-primary"><i className="fas fa-share-square"></i> Visit Website</button>
                            </div>
                        </div>
                    </div>
                 </div>  
            :
                <h2>Loading.....</h2>
        }
       </>
    )
}


export default Viewprofile;