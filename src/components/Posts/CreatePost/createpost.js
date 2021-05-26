import React,{useState,useEffect} from 'react';
import  './createpost.css';
import Cookies from 'js-cookie';
import axios from 'axios';

const CreatePost = ()=>{
    const [body,setBody] = useState('');
    const [image,setImage] = useState('');
    const [url,setUrl] = useState('');

    useEffect(()=>{
        if(url){
            var data ={
                body,
                url
            }
            var header = {
                'Authorization':'Bearer '+Cookies.get('token')
            }
            axios.post('http://localhost:8000/createpost',
               data,{headers:header})
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
            })
            .catch(err=>{
            console.log(err);
        })
    }
},[url])

    const postImage = ()=>{
        const data = new FormData();
        data.append("file",image);
        data.append("upload_preset","buzzApp");
        data.append("cloud_name","buzzimagecloud");
        console.log(Cookies.get('token'));
        fetch('https://api.cloudinary.com/v1_1/buzzimagecloud/image/upload',{
            method:'post',
            body:data
            })
            .then(res=>res.json())
            .then(data=>{
                setUrl(data.url);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    return(
        
                    <div className="post">
                        <h4>Create Post</h4>
                        <textarea id="#" name="#" value={body} rows="2" cols="50" className="post-textarea" 
                        placeholder="What's On Your Mind..." 
                        onChange={(e)=>{setBody(e.target.value)}}></textarea>
                        <div className="button-div">
                            <input type="file"  className=" btn btn-post btn-size" 
                            onChange={(e)=>{setImage(e.target.files[0])}} />
                            <button  className="btn btn-post btn-size" onClick={()=>postImage()}>Post</button>
                        </div>
                    </div>
    )
 }


export default CreatePost;