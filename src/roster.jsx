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
<div className="card-container">
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {roster.length === 0 ? (
            <div className="col">No players</div>
        ) : roster.map((roster, index) => (
            <div className="col mb-4" key={index}>
                <div className="card" style = {{width:"18rem"}}>
                    <img className="card-img-top" src={picture(roster.Picture)} alt="Player" />
                    <div className="card-body">
                        <h5 className="card-title playerName">{roster.Name}</h5>
                        <p className="card-text">Kit Number: {roster.Number}</p>
                        <p className="card-text">Goal(s): {roster.Goal}</p>
                         <p className="card-text">Yellow Cards: {roster.YellowCard}</p>
                          <p className="card-text">Red Cards: {roster.RedCard}</p>
                           <p className="card-text">Games Played: {roster.GamesPlayed}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>




	</>)

}
export default Roster;