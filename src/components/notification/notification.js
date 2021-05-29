import React,{useState,useEffect} from 'react';
import Cookies from 'js-cookie';
import Navbar from '../Home/navbar/navbar';
import './notification.css';

const Notify = ()=>{
    const [data,setData] = useState([]);
    const [render,setRender] = useState(false);
    const [isClicked,setIsClicked] = useState(false);

    useEffect(()=>{
        fetch('http://localhost:8000/notifications',{
            method:"get",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+Cookies.get('token')
            },
        })
        .then(res=>res.json())
        .then(result=>{
            //console.log(result);
            setRender(true);
            setData(result.result.received);
        })
        .catch(err=>{
            console.log(err);
        })
},[isClicked]);  

    const acceptRequest = (id)=>{
        fetch('http://localhost:8000/accept',{
            method:"put",
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
            setIsClicked(true);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    if(!render){return <div>Loading....</div>}

    return(<>
        <Navbar />
        <div className="parallax notification-wrapper">
        <div className="container">     
                            <div className="notification in-feed">
        {
            
        data.map(item=>{
            return(
                     <>
                                <div className="flex-container justify-space">
                                    <div>
                                        <img className="contact-img" src={item.profilePic} alt="pic" />
                                        <span><strong>{item.name}</strong> Sent you a Friend Request.</span>
                                     </div>
                                    <div>
                                        <button className="btn-our bt-primary bt-medium"
                                        onClick={()=>{acceptRequest(item._id)}}
                                        >Accept</button>
                                    </div>
                            </div>
                    </> 
            )
        })
    }
    </div>
    </div>
    </div>
    </>
    )
}

export default Notify;