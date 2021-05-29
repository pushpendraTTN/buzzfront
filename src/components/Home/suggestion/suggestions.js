import React,{useState,useEffect} from 'react';
import './suggestions.css';
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";

const Suggestion = ()=>{
    const [data,setData] = useState([]);
    const [render,setRender] = useState(false);
    const [clicked,setClicked] = useState(false);

    useEffect(()=>{
            fetch('http://localhost:8000/user/suggestions',{
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
                setData(result.sugg);
            })
            .catch(err=>{
                console.log(err);
            })
    },[clicked]);  
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
            setClicked(true);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
    if(!render){return <div>Loading....</div>}
    return(  
        <div className="suggestion">
        <div className="in-feed">
        <div className="flex-container justify-space">
                            <h4>Suggestions</h4>
                            <div className="search-icon ">
                                <i className="fas fa-search"></i>
                            </div>
                            </div>
        {
        data.map(item=>{
            return(
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
        })
    }
    </div>
    </div>
    )
}




export default Suggestion;