import React, { Component } from "react";

import { Routes, Route} from 'react-router-dom'

import SignIn from "./components/Signin/Signin";
import Register from "./components/register/register";
import TeamProfile from "./components/TeamPorfile/teamProfile";
import AddPlayer from "./components/AddPlayer/addPlayer";
import EditPlayer from "./components/EditPlayer/editPlayer";
class App extends Component {
 
  constructor () {
    super();
    this.state = {
      user: {
        id: '',
        username: '',
        teamName: '',
        players: [],
        lineup:0
      }
    }
    
  }
  loadUser = (data) => {
    let lineup = 0;
    data.players.map((player) => player.lineup ? lineup++ : lineup )
    this.setState({ user: {
      id: data.id,
      username: data.username,
      teamName: data.teamName,
      players: data.players,
      lineup:lineup
    }})
  }

  render() {
    return(
      <Routes>
          <Route index element={<SignIn loadUser= {this.loadUser}/>} />
          <Route  path='register' element={ <Register />} />
          <Route path="team/:teamName" element={<TeamProfile loadUser={this.loadUser} user ={this.state.user}/>} />
          <Route path="team/:teamName/addPlayer"  element = {<AddPlayer loadUser= {this.loadUser} user ={this.state.user}/>}/>
          <Route path="team/:teamName/editPlayer" element = {<EditPlayer loadUser = {this.loadUser} user = {this.state.user} />} />
          
      </Routes>
    );
  } 
}

export default App;
