import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate,Outlet } from 'react-router-dom';
import axios from 'axios'
import "./signup.css";
import Navigation from "./navigation";
const Signup = ()=>{
const navigate = useNavigate();
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const [name,setName] = useState('');
const [adminCode,setAdminCode] = useState('');
const [admin, setAdmin] = useState(false);
const [message,setMessage] = useState('');
var status = false;

const register = ()=>{
if(email===''||password===''||name===''){
	setMessage('All fields are required besides "Admin"');
}

else{

	  console.log("Admin code:", adminCode); // Add this line
	if(adminCode==='XyZ987$%'){
		//setAdmin(true);
		status = true
	}
	else{
		setAdmin(false);
		status = false;
	}
	  console.log("Admin status:", admin);
	axios.post("http://localhost:3001/signup",{email:email, password:password,name:name, admin: status},{withCredentials:true}).then((response)=>{
          console.log(response)
          if(response.data.message==='exist'){
          	setMessage('Error, This email has been used already');
          }
          else {
      console.log("your account has been registered");
      setMessage('Your Account has been registered');}
	}).catch(error=>{
		console.log(error);
	});

}
}
const determine = ()=>{
	

	register();
}

	return(<>
<Navigation/>
<div class = "signup_container">
<h1 class = 'signup-text'>This is the sign up page</h1>
  <div  class = 'signup'>
  <label class = 'email-space'>Email: </label>
  <input class = 'email-space'type = "text" onChange = {(e)=>{setEmail(e.target.value)}}/>
  <br/>
  <label class = 'password-space'> Password:</label>
  <input class = 'password-space' type = "password" onChange= {(e)=>{setPassword(e.target.value)}}/> 
  <br/>
  <label class = 'name-space'>Name :</label>
  <input class = 'name-space' type = "text" onChange = {(e)=>{setName(e.target.value)}}/> 
   <br/>
  <label class = 'admin-space'>Admin Access Code (can be left empty):</label>
  <input class = 'admin-space' type = "text" onChange = {(e)=>setAdminCode(e.target.value)}/>
  <br/>
  <button class = 'btn btn-success'onClick = {register}>Register</button>
  <br/>
  <button  class = 'goToLogin'onClick = {()=>navigate('/login')}>Go To Login</button>
  <br/>
  <label class = 'signup-message'>{message}</label>
</div>
</div>
		</>)
}
export default Signup;