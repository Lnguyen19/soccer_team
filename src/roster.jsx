import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./roster.css";
import Navigation from "./navigation";
const Roster = ()=>{
	const [roster,setRoster] = useState([]);
useEffect(()=>{
	axios.get("https://soccerteam-953874d541a4.herokuapp.com/getRoster", {withCredentials:true}).then((response)=>{
		if(response.data){
			console.log("got the data")
			const sorted = response.data.sort((a,b)=>a._id - b._id);
			setRoster(sorted);
      
}
		else{
			console.log("something is wrong");
		}
	}).catch(error=>{
		console.log(error);
	});

},[]);

const picture = (picture)=>{
	if(picture==="na"){
		return "https://i.pinimg.com/736x/58/51/2e/58512eb4e598b5ea4e2414e3c115bef9.jpg";
	}
	else{
		return picture;
	}

}
return(<>
	<Navigation/>
 <div className="standing-table">


{ roster.length===0?(
<div> 
<h1>No player listed</h1>
</div>
	):roster.map((rosters,index)=>(
     <div key = {index }className="player-card">
      <div className="player-image">
        <img src={picture(rosters.Picture)} alt={player.name} />
      </div>
      <div className="player-details">
        <h2>Name: {rosters.Name}</h2>
        <p>Kit Number: {rosters.Number}</p>
        <p>Goal(s): {rosters.Goal}</p>
        <p>Yellow Card: {rosters.YellowCard}</p>
        <p>Red Card: {rosters.RedCard}</p>
        <p>Games Played: {rosters.GamesPlayed}</p>
        
      </div>
    </div>
))


}


</div>

	</>)

}
export default Roster;