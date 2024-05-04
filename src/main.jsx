import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from "./navigation";
import Hero from "./hero";
import Home from "./home";
import Recent from "./recentGames";
const Main = ()=>{

return(<>
<Navigation/>
<Hero/>
<br/>
<Home class = 'leaderBoard'/>
<br/>
<Recent class = "recent"/>

	</>)
}
export default Main;