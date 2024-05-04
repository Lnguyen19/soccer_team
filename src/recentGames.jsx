import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./recentGames.css";
const RecentGames = ()=>{
	const [email,setEmail] = useState();
	const [currentIndex,setCurrentIndex] = useState(0);
	const [user,setUser] = useState('');
	const [recent,setRecent] = useState([]);
	const navigate = useNavigate();
 useEffect(() => {
    axios.post('https://soccerteam-953874d541a4.herokuapp.com/currentSession', {}, { withCredentials: true })
      .then((response) => {
        if (response.data.email) {
          setEmail(response.data.email);
          //setStatus('Logout');
        } else {
         // setStatus('Login');
          setEmail('N/A');
        }
      })
      .catch(error => console.log(error));
      axios.get(`https://soccerteam-953874d541a4.herokuapp.com/checkAdmin/${email}`, { withCredentials: true })
      .then((response) => {
        setUser(response.data);
        console.log("User data:", user);
        console.log("Email:", user.email);
        console.log("Name:", user.name);
      })
      .catch(error => console.log(error));


  }, [email,user]);

useEffect(()=>{
axios.get('https://soccerteam-953874d541a4.herokuapp.com/getRecent',{withCredentials:true}).then(response=>{
	if(response.data){
		setRecent(response.data)
	console.log(recent)
	}
	else{
		console.log("we got issues");
	}

}).catch(error=>console.log(error))
},[recent])
const tests = [
   {url: "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?cs=srgb&dl=pexels-8moments-1266810.jpg&fm=jpg"},
   {url:"https://static.vecteezy.com/system/resources/previews/026/843/137/large_2x/beautiful-flowers-with-beautiful-scenery-ai-image-generate-free-photo.jpg"}
    ,
    {url:"https://thumbs.dreamstime.com/b/beautiful-scenery-rock-formations-sea-queens-bath-kauai-hawaii-sunset-186645179.jpg"}
   ,
   {url:"https://i.pinimg.com/originals/0d/8e/02/0d8e0215230f829053d078247b5d5bec.jpg"}
	]

const next = (length_)=>{
	const isLast = currentIndex ===length_-1;
	const newIndex = isLast?0: currentIndex+1;
	setCurrentIndex(newIndex);
}
const prev = (length_)=>{
	const isFirst = currentIndex=== 0;
	const newIndex = isFirst?length_-1: currentIndex-1;
	setCurrentIndex(newIndex);
}
const goTo= (slides)=>{
	setCurrentIndex(slides);
}
const checkUser = (user)=>{
	if(user===true){
		return true;
	}
	else{
		return false;
	}
}
return (
  <>
    {checkUser(user.admin) === true ? (
      <div class = 'deter'><button onClick = {()=>navigate('/recentGames')}>Add a Recent Game</button></div>
    ) : (
      <div class = 'deter'>Stay Tune for Upcoming Games</div>
    )}

    <h1 class ='recentSection'>Recent Games </h1>
   
   {recent.length === 0 ? (
  <div>No recent pictures available</div>
) : (
  <div>
    {recent.map((entry, entryIndex) => (
     
      <div key={entryIndex}>
      <div class = "card">
      <div class = 'title_'>
       <label >{entry.title}</label>
       </div>
        <div>
          <div className="left-arrow" onClick={()=>prev(entry.pictures.length)}><i className="bi bi-arrow-left-circle"></i></div>
          <div className="right-arrow" onClick={()=>next(entry.pictures.length)}><i className="bi bi-arrow-right-circle"></i></div>
        </div>

        <div className="slider" style={{ backgroundImage: `url(${entry.pictures[currentIndex]})` }}></div>
        <div className="dots">
          {entry.pictures.map((_, index) => (
            <div className='dot-container' key={index}><i className="bi bi-circle-fill" onClick={() => goTo(index)}></i></div>
          ))}
        </div>
        <div className="description">
          <p>{entry.text}</p>
        </div>
      </div>
     </div>

    ))}
  </div>
)}


    
  </>
);


}
export default RecentGames;