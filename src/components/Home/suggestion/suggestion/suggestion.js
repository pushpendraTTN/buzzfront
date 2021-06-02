import React,{ useState } from 'react'
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Suggestion({item,addClicked}) {
    // const [clicked,setClicked] = useState(false);
    
    const sendRequest = (id)=>{

        fetch('http://localhost:8000/request',{
            method:"post",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+Cookies.get('token')
            },
            body:JSON.stringify({
                id
            })
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result);
            addClicked()
            // setClicked(true);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return (
        <>
        <div className="flex-container justify-space" key={item._id}>
            <div className="contact-info" >
                <Link to={'/view_user/'+item._id}>
                <img className="contact-img"
                src={item.profilePic}
                alt="pic" />
                </Link>
                <Link to={'/view_user/'+item._id} className="contact-name">
                <p >{item.name}</p>
                </Link>
            </div>
            <div className="contact-btn" >
            <button className="btn-our bt-primary bt-medium" id="frd-btn"
            onClick={()=>{sendRequest(item._id)}}
            > +Friend</button>
            </div>
        </div>
        </> 
    )
}
