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
                {
                    return(
                        <div class="alert alert-success" role="alert">Sucessfully Created.</div>
                    )
                }

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
                                <div  className="image-file btn-our bt-primary">
                                    <label htmlFor="image_src" className="uplaod-file-icon"><i className="fas fa-image " ></i></label>
                                    <input type="file"  id="image_src"  onChange={(e)=>{setImage(e.target.files[0])}} />
                                    <span id="display-img">{image.name}</span>
                                </div>
                            <div>
                            <button  className="btn-our bt-primary" onClick={()=>postImage()}>Post</button>
                            </div>
                        </div>
                    </div>
    )
 }


export default CreatePost;