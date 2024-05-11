import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./home.css"
const Home = ()=>{
const [standings,setStandings] = useState([]);
useEffect(()=>{
	axios.get("https://soccerteam-953874d541a4.herokuapp.com/getStanding", {withCredentials:true}).then((response)=>{
		if(response.data){
			console.log("got the data")
            const sorted = response.data.sort((a,b)=>a.Rank-b.Rank);
			setStandings(sorted);
    
}
		else{
			console.log("something is wrong");
		}
	}).catch(error=>{
		console.log(error);
	});

},[]);
return(<>
<div >
  <h1 class = 'standingLabel'>Current Standing</h1>
 <div className="standings-table">
 <div class = 'table_'> 
 <table >

          <thead>
            <tr>
            
              <th class ='headers'>Rank</th>
              <th class ='headers'>Team</th>
              <th class ='headers'>P</th>
              <th class ='headers'>W</th>
              <th class ='headers'>D</th>
              <th class ='headers'>L</th>
              <th class ='headers'>F</th>
              <th class ='headers'>A</th>
              <th class ='headers'>GD</th>
              <th class ='headers'>Pts</th>

            </tr>
          </thead>
          <tbody class = 'custom-tbody'>
            {standings.length === 0 ? (
              <tr>
                <td colSpan="10">
                  <h1>No table added</h1>
                </td>
              </tr>
            ) : (
              standings.map((stand, index) => (
                <tr key={index}>
                  <td className= {stand.Team==="(Sun) Palabra FC"?"highlighted":""}>{stand.Rank}</td>
                   <td className={stand.Team === "(Sun) Palabra FC" ? "highlighted" : ""}>{stand.Team}</td>
                  <td className = {stand.Team==="(Sun) Palabra FC"? "highlighted":""}>{stand.P}</td>
                  <td className = {stand.Team==="(Sun) Palabra FC"? "highlighted":""}>{stand.W}</td>
                  <td className = {stand.Team==="(Sun) Palabra FC"? "highlighted":""}>{stand.D}</td>
                  <td className = {stand.Team==="(Sun) Palabra FC"? "highlighted":""}>{stand.L}</td>
                  <td className = {stand.Team==="(Sun) Palabra FC"? "highlighted":""}>{stand.F}</td>
                  <td className = {stand.Team==="(Sun) Palabra FC"? "highlighted":""}>{stand.A}</td>
                  <td className = {stand.Team==="(Sun) Palabra FC"? "highlighted":""}>{stand.GD}</td>
                  <td className = {stand.Team==="(Sun) Palabra FC"? "highlighted":""}>{stand.Pts}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
</div>
</div>
	</>)

}
export default Home;