import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './hero.css'
import logo from './palabra_logo.JPG';
import team from "./team_1.jpg";
import highlight_3 from "./highlight_3.mp4";
const Hero = ()=>{

return(<>

<div class = 'head-container'>

<video autoPlay loop muted className='background-video'>
                    <source src={highlight_3} type="video/mp4" />

                </video>

<div class = 'text-section'>
<h2 class = 'heroText' >Palabra F.C </h2>
<br/> 
  <p style = {{fontSize:'24px', color:'white'}}> Football Club based in San Diego California</p> </div>

</div>

	</>)
}
export default Hero;