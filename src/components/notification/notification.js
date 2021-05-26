import React,{useState,useEffect} from 'react';
import Cookies from 'js-cookie';
import Navbar from '../Home/navbar/navbar';
import './notification.css';
import AdminView from '../Admin/Admin';


const Notify = ()=>{
    const [data,setData] = useState([]);
    const [render,setRender] = useState(false);

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
},[]);  

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
        })
        .catch(err=>{
            console.log(err);
        })
    }

    if(!render){return <div>Loading....</div>}

    return(<>
        <Navbar />
        {
        data.map(item=>{
            return(
                     <>
                        <div className="container">
                            <div className="notification in-feed">
                                <div className="flex-container justify-space">
                                    <div>
                                        <img src={item.profilePic} alt="sumit" />
                                        <span>{item.name} sent You a Friend Request.</span>
                                </div>
                                <button className="btn btn-post btn-primary btn-size"
                                onClick={()=>{acceptRequest(item._id)}}
                                >Accept</button>
                            </div>
                        </div>
                    </div>
                    </> 
            )
        })
    }
    <AdminView />
    </>
    )
}

export default Notify;