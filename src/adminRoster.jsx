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
  const [goals,setGoals] = useState([]);
  const [yellowCards,setYellowCards] = useState('');
  const [redCards,setRedCards] = useState('');
  const [gamesPlayed,setGamesPlayed] = useState('');


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
const editGoal= (id,value) =>{
  console.log("the id is ", id);
  const data = new FormData();
  data.append('id',id);
  data.append('goal',value);
  const newValue = Number(value);
  console.log(value);
  const find = roster.find(player=>player.Name===id);
 if(find){
  const total = newValue+ find.Goal ;
axios.put('https://soccerteam-953874d541a4.herokuapp.com/updateGoals',{id:id,goal:total}, {withCredentials:true}).then((response)=>{
  if(response.data){
    console.log('the number has been updated');
    const newGoal = roster.map(player=>{
      if(player.Name===id){
        return { ...player, Goal: response.data };
      }
      else{
        return player;
      }
    });
setRoster(newGoal);
  }
}).catch(error=>{
  console.log(error);
})
}
}
const editYellow= (id,value) =>{
  console.log("the id is ", id);
  const data = new FormData();
  data.append('id',id);
  data.append('yellow',value);
  const newValue = Number(value);
  console.log(value);
const find = roster.find(player=>player.Name===id);
if(find){
  const total = find.YellowCard+newValue;
axios.put('https://soccerteam-953874d541a4.herokuapp.com/updateYellow',{id:id,yellow:total}, {withCredentials:true}).then((response)=>{
  if(response.data){
    console.log('the number has been updated');
    const newYellow = roster.map(player=>{
      if(player.Name===id){
        return { ...player, YellowCard: response.data };
      }
      else{
        return player;
      }
    });
setRoster(newYellow);
  }
}).catch(error=>{
  console.log(error);
})
}
}
const editGamesPlayed= (id,value) =>{
  console.log("the id is ", id);
  const data = new FormData();
  data.append('id',id);
  data.append('games',value);
   const newValue = Number(value);
  console.log(value);
  const find = roster.find(player=>player.Name===id);
if(find){
  const totalGamesPlayed = find.GamesPlayed + newValue;
axios.put('https://soccerteam-953874d541a4.herokuapp.com/updateGamesPlayed',{id:id,gamePlayed:totalGamesPlayed}, {withCredentials:true}).then((response)=>{
  if(response.data){
    console.log('the number has been updated');
    const newGames = roster.map(player=>{
      if(player.Name===id){
        return { ...player, GamesPlayed: response.data };
      }
      else{
        return player;
      }
    });
setRoster(newGames);
  }
}).catch(error=>{
  console.log(error);
})
}
}
const editRedCards = (id,value)=>{
  console.log("the is is ", id);
  const newValue = Number(value);
  const find = roster.find(player=>player.Name===id);
  if(find){
    const total = find.RedCard + newValue;
    axios.put('https://soccerteam-953874d541a4.herokuapp.com/updateRedCard',{id:id, redCard:value},{withCredentials:true}).then((response)=>{
      if(response.data){
        console.log('the number has been updated');
    const newGames = roster.map(player=>{
      if(player.Name===id){
        return { ...player, RedCard: response.data };
      }
      else{
        return player;
      }
    });
setRoster(newGames);
      }
    }).catch(error=>{console.log(error)});
  }
}


const uploadPic = (id) => {
  console.log("the id is ", id);
  console.log("the pic is ", pic);

  const data = new FormData(); // Creating a FormData object
  data.append("Name", id);
  data.append("Picture", pic);
  console.log(data);

  axios.put('https://soccerteam-953874d541a4.herokuapp.com/changePicture', data, {
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
  console.log("Event:", e); 
  const file = e.target.files[0];
  console.log("Selected File:", file); 
  setPic(file); 
}

return(<>
	<Navigation/>
	<h1>Admin Roster</h1>
   <button class = 'btn-success' onClick={() => setEdit(!edit)}> {edit===true?(<label>Exit</label>):(<label>Edit Stats</label>)}</button>
    <br/> 
    <br/> 
    <button class = 'btn-primary' onClick={() => setEditPicture(!editPicture)}> {editPicture===true?(<label>Exit</label>):(<label>Edit Pictures</label>)}</button>
   <div className="card-container">
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {roster.length === 0 ? (
            <div className="col">No players</div>
        ) : roster.map((rosters, index) => (
            <div className="col mb-4" key={index}>
                <div className="card cardHeight" style = {{width:"18rem"}}>
                    <img className="card-img-top" src={picture(rosters.Picture)} alt="Player" />
                    <div className="card-body">
                        <h5 className="card-title playerName">{rosters.Name}</h5>
                        <p className="card-text">Kit Number:  { edit===true?(<><input  class = 'roster-input'type = 'number'/> <button class = 'roster-submit'>Submit</button></>):(<label>{rosters.Number}</label>)}</p>
                        <p className="card-text">Goal(s): {  edit===true?(<><input onChange = {(e)=>setGoals(e.target.value)}class = 'roster-input' type = 'number'/><button onClick = {()=>editGoal(rosters.Name,goals)}class = 'roster-submit'>Submit</button></>):( <label>{rosters.Goal}</label>)}</p>
                         <p className="card-text">Yellow Cards:     { edit===true?(<><input class = 'roster-input'  type = 'number' onChange = {(e)=>setYellowCards(e.target.value)}/><button class = 'roster-submit' onClick = {()=>editYellow(rosters.Name,yellowCards)}>Submit</button></>):( <label>{rosters.YellowCard}</label>)}</p>
                          <p className="card-text">Red Cards: { edit===true?(<><input class = 'roster-input' type = 'number' onChange = {(e)=>setRedCards(e.target.value)}/><button class = 'roster-submit' onClick = {()=>editRedCards(rosters.Name,redCards)}>Submit</button></>):( <label>{rosters.RedCard}</label>)}</p>
                           <p className="card-text">Games Played:  {edit===true?(<><input  class = 'roster-input'type = 'number' onClick = {(e)=>setGamesPlayed(e.target.value)}/><button class = 'roster-submit' onClick = {()=>editGamesPlayed(rosters.Name,gamesPlayed)}>Submit</button></>):(<label>{rosters.GamesPlayed}</label>)}</p>
                           {editPicture===true?(<input type = 'file' onChange = {(e)=>setPic(e.target.files[0])}/>):(<div> </div>)}

{editPicture===true?(<button  class = 'picture-submit btn-success'onClick = {()=>uploadPic(roster.Name)}>Submit</button>):(<div> </div>)}
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>
</>)
}
export default AdminRoster;