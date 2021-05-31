import React,{useState,useEffect} from 'react';
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
                        <div className="check">
                            <label class="switch">
                                <input type="checkbox"
                                checked={isChecked}
                                onChange={(e)=>{setIsChecked(e.target.checked)}}/>
                                <span class="slider round"><span className="swtich-content">Moderate</span></span>
                            </label>
                        </div>
                :null
                 }
                 {
                     isChecked ?<Admin /> : <Post/>
                 }
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
      role: state.user.user.role
    }
  }

export default connect(mapStateToProps)(Home);