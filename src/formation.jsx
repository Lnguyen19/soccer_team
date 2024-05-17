import './formation.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Navigation from "./navigation";
import Dropdown from "./dropdown";
const Formation = () => {
    const [formation,setFormation] = useState([]);
    const [player_1,setPlayer1] = useState([]);
      const [roster,setRoster] = useState([]);
      const [email, setEmail] = useState('');
      const [user, setUser] = useState('');
      const [playing,setPlaying] = useState([]);
      const [current,setCurrent] = useState([]);
   

const [formations,setFormations] = useState([{index:0,x:45,y:30,pos:'ST',name:'NA',kit:0},{index:1,x:20,y:39,pos:'LW',name:'NA',kit:0},{index:2,x:71,y:39,pos:'RW',name:'NA',kit:0},
  {index:3,x:45,y:65,pos:'CM',name:'NA',kit:0}, {index:4,x:25,y:65,pos:'CM',name:'NA',kit:0} , {index:5,x:67,y:65,pos:'CM',name:'NA',kit:0}, {index:6,x:35,y:90,pos:'CB',name:'NA',kit:0}, {index:7,x:17,y:90,pos:'LB',name:'NA',kit:0} , {index:8,x:68,y:90,pos:'RB',name:'NA',kit:0},{index:9,x:52,y:90,pos:'CB',name:'NA',kit:0}, {index:10,x:45,y:107,pos:'GK',name:'NA',kit:0}
  ]);
    var x1 = 45;
    var y1 = 25;
     var x2 = 28;
    var y2 = 15;
     var x3 = 50;
    var y3 = 25;
     var x4 = 50;
    var y4 = 25;
     var x5 = 50;
    var y5 = 25;
     var x6 = 50;
    var y6 = 25;
     var x7 = 50;
    var y7 = 25;
     var x8 = 50;
    var y8 = 25;
const handPosition = ()=>{
const backgroundImage = new Image();
backgroundImage.src = 'field.jpg';
backgroundImage.onload = function() {
            const imageWidth = this.width;
            const imageHeight = this.height;

            setFormations(formations.map(formation => ({
                x: formation.x * (100 / imageWidth), // Convert x position to percentage of image width
                y: formation.y * (100 / imageHeight) // Convert y position to percentage of image height
            })));
        };
}
useEffect(()=>{
  axios.get("https://soccerteam-953874d541a4.herokuapp.com/getRoster", {withCredentials:true}).then((response)=>{
    if(response.data){
     
      setRoster(response.data);
      
}
    else{
      console.log("something is wrong");
    }
  }).catch(error=>{
    console.log(error);
  });

},[]);
useEffect(()=>{  axios.get("https://soccerteam-953874d541a4.herokuapp.com/formation",{withCredentials:true}).then((response)=>{
  if(response.data){
    
    setCurrent(response.data);
    console.log('current', current)
    
  }
  else {
    console.log("something in formation is wrong");
  }
}).catch(error=>{
  console.log(error);
})

},[current])
 
    useEffect(() => {
        axios.post('https://soccerteam-953874d541a4.herokuapp.com/currentSession', {}, { withCredentials: true })
            .then((response) => {
                setEmail(response.data.email);
             //   console.log('email is ', email)
            })
            .catch(error => console.log(error));
        axios.get(`https://soccerteam-953874d541a4.herokuapp.com/checkAdmin/${email}`, { withCredentials: true })
            .then((response) => {
                setUser(response.data);
                 //  console.log('user is ', user)
            })
            .catch(error => console.log(error));
    }, [user,email]);

const fourByThree = ()=>{

}

const handleSelect = (index, playerName)=>{
const newFormation = [...formations];

const selectplayer = roster.find(player=>player.Name===playerName);
if(selectplayer){
  newFormation[index] = {...newFormation[index],name:playerName}
  setFormations(newFormation)
}


}
useEffect(()=>{
handPosition();
},[])

const handleBackground = (name)=>{
const selectplayer = roster.find((player)=>player.Name===name);
if(selectplayer){
   if(selectplayer.Picture==='na'){
     return 'url(https://i.pinimg.com/736x/58/51/2e/58512eb4e598b5ea4e2414e3c115bef9.jpg)'

   }
   else {
     return `url(${selectplayer.Picture})`;
   }

}

else{
  return 'url(https://i.pinimg.com/736x/58/51/2e/58512eb4e598b5ea4e2414e3c115bef9.jpg)'
}
}
const submit = (formation)=>{
  axios.put('https://soccerteam-953874d541a4.herokuapp.com/updateFormation',{formations:formations},{withCredentials:true}).then(response=>{
      console.log('updated', response.data);
  }).catch(error=>{
    console.log(error);
  })

}
const handleName = (name, index)=>{
 if (current[index]) {
    if (name === 'NA' && current[index].name) {
      return current[index].name;
    } else {
      return name;
    }
  
  }else{
    return name;
  }
}




  return (
    <>
      <Navigation />
      <div className='formation'>
       {formations.map((forma,index)=>(
           <div key = {index} class = 'player_f' style = {{left:`${forma.x}%`, top:`${forma.y}%` ,backgroundImage :handleBackground(handleName(forma.name,index))}}>{forma.pos} <p>{handleName(forma.name,index)}</p></div>
        ))}
      
   
      </div>
     <div>
    {user.admin===true?(<div className="card-container">
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {formations.length === 0 ? (
            <div className="col">No players</div>
        ) : formations.map((forma, index) => (
            <div className="col mb-4" key={index}>
                <div className="card cardHHeight" style = {{width:"14rem"}}>
                   
                    <div className="card-body">
                    <p>{forma.pos}</p>
                     <Dropdown options = {roster}
                     onSelect = {(playerName)=>handleSelect(index,playerName)}
                     selected = {forma.Name}/>
                        
                    </div>
                </div>
            </div>
        ))}

    </div>
    <button class = 'finalize btn-primary' onClick = {()=>submit(formations)}><h1 style = {{fontWeight:'bold'}}>Finalize </h1></button>
</div>):(<div>user is not the admin  </div>)}
  
     </div>

    </>
  )
}

export default Formation;
