import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate,Outlet } from 'react-router-dom';
import axios from 'axios'
import Navigation from "./navigation"
import "./login.css";
const Login = ()=>{
	const navigate = useNavigate();
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const [status, setStatus] = useState('');
const login = ()=>{
	
	axios.post('https://soccerteam-953874d541a4.herokuapp.com/login', {email:email, password:password}, {withCredentials:true}).then((response)=>{
		if(response.data.success=="login successful"){
			console.log("successfully logged in");
			navigate('/');

		}
		else {
			console.log("wrong password");
			setStatus('Wrong Password');
		}


	}).catch(error=>{
		console.log(error);
		setStatus('Wrong Password')
	})
}
return (<>
<Navigation/>
<div class = 'login_container'>
<h1 class = 'login_word'>Login</h1>
<div class = 'login'>
<label>Email: </label>
<input type = "text" onChange = {(e)=>{setEmail(e.target.value)}}/>
<label class = 'password'>Password: </label>
<input type = "password" onChange = {(e)=>{setPassword(e.target.value)}}/>
<br/> 
<button class = 'login_'onClick = {login}>Login</button>
<br/>
<label> Don't have an account yet? </label>
<button class = 'btn btn-success'onClick = {()=>navigate('/signup')}>Sign Up Here</button>
<br/>
<label class = 'login_status'>{status}</label>
</div>
</div>
	</>)
}
export default Login;