import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./register.css";


const Register = ()=>{
	const navigate = useNavigate();
	const [username,setUsername] = useState("");
	const [login,setLogin] = useState("");
	const [userInput,setUserInput] = useState("");
  const [password,setPassword]  = useState("");
  const [passwordInput, setPasswordInput] = useState("");
 
const sendUserName  = ()=>{
	console.log("the name is ",username);
axios.post("http://localhost:3001/register",{username:username,password:password}).then((response)=>{
console.log("your username has been signed up");
}).catch((error)=>{
	console.log(error);
});

}

const loggingIn = ()=>{
	console.log("the usename is ", userInput);
  axios.post("http://localhost:3001/getUser", {
  username: userInput,
  password:passwordInput
})
  .then((response) => {
    console.log(response);
    if(response.data.success=="login successful"){
     
   
 //navigate('/home', { state: { username: userInput } });
  console.log("it worked")
}
else{
  console.log("did not work");
}
   // }
    
  })
  .catch((error) => {
    console.error(error);
      
   // navigate('main');
    //setLog(false);


  });



}





return(<>

<body>

  <header>
    <h1>Welcome</h1>
  </header>

  <div class="container">
    <h2>Enter your username</h2>

    <input id="username" type="text" placeholder="Your Username" onChange = {(e)=>{setUsername(e.target.value)}}/>
    <input id="username" type="text" placeholder="Your Password" onChange = {(e)=>{setPassword(e.target.value)}}/>
    <br/>
    <br/>
    <button id="send" onClick = {sendUserName}>Create Username</button>

    <input id="login" type="text" placeholder="Your Username" onChange = {(e)=>{setUserInput(e.target.value)}}/>
    <input id="username" type="text" placeholder="Your Password" onChange = {(e)=>{setPasswordInput(e.target.value)}}/>
    <br/>
    <br/>
    <button id="login_" onClick = {loggingIn}>login</button>
  </div>

</body>



	</>)
}
export default Register;