import React,{useState,useEffect} from 'react';
import './suggestions.css';
import Cookies from 'js-cookie';

const Suggestion = ()=>{
    const [data,setData] = useState([]);
    const [render,setRender] = useState(false);

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
    },[]);  

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
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
    if(!render){return <div>Loading....</div>}
    return(  
        <div className="suggestion">
        <div className="in-feed">
        <div class="flex-container justify-space">
                            <h4>Suggestions</h4>
                            <div class="search-icon ">
                                <i class="fas fa-search"></i>
                            </div>
                            </div>
        {
        data.map(item=>{
            return(
                        <>
                        <div className="flex-container">
                            <div className="contact-info">
                                <img className="contact-img" src={item.profilePic} alt="sumit" />
                                <p className="contact-name">{item.name}</p>
                            </div>
                            <button className="btn btn-primary" 
                            onClick={()=>{sendRequest(item._id)}}
                            > +Friend</button>
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