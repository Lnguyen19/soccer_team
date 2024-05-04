import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./adminRoster.css";
import Navigation from "./navigation";
const AdminRoster = ()=>{
	const [roster,setRoster] = useState([]);
	const [edit,setEdit] = useState(false);
	const [editPicture,setEditPicture] = useState(false);
	const [pic,setPic] = useState('');

useEffect(()=>{
	axios.get("https://soccerteam-953874d541a4.herokuapp.com/getRoster", {withCredentials:true}).then((response)=>{
		if(response.data){
			console.log("got the data")
			setRoster(response.data);
      console.log("the data is ", response.data);
       console.log("the standing is ", roster);
}
		else{
			console.log("something is wrong");
		}
	}).catch(error=>{
		console.log(error);
	});

},[]);
const handleMode = ()=>{
   if(edit==='false'){
   	setEdit(true);
   }
   else{
   	setEdit(false);
   }
}
const picture = (picture)=>{
	if(picture==="na"){
		return "https://i.pinimg.com/736x/58/51/2e/58512eb4e598b5ea4e2414e3c115bef9.jpg";
	}
	else{
		return picture;
	}

}


const uploadPic = (id) => {
  console.log("the id is ", id);
  console.log("the pic is ", pic);

  const data = new FormData(); // Creating a FormData object
  data.append("Name", id);
  data.append("Picture", pic);
  console.log(data);

  axios.put('http://localhost:3001/changePicture', data, {
    headers: {
      'Content-Type': 'multipart/form-data' 
    },
    withCredentials: true
  })
    .then(response => {
      if (response.data) {
        console.log("the new pic is ", response.data);
         const updatedRoster = roster.map(player => {
          if (player.Name === id) {
            return { ...player, Picture: response.data };
          } else {
            return player;
          }
        });
        setRoster(updatedRoster); 
      } else {
        console.log("idk what happened");
      }
    })
    .catch(error => {
      console.log(error);
    });
}



const handlePic = (e) => {
  console.log("Event:", e); // Check the event object
  const file = e.target.files[0];
  console.log("Selected File:", file); // Check the selected file
  setPic(file); // Make sure `pic` is set correctly
}

return(<>
	<Navigation/>
	<h1>Admin Roster</h1>
 <div className="standings-table">
<table>
  <tr>
    <th><button class = 'btn-success' onClick={() => setEdit(!edit)}>Edit Stats</button>
    <br/> 
    <br/> 
    <button class = 'btn-primary' onClick={() => setEditPicture(!editPicture)}> Edit Photos </button>

    </th>
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
     <td>
                 

{editPicture===true?(<input type = 'file' onChange = {(e)=>setPic(e.target.files[0])}/>):(<div> </div>)}

{editPicture===true?(<button onClick = {()=>uploadPic(rosters.Name)}>submit</button>):(<div> </div>)}


                   <br/>

     <button className="btn btn-danger" >
                    Remove
                  </button>


                  </td>

    <td><img  class = "playerImage"src = {picture(rosters.Picture) }/></td>
       <td>{rosters.Name}</td>
    { edit===true?(<input type = 'number'/>):(<td>{rosters.Number}</td>)}
    {  edit===true?(<input type = 'number'/>):( <td>{rosters.Goal}</td>)}
      { edit===true?(<input type = 'number'/>):( <td>{rosters.YellowCard}</td>)}
     { edit===true?(<input type = 'number'/>):( <td>{rosters.RedCard}</td>)}
      {edit===true?(<input type = 'number'/>):(<td>{rosters.GamesPlayed}</td>)}



    



  </tr>
))}
</table>
</div>
  <div class = 'button'>
  <label>Add Player</label>
    <button class = 'btn btn-primary btn-lg'>
      <i className="bi bi-plus-circle-fill"></i>
    </button>
    </div>
	</>)

}
export default AdminRoster;