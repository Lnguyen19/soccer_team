import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./home.css"
const Home = ()=>{
const [standings,setStandings] = useState([]);
const [dataTable,setDataTable ] = useState([]);
const [tableData, setTableData] = useState([]);

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
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://soccerteam-953874d541a4.herokuapp.com/getTableData');
        const data = await response.json();
        console.log(data);
        setTableData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setTableData]);

return(<>
<div >
  <h1 class = 'standingLabel'>Current Standing</h1>
  <div className="standings-table">
 <div class = 'table_'> 
  <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>F</th>
            <th>A</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
           
              <td className= {row['Team']==="(Sun) Palabra FC"?"highlighted":""}>{row['Rank']}</td>
              <td className= {row['Team']==="(Sun) Palabra FC"?"highlighted":""}>{row['Team']}</td>
              <td className= {row['Team']==="(Sun) Palabra FC"?"highlighted":""}>{row['P']}</td>
              <td className= {row['Team']==="(Sun) Palabra FC"?"highlighted":""}>{row['W']}</td>
              <td className= {row['Team']==="(Sun) Palabra FC"?"highlighted":""}>{row['D']}</td>
              <td className= {row['Team']==="(Sun) Palabra FC"?"highlighted":""}>{row['L']}</td>
              <td className= {row['Team']==="(Sun) Palabra FC"?"highlighted":""}>{row['F']}</td>
              <td className= {row['Team']==="(Sun) Palabra FC"?"highlighted":""}>{row['A']}</td>
              <td className= {row['Team']==="(Sun) Palabra FC"?"highlighted":""}>{row['GD']}</td>
              <td className= {row['Team']==="(Sun) Palabra FC"?"highlighted":""}>{row['Pts']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div> 
      </div>
</div>
	</>)

}
export default Home;