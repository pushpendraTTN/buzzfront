import React,{useState ,useEffect} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import './Admin.css';
import Moment from 'moment';
import {connect} from 'react-redux';

const AdminView = (props)=>{
    const [data,setData] = useState([]);
    const [render,setRender] = useState(false);

    useEffect(()=>{
        axios.get('http://localhost:8000/admin/viewallpost',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+Cookies.get('token')
            }
        }).then(result=>{
          setRender(true);
          setData(result.data.posts);
        //   console.log('data==>',data);
        }).catch(err=>{
          console.log(err);
        })    
      },[]);

      const deletePost = (postId)=>{
        fetch(`http://localhost:8000/admin/deletepost`,{
            method:"delete",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+Cookies.get('token')
            },
            body:JSON.stringify(
                {
                    postId
                }
            )
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


      const likePost = (id)=>{
        fetch('http://localhost:8000/like',{
            method:"put",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+Cookies.get('token')
            },
            body:JSON.stringify({
                postId:id
            })
        })
        .then(res=>res.json())
        .then(result=>{
            // console.log(result);
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result;
                }
                else{
                    return item;
                }
            })
            setData(newData);
        })
        .catch(err=>{
            console.log(err);
        })
      }

      const dislikePost = (id)=>{
        fetch('http://localhost:8000/dislike',{
            method:"put",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+Cookies.get('token')
            },
            body:JSON.stringify({
                postId:id
            })
        })
        .then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result;
                }
                else{
                    return item;
                }
            })
            setData(newData);
        })
        .catch(err=>{
            console.log(err);
        })
      }

      const makeComment = (text,id)=>{
        fetch('http://localhost:8000/comment',{
            method:"put",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+Cookies.get('token')
            },
            body:JSON.stringify({
                postId:id,
                text
            })
        })
        .then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result;
                }
                else{
                    return item;
                }
            })
            setData(newData);
        })
        .catch(err=>{
            console.log(err);
        })
      }

      if(!render){return <div>Loading....</div>}

      return(
        data.map(item=>{
            return(
                <>
                        <div className="post">
                        <div className="flex-container justify-space">
                            <div className="person-info">
                                <img className="post-person-img" src={item.postedBy.profilePic} alt="profile_pic" />
                        <div className="post-info">
                                    <strong>{item.postedBy.name}</strong>
                                    <p>{Moment(item.createdAt).fromNow()}</p>
                                </div>
                                </div>
                                <div className="post-option">
                                    <button className="btn btn-size" onClick={()=>{deletePost(item._id)}}>
                                    <i className="far fa-trash-alt"></i>
                                    </button>
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
                </div>

                <div className="flex-container justify-space">
                        <button className="btn btn-size" onClick={()=>{likePost(item._id)}}><i className="far fa-thumbs-up "></i> Like</button>
                        <button className="btn btn-size" onClick={()=>{dislikePost(item._id)}}><i className="far fa-thumbs-down "></i> Dislike</button>
                        <div>
                        <span>{item.reportCount}</span>  
                        <i className="fas fa-flag "></i>
                        </div>
                        
                        </div>
                        {
                            item.comments.map(record=>{
                                // console.log('record==>',record);
                                return(
                                    <div className="flex-container" key={record._id}>
                                        <div className="person-info">
                                            <img className="post-person-img"
                                            src={record.postedBy.profilePic} 
                                            alt="userProfile" />
                                        </div>
                                        <div>
                                            <p><strong>{record.postedBy.name}</strong></p>
                                            <p className="comment-data">{record.text}</p>
                                        </div>
                                     </div>
                                )
                            })
                        }
                
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        makeComment(e.target[0].value,item._id);
                        e.target[0].value="";
                    }}>
                            <div className="post">
                                    <div className="flex-container justify-space">
                                        <div className="person-info">
                                             <img className="post-person-img" 
                                             src={props.pic} 
                                             alt="profile_pic" />
                                        </div>
                                            <input type="text" class="form-control" 
                                            placeholder="Write a Comment..."/>
                                    </div>
                            </div>
                    </form>
                </div>
                </>
            ) 
        })
    );
}

const mapStateToProps = (state)=>{
    return {
      pic: state.user.pic
    }
  }
export default connect(mapStateToProps)(AdminView);