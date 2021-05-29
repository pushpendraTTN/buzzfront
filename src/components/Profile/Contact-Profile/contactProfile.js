import React,{useState,useEffect} from 'react';
import Cookies from 'js-cookie';
import {useParams} from 'react-router-dom';
import Navbar from '../../Home/navbar/navbar';
import Contact from '../../Home/contact/contact';
import Suggestion from '../../Home/suggestion/suggestions';

const ContactProfile=()=>{
    const {contact_id} = useParams();
    const [userdata,setUserData] = useState(null);
    const [contactPost,setContactPost] = useState([]);
    // const [render,setRender] = useState(false);

    useEffect(()=>{
        fetch('http://localhost:8000/viewContactDetails',{
            method:"post",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+Cookies.get('token')
            },
            body:JSON.stringify({
                contact_id
            })
        })
        .then(res=>res.json())
        .then(result=>{
            console.log('viewuserdetails===>',result);
            setUserData(result.data[0]);
            // setRender(true);
        })
        .catch(err=>{
            console.log(err);
        })
    },[contact_id]);

    // useEffect(()=>{
    //     fetch('http://localhost:8000/contactPost',{
    //         method:"post",
    //         headers:{
    //             "Content-Type":"application/json",
    //             "Authorization":"Bearer "+Cookies.get('token')
    //         },
    //         body:JSON.stringify({
    //             contact_id
    //         })
    //     })
    //     .then(res=>res.json())
    //     .then(result=>{
    //       console.log('contactpostdata result==>',result);
    //       setContactPost(result.mypost);
    //       console.log('contactpostdata==>',contactPost);
    //     }).catch(err=>{
    //       console.log(err);
    //     })    
    // },[render])

    // console.log('userdata==>',userdata);
    return(
        <>
        <Navbar />
        <div className="parallax">
        <div className="container">
        <div className="row">
            <div className="col-lg-9">
        {
            userdata?
                    <div className="view-profile user">
                    <div className="cover-pic"></div>
                    <div className="profile-details">
                        <div className="profile-pic">
                            <img src={userdata.profilePic} alt="name"/>
                        </div>
                        <div className="profile-info">
                            <h2>{userdata.name.toUpperCase()}</h2>
                            <p><strong>{userdata.role.toUpperCase()}</strong> </p>
                            <span><strong>{userdata.email} </strong></span>
                            <span><strong>{userdata.city}</strong> </span>
                            <span>{userdata.state}</span>
                            <span><strong>{userdata.friends.length} Friends</strong></span>
                        </div>
                    </div>
                   
                 </div>  
            :
                <h2>Loading.....</h2>
        }
                 </div>
                 <div className="col-lg-3">
                    <Contact />
                    <Suggestion />
                </div>
                 </div>
                 </div>
                 </div>
                
       </>
    )
}


export default ContactProfile;