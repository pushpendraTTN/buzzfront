import React,{useState,useEffect} from 'react';
import './contact.css';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom'
const Contact=()=>{
    const [data,setData] = useState([]);
    const [render,setRender] = useState(false);

    useEffect(()=>{
            fetch('http://localhost:8000/user/contacts',{
                method:"get",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+Cookies.get('token')
                },
            })
            .then(res=>res.json())
            .then(result=>{
                console.log(result);
                setRender(true);
                setData(result.result.friends);
            })
            .catch(err=>{
                console.log(err);
            })
    },[]);
    
    if(!render){return <div>Loading....</div>}
    return(
        <div className="contact">
            <div className="in-feed">
            <div className="flex-container justify-space">
                            <h4>Contact</h4>
                            <div className="search-icon ">
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
        {
            data.map((item)=>{
                return(
                            <div key={item._id}>
                             <div className="flex-container">
                                <Link to={'/contact-profile/'+item._id}><img className="contact-img" 
                                src={item.profilePic} alt="user name" />
                                </Link>
                                <Link to={'/contact-profile/'+item._id} className="contact-name">
                                <p >{item.name}</p>
                                </Link>
                            </div>
                            </div>
                 )
            
            })
        }
        </div>
        </div>
    )
}

export default Contact;