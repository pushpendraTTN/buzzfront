import React,{useEffect,useState} from 'react';
import {Route,Switch,useHistory} from "react-router-dom";
import './App.css';
import Login from "./components/Login/login";
import Home from './components/Home/Home';
import Profile from './components/Profile/profile';
import Notification from './components/notification/notification';
import ViewOtherUser from './components/Profile/otherUserProfile';
import ContactProfile from './components/Profile/Contact-Profile/contactProfile';
import {connect} from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';

const App = (props)=> {
  const [user,setUser] = useState({});
  const [isAuth,setIsAuth] = useState(false);
  const token = Cookies.get('token');

  useEffect(()=>{
    axios.get('http://localhost:8000/userdetails',{
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+Cookies.get('token')
        }
    }).then(res=>{
      console.log(res);
      setUser(res.data);
      
    }).catch(err=>{
      console.log(err);
    })    
  },[]);

  useEffect(() => {
    props.updateData(user);
    props.updateToken(token);
  },[user])

  const Routing = ()=>{
    const history = useHistory();
    useEffect(() => {
      if(token){
        setIsAuth(true);
        history.push('/feed');
      }
      else{
        history.push('/');
      }
     }, [])
    return(
      <Switch>
      <Route  exact path="/" component={Login}/>
      <Route path="/feed" component={Home}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/logout" component={Login}/>
      <Route path="/notification" component={Notification}/>
      <Route path="/view_user/:userid" component={ViewOtherUser}/>
      <Route path="/contact-profile/:contact_id" component={ContactProfile}/>
      </Switch>
    )
  }
  return (
    <div className="App">
      <Routing />
      {/* <Route  exact path="/" component={Login}/>
      <Route path="/feed" component={Home}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/logout" component={Login}/>
      <Route path="/notification" component={Notification}/>
      <Route path="/view_user/:userid" component={ViewOtherUser}/>
      <Route path="/contact-profile/:contact_id" component={ContactProfile}/> */}
    </div>
  );
}

const mapStateToProps = (state)=>{
  return {
    role: state.user.user.role,
    verifytoken: state.verifyUser.token
  }
}
const mapDispatchTOProps = (dispatch)=>{
  return {
    updateData:(user)=>{dispatch({type:'FETCH_USER',payload: user})},
    updateToken:(token)=>{dispatch({type:'STORE_TOKEN',payload: token})},
  }
}

export default connect(mapStateToProps,mapDispatchTOProps)(App) ;
