import React,{useState,useEffect} from 'react';
import './contact.css';
import Cookies from 'js-cookie';

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
                            <div class="search-icon ">
                                <i class="fas fa-search"></i>
                            </div>
                        </div>
        {
            data.map((item)=>{
                return(
                                <div>
                             <div className="flex-container">
                                <img className="contact-img" src={item.profilePic} alt="user name" />
                                <p className="contact-name" >{item.name}</p>
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