import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigate from "./navigation";
import './addNewGame.css';
const AddNewGame = ()=>{
	const [picture,setPicture] = useState([]);
	const [choice,setChoice] = useState(null);
	const [email,setEmail] = useState('');
	const [text,setText] = useState('');
	const [title,setTitle] = useState('');
  const [addVid, setAddVid] = useState(null);
  const [vid1,setVid1] = useState('');
  const [vid2,setVid2] = useState('');
  const [vid3,setVid3] = useState('');
  const [vid4,setVid4] = useState('');
    const [vid5,setVid5] = useState('');
    const [videos,setVideos] = useState([]);

useEffect(() => { 
    axios.post('https://soccerteam-953874d541a4.herokuapp.com/currentSession', {}, { withCredentials: true })
      .then((response) => {
        if (response.data.email) {
          setEmail(response.data.email);
         
        } else {
        
          setEmail('N/A');        }
      })
      .catch(error => console.log(error));
  }, [email]);


const addEntry = async (e)=>{
	//e.preventDefault();
 
    console.log(email);
console.log(picture);
console.log(text);
console.log(title);
console.log(choice);

	const postData = new FormData();
	postData.append('email',email);
	 picture.forEach((pictures)=>{
  	postData.append('pictures',pictures);});
	postData.append('text',text);
	postData.append('title',title);
	postData.append('victory',choice);
  if(vid1!=''){
    videos.push(vid1);
  }
  if(vid2!=''){
    videos.push(vid2);
  }
 if(vid3!=''){
    videos.push(vid3);
  }
  if(vid4!=''){
    videos.push(vid4);
  }
   if(vid5!=''){
    videos.push(vid5);
  }
 postData.append('videos',JSON.stringify(videos));

	console.log("post data is ", postData)
try{
	 const postResponse = await axios.post('https://soccerteam-953874d541a4.herokuapp.com/uploadPictures',postData,{
 	headers:{'Content-Type': 'multipart/form-data'}});
	 console.log('the posting data is ', postResponse.data);
 
}catch(error){
	console.log(error);
}


}
const handleChoice = (e)=>{
	const v = e.target.value;
	setChoice(v==='yes');
}
const added = (e)=>{
   const files = e.target.files;
    const filesArray = Array.from(files);
    setPicture(filesArray);
}
const handleText= (e)=>{
	setText(e.target.value);
}
const handleTitle = (e)=>{
	setTitle(e.target.value);
}
const handleVid1 = (e)=>{
  setVid1(e.target.value);
}
const handleVid2 = (e)=>{
  setVid2(e.target.value);
}
const handleVid3 = (e)=>{
  setVid3(e.target.value);
}
const handleVid4 = (e)=>{
  setVid4(e.target.value);
}
const handleVid5 = (e)=>{
  setVid5(e.target.value);
}
return(<>

<Navigate/>

<h1>Select Files to Upload</h1>
<div class = 'addGame'>
<label>Add Entry Title</label>
<input type = 'text' onChange= {handleTitle}/>
<p>Add Pictures Select Up to 5</p>
<input type = 'file' multiple onChange = {added}/>

<label>Description</label>
<input type = 'text' onChange = {handleText}/>
<div>
<label>Victory?</label>

 <input
          type="radio"
          value="yes"
          checked={choice === true}
          onChange={handleChoice}
        />
 <label>Yes</label>
<input
          type="radio"
          value="no"
          checked={choice === false}
          onChange={handleChoice}
        />
 <label>No</label>
 </div>
 <label> Video 1 </label> <input type='text' onChange = {handleVid1}/>
 <label> Video 2 </label> <input type='text' onChange = {handleVid2}/>
 <label> Video 3 </label> <input type='text' onChange = {handleVid3}/>
 <label> Video 4 </label> <input type='text' onChange = {handleVid4}/>
 <label> Video 5 </label> <input type='text' onChange = {handleVid5}/>

 <button class = 'btn btn-primary' onClick = {addEntry}>Add Entry</button>
</div>
</>)
}
export default AddNewGame;