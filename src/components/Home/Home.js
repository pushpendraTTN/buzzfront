import React from 'react';
import NavBar from './navbar/navbar';
import CreatePost from '../Posts/CreatePost/createpost';
import Post from '../Post/post';
import Sidebar from '../Home/sidebar';
import Contact from '../Home/contact';
import Suggestions from '../Home/suggestions';

const Home = ()=>{

    return(
        <>
        <NavBar />
        <div className="container">
            <div className="row">
            <div className="col-lg-3">
                <Sidebar />
             </div>
            <div className="col-lg-6">
                 <CreatePost />
                 <Post />
            </div>
            <div className="col-lg-3">
                <Contact />
                <Suggestions/>
            </div>
            </div>
        </div>
        </>
    );
};

export default Home;