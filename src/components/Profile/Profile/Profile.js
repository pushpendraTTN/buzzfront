import React,{useState,useEffect} from 'react';
import EditProfile from '../editprofile/editProfile';
import axios from 'axios';
import Cookies from 'js-cookie';
import {connect} from 'react-redux';

const Profile = (props)=>{
    const [data,setData] = useState([]);
    const [render,setRender] = useState(false);

    useEffect(()=>{
            axios.get('http://localhost:8000/mypost',{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+Cookies.get('token')
                }
            }).then(result=>{
              setRender(true);
              setData(result.data.mypost);
              console.log('data==>',data);
            }).catch(err=>{
              console.log(err);
            })    
        },[])

        const deletePost = (postid)=>{
            fetch(`http://localhost:8000/deletepost/${postid}`,{
                method:"delete",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+Cookies.get('token')
                }
            })
            .then(res=>res.json())
            .then(result=>{
                console.log(result);
                const newData = data.filter(item=>{
                    return item._id !== result._id
                })
                setData(newData);
            })
            .catch(err=>{
                console.log(err);
            })
          }
          
      if(!render){return <div>Loading....</div>}

    return(
        <>
        <div className="view-profile user">
                    <div className="cover-pic"></div>
                    <div className="profile-details">
                        <div className="profile-pic">
                            <img src={props.pic} alt="name"/>
                        </div>
                        <div className="profile-info">
                            <h2>{props.username}</h2>
                            <span><strong>Email: </strong>{props.email}</span>
                        </div>
                    </div>
                 </div>  
                   <EditProfile />
                    {data.map(item=>{
                        return(
                            <div className="post" key={item._id}>
                                <div className="flex-container justify-space">
                                    <div className="person-info">
                                        <img className="post-person-img" 
                                        src={item.postedBy.profilePic} 
                                        alt="profile_pic" />
                                    <div className="post-info">
                                        <strong>{item.postedBy.name}</strong>
                                        <p>{item.createdAt}</p>
                                    </div>
                                    </div>
                                </div>
                                <p>{item.body}</p>
                                <img className="post-img" src={item.photo} alt="" />
                                <div className="flex-container justify-space">
                                <div className="like-info ">
                                <i className="far fa-thumbs-up like"></i>
                                <span>{item.likes.length}</span>
                                <i className="far fa-thumbs-down dislike"></i>
                                <span>{item.dislikes.length}</span>
                            </div>
                            <div>
                                <span>{item.comments.length}</span>
                                <i className="far fa-comment comment"></i>
                            </div>
                            <div></div>
                            </div>
                            </div>
                        )
                    })}
                </>                    
    )
}

const mapStateToProps = (state)=>{
    return {
      username: state.user.name,
      pic: state.user.pic,
      designation: state.user.designation,
      email: state.user.email
    }
  }
  
export default connect(mapStateToProps)(Profile);