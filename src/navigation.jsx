import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './navigation.css'
import logo from './palabra_2.JPG';
import logo_ from './palabra_logo.JPG';

const Navigation = () => {
  const [status, setStatus] = useState('Login');
  const [email, setEmail] = useState('User');
  const navigate = useNavigate();
  const [user,setUser] = useState('');


  useEffect(() => {
    axios.post('https://soccerteam-953874d541a4.herokuapp.com/currentSession', {}, { withCredentials: true })
      .then((response) => {
        if (response.data.email) {
          setEmail(response.data.email);
          setStatus('Logout');
        } else {
          setStatus('Login');
          setEmail('N/A');
        }
      })
      .catch(error => console.log(error));
     axios.get(`https://soccerteam-953874d541a4.herokuapp.com/checkAdmin/${email}`, { withCredentials: true })
      .then((response) => {
        setUser(response.data);
       // console.log("User data:", user);
        //console.log("Email:", user.email);
        //console.log("Name:", user.name);
      })
      .catch(error => console.log(error));



  }, [email, user]);

  const deter = (condition)=>{
    if(condition===true){
      navigate('/adminRoster');
    }
  else{
    navigate('/roster');
  }
}
const buttonStatus = (a)=>{
  if(a==='Logout'){

  }
  else{
   navigate('/login');
  }
}

  return (
    <div className="nav">
      <img src={logo_} alt="Logo" className="nav_logo" />
      <div className="nav_links">
        <a className="nav-link" onClick={() => navigate('/')}>Home</a>
        <a className="nav-link" onClick={() => deter(user.admin)}>Roster</a>
        <a className="nav-link" onClick={() => navigate('/shop')}>Shop</a>
        <a className="nav-link" onClick={() => navigate('/news')}>News</a>
        <a className="nav-link" onClick={() => navigate('/about')}>About</a>
        <a className="nav-link" onClick={() => navigate('/formation')}>Formation</a>

            <button className="log_" onClick={() => buttonStatus(status)}>{status}</button>
      </div>
    
     
    </div>
  );
}

export default Navigation;
