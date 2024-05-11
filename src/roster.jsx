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
 

	</>)

}
export default Roster;