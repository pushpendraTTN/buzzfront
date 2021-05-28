import React,{useState} from 'react';
import NavBar from './navbar/navbar';
import CreatePost from '../Posts/CreatePost/createpost';
import Post from '../Post/post';
import Sidebar from './sidebar/sidebar';
import Contact from '../Home/contact/contact';
import Suggestions from '../Home/suggestion/suggestions';
import Admin from '../Admin/Admin';
import {connect} from 'react-redux';
import './Home.css';

const Home = (props)=>{
    const [isChecked,setIsChecked] = useState(false);
    return(
        <>
        <NavBar />
        <div className="parallax">
        <div className="container">
            <div className="row">
            <div className="col-lg-3">
                <Sidebar />
             </div>
            <div className="col-lg-6">
                 <CreatePost />
                 {
                     props.role==="admin" ?
                        <div className="form-check">
                        <input type="checkbox" class="form-check-input"
                        checked={isChecked}
                        onChange={(e)=>{setIsChecked(e.target.checked)}}
                        />
                        <label className="label info">Moderate Mode</label>
                        </div>
                :<Post />
                 }
                 {
                     isChecked?<Admin />:<Post />
                 }
{/*                  
                 <Moderate ischecked={isChecked}/>
                 {
                     (isChecked)?<Admin/>:<Post/>
                 } */}
                 {/* <Post /> */}
            </div>
            <div className="col-lg-3">
                <Contact />
                <Suggestions/>
            </div>
            </div>
        </div>
        </div>
        </>
    );
};

const mapStateToProps = (state)=>{
    return {
      role: state.user.role
    }
  }
export default connect(mapStateToProps)(Home);