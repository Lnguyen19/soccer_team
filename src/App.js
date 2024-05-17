import logo from './logo.svg';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./register";
import Home from "./home";
import Roster from"./roster";
import Main from "./main";
import Signup from "./signup";
import Login from "./login";
import AdminRoster from "./adminRoster";
import RecentGames from "./recentGames";
import AddGame from "./addNewGame";
import Shop from "./shop";
import News from "./news";
import About from "./about";
import Formation from "./formation";
function App() {

  return (
    <div className="App">
      <header className="App-header">
         <Router>

         <Routes>
        <Route path = "/" element = {<Main/>}/>
          <Route path = "login" element = {<Login/>}/>
           <Route path = "adminRoster" element = {<AdminRoster/>}/>
           <Route path = "roster" element = {<Roster/>}/>
               <Route path = "recentGames" element = {<AddGame/>}/>
                <Route path = "shop" element = {<Shop/>}/>
                 <Route path = "about" element = {<About/>}/>
                   <Route path = "news" element = {<News/>}/>
                   <Route path = "signup" element = {<Signup/>}/>
                   <Route path = "formation" element = {<Formation/>}/>


        
         </Routes>
         </Router>
      </header>
    </div>
  );
}

export default App;
