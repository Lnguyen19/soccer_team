import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./roster.css";
import Navigation from "./navigation";
const Roster = ()=>{
	const [roster,setRoster] = useState([]);
useEffect(()=>{
	axios.get("http://localhost:3001/getRoster", {withCredentials:true}).then((response)=>{
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
<table>
  <tr>
    <th>Photo</th>
    <th>Name</th>
    <th>Kit Number</th>
    <th>Goal(s)</th>
    <th>Yellow Card</th>
    <th>Red Card</th>
    <th>Games Played</th>
  </tr>

{ roster.length===0?(
<div> 
<h1>No player listed</h1>
</div>
	):roster.map((rosters,index)=>(
     <tr key = {index}>
    <td><img  class = "playerImage"src = {picture(rosters.Picture) }/></td>
    <td>{rosters.Name}</td>
    <td>{rosters.Number}</td>
    <td>{rosters.Goal}</td>
    <td>{rosters.YellowCard}</td>
     <td>{rosters.RedCard}</td>
    <td>{rosters.GamesPlayed}</td>
  </tr>
))


}

</table>
</div>

	</>)

}
export default Roster;