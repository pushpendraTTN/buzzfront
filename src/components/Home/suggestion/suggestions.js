import React,{useState,useEffect} from 'react';
import './suggestions.css';
import Cookies from 'js-cookie';
import Suggest from './suggestion/suggestion'

const Suggestion = ()=>{
    const [data,setData] = useState([]);
    const [showSuggestions, setshowSuggestions] = useState({
        type: true,
        data: null
    })
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
   
    
    if(!render){return <div>Loading....</div>}

    const lm = data?.map(e=>(
        <Suggest item={e}/>
    )
    )

    const findHandler = (event)=>{
        if (event.target.value) {
            setshowSuggestions({
                type: false,
                data: false
            })
            const searchedSuggestedFriend = data.find((e) => e.name?.toLowerCase() == event.target.value || e.email?.toLowerCase() == event.target.value)
            // console.log(searchedSuggestedFriend)
            setshowSuggestions((p) => 
            ({ ...p, data: searchedSuggestedFriend ? 
                searchedSuggestedFriend : "no user found" }))
        } else {   
            setshowSuggestions({
                type: true,
                data: false
            })
        }
    }
    return(  
        <div className="suggestion">
        <div className="in-feed">
        <div className="">
                            <h4>Suggestions</h4>
                            <div className="search-icon flex-container justify-space ">
                            <input className="search" type="text" placeholder="Type to Search..." onChange={findHandler}/>              
                                <i className="fas fa-search"></i>
                            </div>
                            </div>
                            {showSuggestions.type ? lm : <Suggest item={showSuggestions.data} />}
                            </div>
    </div>
    )
}




export default Suggestion;