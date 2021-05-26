import React from 'react';
import {BrowserRouter,Route} from "react-router-dom";
import './App.css';
import Login from "./components/Login/login";
import Home from './components/Home/Home';
import Profile from './components/Profile/profile';
import Notification from './components/notification/notification';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Route  exact path="/" component={Login}/>
      <Route path="/feed" component={Home}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/logout" component={Login}/>
      <Route path="/notification" component={Notification}/>
      </BrowserRouter>
    </div>
  );
}

export default App ;